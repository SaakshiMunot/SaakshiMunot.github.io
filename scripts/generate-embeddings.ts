import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import OpenAI from 'openai';

const LOCAL_MODEL = process.env.LOCAL_EMBEDDING_MODEL || 'Xenova/all-MiniLM-L6-v2';
const RAG_DIR = path.resolve(process.cwd(), 'data', 'rag');
const OUT_FILE = path.join(RAG_DIR, 'embeddings.json');

function chunkText(text: string, chunkSize = 800, overlap = 200): string[] {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + chunkSize, text.length);
    const chunk = text.slice(i, end).trim();
    if (chunk) chunks.push(chunk);
    if (end === text.length) break;
    i = end - overlap;
    if (i < 0) i = 0;
  }
  return chunks;
}

async function readAllMarkdownFiles(dir: string): Promise<{ source: string; text: string }[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results: { source: string; text: string }[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await readAllMarkdownFiles(full)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      const text = await fs.readFile(full, 'utf8');
      results.push({ source: path.relative(process.cwd(), full), text });
    }
  }
  return results;
}

async function ensureRagDir(): Promise<void> {
  await fs.mkdir(RAG_DIR, { recursive: true });
}

async function embedWithOpenAI(texts: string[]): Promise<number[][]> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || undefined,
  });
  const res = await client.embeddings.create({ model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small', input: texts });
  return res.data.map((d) => d.embedding);
}

async function embedWithLocal(texts: string[]): Promise<number[][]> {
  try {
    // Dynamic import typed as any and accessed via bracket notation to placate TS resolution
    const mod: any = await import('@xenova/transformers');
    const pipeline = (mod as any)["pipeline"] as any;
    const extractor = await pipeline('feature-extraction', LOCAL_MODEL);
    const out: number[][] = [];
    for (const t of texts) {
      const output = await extractor(t, { pooling: 'mean', normalize: true }) as any;
      out.push(Array.from(output.data));
    }
    return out;
  } catch (err) {
    console.warn('Local model not available, using pseudo-embeddings. Install @xenova/transformers for higher quality.');
    return embedWithPseudo(texts);
  }
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  // Default to local embeddings. Only use OpenAI if explicitly requested.
  const useOpenAI = process.env.USE_OPENAI_EMBEDDINGS === '1' && !!process.env.OPENAI_API_KEY;
  if (useOpenAI) {
    try {
      return await embedWithOpenAI(texts);
    } catch (err: any) {
      if (err?.status === 429 || err?.code === 'insufficient_quota') {
        console.warn('OpenAI quota/rate limit hit. Falling back to local embeddings...');
        return embedWithLocal(texts);
      }
      console.warn('OpenAI embeddings failed, falling back to local embeddings...', err?.message || err);
      return embedWithLocal(texts);
    }
  }
  return embedWithLocal(texts);
}

function hashStringToInt32(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function normalizeVector(vec: number[]): number[] {
  let norm = 0;
  for (const v of vec) norm += v * v;
  norm = Math.sqrt(norm) || 1;
  return vec.map((v) => v / norm);
}

async function embedWithPseudo(texts: string[]): Promise<number[][]> {
  const DIM = Number(process.env.PSEUDO_EMBEDDING_DIM || 384);
  return texts.map((t) => {
    const vec = new Array(DIM).fill(0);
    const tokens = t.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
    for (const token of tokens) {
      const idx = hashStringToInt32(token) % DIM;
      vec[idx] += 1;
    }
    return normalizeVector(vec);
  });
}

async function main() {

  await ensureRagDir();

  const docs = await readAllMarkdownFiles(RAG_DIR);
  if (docs.length === 0) {
    console.warn(`No .md files found in ${RAG_DIR}. Create at least one (e.g., about-me.md).`);
    return;
  }

  const items: Array<{ id: string; source: string; text: string; embedding: number[] }> = [];

  for (const doc of docs) {
    const chunks = chunkText(doc.text);
    const BATCH_SIZE = Number(process.env.BATCH_SIZE || 16);
    for (let start = 0; start < chunks.length; start += BATCH_SIZE) {
      const batch = chunks.slice(start, start + BATCH_SIZE);
      const vectors = await embedBatch(batch);
      vectors.forEach((embedding, i) => {
        const idx = start + i;
        const text = chunks[idx];
        items.push({
          id: `${doc.source}:${idx}`,
          source: doc.source,
          text,
          embedding,
        });
      });
    }
  }

  const modelUsed = (process.env.USE_OPENAI_EMBEDDINGS === '1' && process.env.OPENAI_API_KEY)
    ? (process.env.EMBEDDING_MODEL || 'text-embedding-3-small')
    : LOCAL_MODEL;
  await fs.writeFile(OUT_FILE, JSON.stringify({ model: modelUsed, items }, null, 2), 'utf8');
  console.log(`Saved ${items.length} chunks to ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});