'use client'

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Download, ExternalLink, Camera, MapPin, Calendar, Tag } from "lucide-react";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Photography data - automatically populated from directory
interface Photo {
  id: number;
  title: string;
  description?: string;
  location?: string;
  date?: string;
  category: string;
  imageUrl: string;
  thumbnailUrl?: string;
  tags: string[];
  filename: string;
}

// Default categories - can be extended
const defaultCategories = ["All", "Landscape", "Nature", "Urban", "Wildlife", "Architecture", "Macro", "Portrait", "Street", "Travel", "Abstract", "Documentary"];

export default function Photography() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-generate photos from directory
  useEffect(() => {
    const generatePhotosFromDirectory = async () => {
      try {
        // This would typically be an API call to scan the directory
        // For now, we'll simulate it with a dynamic approach
        const mockPhotos = await scanPhotographyDirectory();
        
        // Extract unique categories from photos
        const uniqueCategories = ["All", ...new Set(mockPhotos.map(photo => photo.category))];
        
        setPhotos(mockPhotos);
        setCategories(uniqueCategories);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading photos:', error);
        setIsLoading(false);
      }
    };

    generatePhotosFromDirectory();
  }, []);

  // Global keyboard event handler for lightbox navigation
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      
      switch (e.key) {
        case 'Escape':
          closePhoto();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextPhoto();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevPhoto();
          break;
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleGlobalKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto, currentPhotoIndex, photos]);

  // Scan the photography directory via API
  const scanPhotographyDirectory = async (): Promise<Photo[]> => {
    try {
      const response = await fetch('/api/photography');
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      const data = await response.json();
      return data.photos || [];
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
  };

  // Auto-generate photo data from filename
  const generatePhotoFromFilename = (filename: string, index: number): Photo => {
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const words = nameWithoutExt.split(/[-_\s]+/);
    
    // Auto-generate title from filename
    const title = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    // Auto-generate category based on filename keywords
    let category = "General";
    const lowerFilename = filename.toLowerCase();
    
    if (lowerFilename.includes('landscape') || lowerFilename.includes('mountain') || lowerFilename.includes('sunset')) {
      category = "Landscape";
    } else if (lowerFilename.includes('nature') || lowerFilename.includes('flower') || lowerFilename.includes('tree')) {
      category = "Nature";
    } else if (lowerFilename.includes('urban') || lowerFilename.includes('city') || lowerFilename.includes('street')) {
      category = "Urban";
    } else if (lowerFilename.includes('wildlife') || lowerFilename.includes('animal') || lowerFilename.includes('bird')) {
      category = "Wildlife";
    } else if (lowerFilename.includes('architecture') || lowerFilename.includes('building')) {
      category = "Architecture";
    } else if (lowerFilename.includes('macro') || lowerFilename.includes('close')) {
      category = "Macro";
    } else if (lowerFilename.includes('portrait') || lowerFilename.includes('person')) {
      category = "Portrait";
    }
    
    // Auto-generate tags from filename
    const tags = words.filter(word => word.length > 2).map(word => word.toLowerCase());
    
    return {
      id: index + 1,
      title,
      category,
      imageUrl: `/photography/${filename}`,
      tags,
      filename
    };
  };

  // Function to add new photos (you can call this when new images are added to the directory)
  const addNewPhotos = async () => {
    // This would typically scan the directory for new images
    // For now, you can manually add new photos to the scanPhotographyDirectory function
    const newPhotos = await scanPhotographyDirectory();
    setPhotos(newPhotos);
    
    // Update categories
    const uniqueCategories = ["All", ...new Set(newPhotos.map(photo => photo.category))];
    setCategories(uniqueCategories);
  };

  const filteredPhotos = selectedCategory === "All" 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const openPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(photos.findIndex(p => p.id === photo.id));
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % photos.length;
    setCurrentPhotoIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  };

  const prevPhoto = () => {
    const prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    setCurrentPhotoIndex(prevIndex);
    setSelectedPhoto(photos[prevIndex]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen relative">
        <InteractiveBackground />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">Loading your photography collection...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />

      <div className="relative z-10 min-h-screen px-4 pt-20 pb-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
                Photography
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               A collection of my life through the lens
            </p>
            {/* <p className="text-sm text-muted-foreground/70 mt-2">
              {photos.length} photos automatically loaded from your collection
            </p> */}
          </div>

          {/* Refresh Button */}
          {/* <div className="text-center mb-6">
            <Button
              onClick={addNewPhotos}
              variant="outline"
              size="sm"
              className="glass border-glass-border hover:bg-glass-bg/50"
            >
              <Camera size={16} className="mr-2" />
              Refresh Collection
            </Button>
          </div> */}

          {/* Category Filter */}
          {/* <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category 
                    ? "bg-primary text-white" 
                    : "glass border-glass-border hover:bg-glass-bg/50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div> */}

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                className="group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                onClick={() => openPhoto(photo)}
              >
                <div className="glass rounded-2xl p-4 border border-glass-border hover:border-primary/50 transition-all duration-300 overflow-hidden">
                  {/* Photo */}
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback for missing images
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23666'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-size='16'%3EImage%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Quick Info */}
                    {/* <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-semibold text-sm mb-1">{photo.title}</h3>
                      {photo.location && (
                        <p className="text-xs text-white/80">{photo.location}</p>
                      )}
                    </div> */}
                  </div>
                  {/* Photo Info */}    
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPhotos.length === 0 && (
            <div className="text-center py-16">
              <div className="glass rounded-2xl p-8 border border-glass-border max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-primary mb-2">No Photos Found</h3>
                <p className="text-muted-foreground mb-4">
                  No photos match the selected category. Try selecting a different category or add some photos!
                </p>
                <Button onClick={addNewPhotos} variant="outline" size="sm">
                  <Camera size={16} className="mr-2" />
                  Refresh Collection
                </Button>
              </div>
            </div>
          )}

          {/* Photo Counter */}
          <div className="text-center mt-8">
            <span className="text-sm text-muted-foreground">
              Showing {filteredPhotos.length} of {photos.length} photos
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 glass border border-glass-border hover:bg-glass-bg/50 text-white"
                onClick={closePhoto}
              >
                <X size={24} />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 glass border border-glass-border hover:bg-glass-bg/50 text-white"
                onClick={prevPhoto}
              >
                <ChevronLeft size={24} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 glass border border-glass-border hover:bg-glass-bg/50 text-white"
                onClick={nextPhoto}
              >
                <ChevronRight size={24} />
              </Button>

              {/* Main Photo Container - Ensures image fits on screen */}
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.img
                  key={selectedPhoto.id}
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    maxWidth: '95vw',
                    maxHeight: '95vh'
                  }}
                />

                {/* Photo Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg">
                  <div className="text-white">
                    <h2 className="text-2xl font-bold mb-2">{selectedPhoto.title}</h2>
                    {selectedPhoto.description && (
                      <p className="text-lg text-white/90 mb-3">{selectedPhoto.description}</p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      {selectedPhoto.location && (
                        <span className="flex items-center gap-2">
                          <MapPin size={16} />
                          {selectedPhoto.location}
                        </span>
                      )}
                      {selectedPhoto.date && (
                        <span className="flex items-center gap-2">
                          <Calendar size={16} />
                          {selectedPhoto.date}
                        </span>
                      )}
                      <span className="px-3 py-1 glass rounded-full border border-white/20">
                        {selectedPhoto.category}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedPhoto.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm glass rounded-full border border-white/20 bg-white/10 flex items-center gap-1"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Filename */}
                    <div className="mt-3 text-xs text-white/60">
                      File: {selectedPhoto.filename}
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm glass px-4 py-2 rounded-full border border-white/20">
                {currentPhotoIndex + 1} of {photos.length}
              </div>

              {/* Keyboard Navigation Hint */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm glass px-4 py-2 rounded-full border border-white/20">
                Use arrow keys to navigate • ESC to close
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
