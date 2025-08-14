export interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "Founder & Software Developer, Fusen Fellow",
    company: "Fusen World, rebootED",
    period: "May 2025 - Present",
    location: "Atlanta, GA",
    description: "AI-driven learning platform for corporate trainers with automated content generation and scalable architecture.",
    technologies: ["LLMs", "FastAPI", "SpringBoot", "Next.js", "TypeScript"]
  },
  {
    id: 2,
    title: "Co-founder & Software Developer",
    company: "InboxPilot (ML@Purdue)",
    period: "Sept. 2024 - Present",
    location: "West Lafayette, IN",
    description: "Full-stack email automation platform with RAG-based intelligent processing and analytics.",
    technologies: ["Next.js", "TypeScript", "RAG", "Gmail API", "Outlook API"]
  },
  {
    id: 3,
    title: "Software Developer",
    company: "Hackathon Leaderboard (ML@Purdue)",
    period: "Sept. 2023 - Feb. 2024",
    location: "West Lafayette, IN",
    description: "Real-time hackathon leaderboard system with containerization and scalable features.",
    technologies: ["Flask", "React", "Docker", "Google Cloud Build", "Redis"]
  }
];


