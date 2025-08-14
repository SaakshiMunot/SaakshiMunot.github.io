'use client'

import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
}

export function InteractiveBackground() {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate floating elements
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      for (let i = 0; i < 20; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 100 + 20,
          opacity: Math.random() * 0.3 + 0.1,
          delay: Math.random() * 6,
        });
      }
      setElements(newElements);
    };

    generateElements();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 gradient-bg" />
      
      {/* Animated overlay gradients */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.15), transparent 40%)`,
        }}
      />
      
      {/* Floating geometric elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full animate-float animate-pulse-glow"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: `linear-gradient(45deg, hsl(var(--primary) / ${element.opacity}), hsl(var(--accent) / ${element.opacity * 0.5}))`,
            animationDelay: `${element.delay}s`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
      
      {/* Additional animated shapes */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 animate-float blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-accent/15 to-primary/10 animate-float-delayed blur-3xl" />
      
      {/* Grid overlay for subtle texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
    </div>

    
  );
}
