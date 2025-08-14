'use client'

import { InteractiveBackground } from "@/components/InteractiveBackground";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";

export default function Experience() {
  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-3">
              <span className="bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
                Professional Experience
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My journey through various roles, projects, and educational milestones that have shaped my career
            </p>
          </div>

          {/* Enhanced Horizontal Timeline */}
          <div className="relative">
            <ExperienceTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}
