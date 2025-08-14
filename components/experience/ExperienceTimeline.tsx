import { useState } from "react";
import { TimelineItem } from "./TimelineItem";
import { TimelinePath } from "./TimelinePath";
import { ExperienceDialog } from "./ExperienceDialog";

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  type: "work" | "education" | "project";
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Founder & Software Developer, Fusen Fellow",
    company: "Fusen World, rebootED",
    period: "May 2025 - Present",
    location: "Atlanta, GA",
    description: "Designing and building an AI-driven learning platform for corporate trainers with automated content generation and scalable architecture.",
    responsibilities: [
      "Designing and Building an AI-driven learning platform using LLMs for automated content generation",
      "Architecting a scalable microservices backend with FastAPI and SpringBoot for enterprise LMS integration",
      "Developing a responsive Next.js/Typescript frontend with real-time AI feedback and dynamic UI adaptation"
    ],
    technologies: ["LLMs", "FastAPI", "SpringBoot", "Next.js", "TypeScript", "React", "Supabase", "GCP", "SQL"],
    achievements: [
      "Reduced course creation time by 90% through automated content generation",
      "Enabled seamless integration with enterprise LMS platforms and support for diverse content types",
      "Enhanced user engagement by 60% with adaptive UI features"
    ],
    type: "work"
  },
  {
    id: 2,
    title: "Co-founder & Software Developer",
    company: "InboxPilot (ML@Purdue)",
    period: "Sept. 2024 - Present",
    location: "West Lafayette, IN",
    description: "Developing a full-stack email automation platform with intelligent processing and analytics.",
    responsibilities: [
      "Developing a full-stack email automation platform with Next.js and Typescript",
      "Implementing a RAG-based intelligent email processing system with Gmail and Outlook integration",
      "Designing a comprehensive analytics dashboard and automated rule engine"
    ],
    technologies: ["Next.js", "TypeScript", "RAG", "Gmail API", "Outlook API", "React", "Python", "Tailwind", "Firebase"],
    achievements: [
      "Automated 60% of routine email tasks, saving users an average of 10 hours weekly",
      "Enabled context-aware responses through RAG integration",
      "Reduced manual email management by 60% with automated rules and analytics tracking 6+ key metrics"
    ],
    type: "work"
  },
  {
    id: 3,
    title: "Software Developer",
    company: "Hackathon Leaderboard (ML@Purdue)",
    period: "Sept. 2023 - Feb. 2024",
    location: "West Lafayette, IN",
    description: "Contributing to a real-time hackathon leaderboard system with containerization and scalable features.",
    responsibilities: [
      "Contributing to a real-time hackathon leaderboard using Flask and React with dynamic sorting and RESTful API integration",
      "Implementing Docker containerization and CI/CD pipelines using Google Cloud Build",
      "Developing a scalable system with Redis persistence and sponsor server integration for competition management"
    ],
    technologies: ["Flask", "React", "Docker", "Google Cloud Build", "Redis"],
    achievements: [
      "Supported 15+ concurrent entries with seamless state management and dual scoring metrics",
      "Reduced deployment complexity by 80% through automation",
      "Enabled efficient competition management with real-time features"
    ],
    type: "work"
  },
  {
    id: 4,
    title: "Associate Network Support Specialist Intern",
    company: "Computer Advice and Services",
    period: "Sept. 2022 - April 2023",
    location: "Rockaway, NJ",
    description: "Provided technical support and assisted network engineers with project and maintenance tasks.",
    responsibilities: [
      "Handling calls and remote support for network-related issues",
      "Providing technical assistance to end-users experiencing network problems",
      "Collaborating with senior network engineers to execute project tasks and routine maintenance activities"
    ],
    technologies: ["Firewalls", "Device Security", "Penetration Testing", "Virtual Machines"],
    achievements: [
      "Improved response time for network-related user issues",
      "Supported successful execution of multiple network maintenance projects",
      "Enhanced system security through assistance in penetration testing"
    ],
    type: "work"
  },
  {
    id: 5,
    title: "Code Sensei (Teacher)",
    company: "Code Ninjas",
    period: "May 2022 - Aug. 2023",
    location: "Denville, NJ",
    description: "Taught coding to children in an encouraging environment, focusing on Unity and JavaScript.",
    responsibilities: [
      "Providing an encouraging and nurturing environment for children through teaching Unity and JavaScript",
      "Developing lessons, activities, and materials to cover required course material",
      "Creating a positive and safe environment for student growth"
    ],
    technologies: ["Unity", "JavaScript", "Scratch", "Public Speaking", "Teaching", "Leadership"],
    achievements: [
      "Fostered a positive learning environment for young coders",
      "Developed engaging lesson plans that improved student participation",
      "Supported student growth in coding proficiency and confidence"
    ],
    type: "work"
  },
  // {
  //   id: 6,
  //   title: "B.S. in Computer Science",
  //   company: "Purdue University",
  //   period: "Expected Dec 2026",
  //   location: "West Lafayette, IN",
  //   description: "Bachelor's degree in Computer Science with a minor in Mathematics and concentrations in Machine Intelligence and Databases and Information Systems.",
  //   responsibilities: [
  //     "Pursuing coursework in computer science, mathematics, machine intelligence, and databases",
  //     "Participating in relevant projects and experiences through ML@Purdue and other initiatives"
  //   ],
  //   technologies: ["Java", "Python", "C/C++", "SQL", "JavaScript", "React", "Node.js", "Next.js", "Flask", "FastAPI", "Spring Boot", "Git", "Docker", "Google Cloud Platform", "AWS", "Firebase", "LLMs", "Computer Vision"],
  //   achievements: [
  //     "Maintaining strong academic performance towards degree completion",
  //     "Gaining practical experience through concentrations in Machine Intelligence and Databases"
  //   ],
  //   type: "education"
  // }
];

export function ExperienceTimeline() {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  return (
    <div className="relative">
      {/* Enhanced Horizontal Timeline Container - Hidden on mobile and tablet */}
      <div
        className="hidden lg:block relative overflow-x-auto pb-8 scrollbar-hide"
        role="region"
        aria-label="Professional experience timeline"
      >
        <div className="min-w-[1500px] relative h-[800px]">
          {/* Enhanced Timeline Path with Angular Elements */}
          <TimelinePath />

          {/* Timeline Items */}
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              total={experiences.length}
              onSelect={setSelectedExperience}
            />
          ))}
        </div>
      </div>

      {/* Vertical Timeline for mobile and tablet screens */}
      <div className="lg:hidden space-y-6" role="region" aria-label="Vertical experience timeline">
        {/* Mobile timeline line */}
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-50" />

          {experiences.map((experience, index) => (
            <div key={experience.id} className="relative mb-8 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Timeline dot */}
              <div className="absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-background z-10">
                <div className={`w-full h-full rounded-full ${
                  experience.type === 'work' ? 'bg-primary' :
                  experience.type === 'education' ? 'bg-accent' : 'bg-secondary'
                }`} />
              </div>

              {/* Content card */}
              <div
                className="ml-12 glass rounded-2xl p-6 border border-glass-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                onClick={() => setSelectedExperience(experience)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedExperience(experience);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${experience.title} at ${experience.company}`}
              >
                <h3 className="text-xl font-semibold text-white mb-1">{experience.title}</h3>
                <p className="text-primary font-medium mb-2">{experience.company}</p>
                <p className="text-sm text-muted-foreground mb-3">{experience.period} • {experience.location}</p>
                <p className="text-foreground/90 mb-4">{experience.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {experience.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                  {experience.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{experience.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="text-center">
                  <span className="text-xs text-muted-foreground">Tap to view details</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Detail Dialog */}
      <ExperienceDialog
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </div>
  );
}
