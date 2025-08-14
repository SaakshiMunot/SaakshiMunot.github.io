'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, Linkedin, Instagram, FileText, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Photography", href: "/photography" },
  // { name: "Skills", href: "/skills" },
  // { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/saakshimunot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
              title="LinkedIn"
            >
              <Linkedin size={24} />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/saakshimunot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
              title="GitHub"
            >
              <Github size={24} />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/saakshimunot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
              title="Instagram"
            >
              <Instagram size={24} />
            </a>

            {/* Resume */}
            <a
              href="/assets/Saakshi_Munot.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
              title="Resume"
            >
              <FileText size={24} />
            </a>
            <a
              href="mailto:saakshi.munot@gmail.com"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
              title="Email"
            >
              <Mail size={24} />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-md font-medium transition-colors duration-200 hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 text-base font-medium transition-colors duration-200 hover:text-primary rounded-md",
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
