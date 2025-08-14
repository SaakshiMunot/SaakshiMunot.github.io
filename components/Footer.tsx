import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-glass-border glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="text-sm text-muted-foreground">
            <span className="block">Designed and built by Saakshi Munot</span>
            <span className="block">© {new Date().getFullYear()} All rights reserved</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:saakshi.munot@gmail.com"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
              title="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://linkedin.com/in/saakshimunot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/saakshimunot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://instagram.com/saakshimunot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
              title="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="/assets/Saakshi_Munot.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors duration-200"
              title="Resume"
            >
              <FileText size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


