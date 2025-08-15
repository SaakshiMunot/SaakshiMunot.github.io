import { promises as fs } from 'fs';
import path from 'path';

interface Photo {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  tags: string[];
  filename: string;
  date?: string;
}

async function generatePhotographyData() {
  try {
    const photographyDir = path.join(process.cwd(), 'public', 'photography');
    
    // Check if directory exists
    try {
      await fs.access(photographyDir);
    } catch {
      console.log('Photography directory not found, generating empty data');
      await fs.writeFile(
        path.join(process.cwd(), 'data', 'photography.json'),
        JSON.stringify({ photos: [] }, null, 2)
      );
      return;
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
    const photos: Photo[] = imageFiles.map((filename, index) => {
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

    // Write the data to both data/ and public/data/ directories
    const dataPath = path.join(process.cwd(), 'data', 'photography.json');
    const publicDataPath = path.join(process.cwd(), 'public', 'data', 'photography.json');
    
    // Ensure public/data directory exists
    await fs.mkdir(path.join(process.cwd(), 'public', 'data'), { recursive: true });
    
    await fs.writeFile(dataPath, JSON.stringify({ photos }, null, 2));
    await fs.writeFile(publicDataPath, JSON.stringify({ photos }, null, 2));
    
    console.log(`Generated photography data with ${photos.length} photos`);
    console.log(`Data written to: ${dataPath}`);
    console.log(`Data written to: ${publicDataPath}`);
  } catch (error) {
    console.error('Error generating photography data:', error);
    process.exit(1);
  }
}

generatePhotographyData();
