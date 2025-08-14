import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const photographyDir = path.join(process.cwd(), 'public', 'photography');
    
    // Check if directory exists
    try {
      await fs.access(photographyDir);
    } catch {
      // Directory doesn't exist, return empty array
      return NextResponse.json({ photos: [] });
    }

    // Read all files in the directory
    const files = await fs.readdir(photographyDir);
    
    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.tiff'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    // Generate photo objects from filenames
    const photos = imageFiles.map((filename, index) => {
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
      const words = nameWithoutExt.split(/[-_\s]+/);
      
      // Auto-generate title from filename
      const title = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      // Auto-generate category based on filename keywords
      let category = "General";
      const lowerFilename = filename.toLowerCase();
      
      if (lowerFilename.includes('landscape') || lowerFilename.includes('mountain') || lowerFilename.includes('sunset') || lowerFilename.includes('beach')) {
        category = "Landscape";
      } else if (lowerFilename.includes('nature') || lowerFilename.includes('flower') || lowerFilename.includes('tree') || lowerFilename.includes('forest')) {
        category = "Nature";
      } else if (lowerFilename.includes('urban') || lowerFilename.includes('city') || lowerFilename.includes('street') || lowerFilename.includes('building')) {
        category = "Urban";
      } else if (lowerFilename.includes('wildlife') || lowerFilename.includes('animal') || lowerFilename.includes('bird') || lowerFilename.includes('eagle')) {
        category = "Wildlife";
      } else if (lowerFilename.includes('architecture') || lowerFilename.includes('building') || lowerFilename.includes('modern')) {
        category = "Architecture";
      } else if (lowerFilename.includes('macro') || lowerFilename.includes('close') || lowerFilename.includes('detail')) {
        category = "Macro";
      } else if (lowerFilename.includes('portrait') || lowerFilename.includes('person') || lowerFilename.includes('face')) {
        category = "Portrait";
      } else if (lowerFilename.includes('travel') || lowerFilename.includes('trip') || lowerFilename.includes('vacation')) {
        category = "Travel";
      } else if (lowerFilename.includes('abstract') || lowerFilename.includes('art') || lowerFilename.includes('pattern')) {
        category = "Abstract";
      } else if (lowerFilename.includes('documentary') || lowerFilename.includes('event') || lowerFilename.includes('ceremony')) {
        category = "Documentary";
      }
      
      // Auto-generate tags from filename
      const tags = words.filter(word => word.length > 2).map(word => word.toLowerCase());
      
      // Try to extract date from filename if it contains date-like patterns
      let date: string | undefined;
      const datePattern = /(\d{4})[-_](\d{1,2})[-_](\d{1,2})/;
      const dateMatch = filename.match(datePattern);
      if (dateMatch) {
        const [, year, month, day] = dateMatch;
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
        date = `${monthNames[parseInt(month) - 1]} ${year}`;
      }
      
      return {
        id: index + 1,
        title,
        category,
        imageUrl: `/photography/${filename}`,
        tags,
        filename,
        date
      };
    });

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error scanning photography directory:', error);
    return NextResponse.json(
      { error: 'Failed to scan photography directory' },
      { status: 500 }
    );
  }
}

