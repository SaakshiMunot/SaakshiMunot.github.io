'use client'

import { useState } from "react";
import { ChevronLeft, ChevronRight, Github, Linkedin, Mail, FileText, GraduationCap } from "lucide-react";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Button } from "@/components/ui/button";

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample images - these would be replaced with actual photos
  const images = [
    {
      id: 1,
      src: "/about/professional.jpg",
      alt: "Saakshi Munot - Profile Photo 1",
      caption: "Me (Saakshi Munot)"
    },
    {
      id: 2,
      src: "/about/renderATL.jpg",
      alt: "Saakshi Munot - Profile Photo 2",
      caption: "Atlanta Tech Week (Render, ATL - May 2025)"
    },
    {
      id: 3,
      src: "/about/collaboration.jpg",
      alt: "Fusen Fellowship - rebootED",
      caption: "rebootED - Fusen Fellowship (May 2025)"
    },
    {
      id: 4,
      src: "/about/prom.jpg",
      alt: "Prom",
      caption: "My Friends and Me"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Centered Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
                About Me
              </span>
            </h1>
            <h2 className="text-xl text-primary font-semibold">
              Saakshi Munot
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 items-stretch justify-items-center">

            {/* Image Carousel - Now shows first on mobile */}
            <div className="order-1 lg:order-1 w-full h-full flex justify-center">
              <div className="glass rounded-2xl p-8 border border-glass-border w-full h-full max-w-xl">
                <h3 className="text-2xl font-semibold mb-6 text-center">
                  <span className="bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                    Gallery
                  </span>
                </h3>

                <div className="relative w-80 h-80 mx-auto glass rounded-2xl border border-glass-border overflow-hidden">
                  {/* Image Display */}
                  <div className="relative w-full h-full">
                    <img
                      src={images[currentImageIndex].src}
                      alt={images[currentImageIndex].alt}
                      className={`w-full h-full object-cover transform transition-transform duration-300 ${images[currentImageIndex].id === 2 ? 'scale-150' : 'scale-110'} ${images[currentImageIndex].id === 1 ? 'object-[50%_20%]' : 'object-center'}`}
                    />

                    {/* Gradient overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Image Caption */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium text-center bg-black/30 rounded px-3 py-1 backdrop-blur-sm">
                        {images[currentImageIndex].caption}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 glass border border-glass-border hover:bg-glass-bg/50"
                    onClick={prevImage}
                  >
                    <ChevronLeft size={16} className="text-white" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 glass border border-glass-border hover:bg-glass-bg/50"
                    onClick={nextImage}
                  >
                    <ChevronRight size={16} className="text-white" />
                  </Button>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center space-x-2 mt-4">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                          ? "bg-primary scale-125"
                          : "bg-muted hover:bg-primary/50"
                        }`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <p className="text-center text-xs text-muted-foreground mt-2">
                  {currentImageIndex + 1} of {images.length}
                </p>

                {/* Contact Links */}
                <div className="pt-6 border-t border-glass-border mt-6">
                  <h4 className="text-lg font-semibold text-primary mb-4 text-center">
                    Let&apos;s Connect
                  </h4>
                  <div className="flex justify-center space-x-4">
                    {/* GitHub */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="glass border border-glass-border hover:bg-glass-bg/50 hover:border-primary/50 transition-all duration-200"
                      onClick={() => window.open('https://github.com/saakshimunot', '_blank')}
                      title="GitHub"
                    >
                      <Github size={20} className="text-foreground/80 hover:text-primary" />
                    </Button>

                    {/* LinkedIn */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="glass border border-glass-border hover:bg-glass-bg/50 hover:border-primary/50 transition-all duration-200"
                      onClick={() => window.open('https://linkedin.com/in/saakshimunot', '_blank')}
                      title="LinkedIn"
                    >
                      <Linkedin size={20} className="text-foreground/80 hover:text-primary" />
                    </Button>

                    {/* Resume */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="glass border border-glass-border hover:bg-glass-bg/50 hover:border-primary/50 transition-all duration-200"
                      onClick={() => window.open('/assets/Saakshi_Munot.pdf', '_blank')}
                      title="Resume"
                    >
                      <FileText size={20} className="text-foreground/80 hover:text-primary" />
                    </Button>

                    {/* Email */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="glass border border-glass-border hover:bg-glass-bg/50 hover:border-primary/50 transition-all duration-200"
                      onClick={() => window.open('mailto:saakshi.munot@gmail.com', '_blank')}
                      title="Email"
                    >
                      <Mail size={20} className="text-foreground/80 hover:text-primary" />
                    </Button>
                  </div>
                </div>

                {/* Education */}
                <div className="pt-6 border-t border-glass-border mt-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <GraduationCap size={18} className="text-primary/80" />
                    <h4 className="text-lg font-semibold text-primary">Education</h4>
                  </div>
                  <div className="mx-auto max-w-md space-y-3 text-left">
                    <p className="text-base font-semibold">Purdue University, West Lafayette, IN</p>
                    <div className="pt-1">
                      <p className="text-sm font-semibold text-primary mb-2">Program</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "B.S. in Computer Science",
                          "Minor in Mathematics",
                          "Expected Graduation by December 2026",
                        ].map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1 glass rounded-full text-sm border border-glass-border"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>

            {/* About Text - Now shows second on mobile */}
            <div className="order-2 lg:order-2 w-full h-full flex justify-center">
              <div className="glass rounded-2xl p-8 border border-glass-border space-y-6 w-full h-full max-w-2xl">
                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  <p>
                    Hi!! I’m Saakshi Munot, a Computer Science student passionate about machine intelligence, databases, and front-end development. From exploring cryptography and AI to building interactive web applications, I’m fascinated by how technology can solve real-world problems and create engaging user experiences.
                  </p>
                  <p>
                    My journey in tech started with a love for learning and problem-solving, whether it was tackling Sudoku puzzles, mastering Rubik’s Cubes, or playing chess. These early challenges sparked my curiosity and developed my analytical thinking, which naturally led me to programming and software development.
                  </p>
                  <p>
                    Currently, I’m focused on developing full-stack applications and experimenting with AI-powered tools, always eager to learn new frameworks and contribute to open-source communities. Whether it’s coding a sleek web interface or diving into machine learning research, I’m motivated by the challenge and the endless potential of technology.
                  </p>
                  <p>
                    Outside of coding, I enjoy photography, playing badminton, and hiking — all activities that inspire fresh perspectives and creativity in my work.
                  </p>
                  <p>
                    This portfolio showcases my journey so far, but I’m just getting started. I’m excited to keep growing, collaborating, and building innovative solutions that make a difference.
                  </p>
                </div>

                {/* Skills/Interests */}
                <div className="pt-4 border-t border-glass-border">
                  <h4 className="text-lg font-semibold text-primary mb-3">Interests & Passions</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Full Stack Development", "Web Development", "UI/UX Design", "Open Source", "AI/ML", "Photography", "Music", "Badminton", "Hiking", "Cryptography", "Data Science", "Cloud Computing", "Machine Learning", "Databases", "Information Systems"].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 glass rounded-full text-sm border border-glass-border"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
