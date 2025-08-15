export interface Project {
  id: number;
  title: string;
  date: string;
  year: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  achievements: string[];
  teamSize?: number;
  duration: string;
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  status: "completed" | "ongoing" | "archived";
  priority: "high" | "medium" | "low";
}

export const projects: Project[] = [
  {
    id: 1,
    title: "rebootED - Fusen World Fellowship",
    date: "May 2025 – Present",
    year: "2025",
    category: "Full-Stack AI",
    description: "AI-driven learning platform for corporate trainers with automated content generation",
    longDescription: "An AI-powered learning platform designed to revolutionize corporate training. It uses LLMs for automated content generation, significantly reducing course creation time. The platform features a scalable microservices backend and a responsive frontend that adapts to user context, providing real-time AI feedback to enhance engagement.",
    technologies: ["LLMs", "FastAPI", "SpringBoot", "Next.js", "TypeScript"],
    features: ["Automated Content Generation", "Scalable Microservices", "Real-time AI Feedback", "Dynamic UI Adaptation", "Enterprise LMS Integration", "Diverse Content Support"],
    challenges: ["Integrating LLMs for efficient content automation", "Building scalable backend architecture", "Implementing context-aware UI adaptations", "Ensuring seamless enterprise integrations"],
    achievements: ["Reduced course creation time by 90%", "Enhanced user engagement by 60%", "Enabled support for diverse content types"],
    teamSize: 3,
    duration: "Ongoing",
    liveUrl: "https://tryrebooted.com/",
    image: "/projects/rebootED.jpeg",
    status: "ongoing",
    priority: "high"
  },
  {
    id: 2,
    title: "InboxPilot",
    date: "September 2024 – Present",
    year: "2024",
    category: "Full-Stack",
    description: "Full-stack email automation platform with RAG-based intelligent processing",
    longDescription: "A comprehensive email automation tool that streamlines routine tasks using Next.js and TypeScript. It incorporates a RAG-based system for context-aware responses and integrates with Gmail and Outlook. The platform includes an analytics dashboard and automated rule engine to minimize manual management.",
    technologies: ["Next.js", "TypeScript", "RAG", "Gmail API", "Outlook API"],
    features: ["Email Automation", "Context-Aware Responses", "Analytics Dashboard", "Automated Rule Engine", "Gmail/Outlook Integration", "Task Tracking Metrics"],
    challenges: ["Implementing RAG for intelligent email processing", "Integrating with multiple email providers", "Designing comprehensive analytics", "Optimizing for time-saving automation"],
    achievements: ["Automated 60% of routine email tasks", "Saved users an average of 10 hours weekly", "Reduced manual email management by 60%"],
    teamSize: 5,
    duration: "Ongoing",
    liveUrl: "https://www.theinboxpilot.com/",
    image: "/projects/inboxPilot.png",
    status: "ongoing",
    priority: "high"
  },
  {
    id: 3,
    title: "Scurry",
    date: "January 2023 - May 2023",
    year: "2023",
    category: "Full Stack Web Dev",
    description: "Gamified learning management system for K-12 students with Firebase integration",
    longDescription: "A gamified learning management system designed for K-12 students, utilizing Firebase for authentication and analytics. The platform increases classroom engagement through interactive elements and provides optimized UI/UX for both teachers and students, resulting in improved navigation, usability, and higher user retention during pilot testing.",
    technologies: ["HTML", "JavaScript", "CSS", "Firebase"],
    features: ["Gamified Learning", "User Authentication", "Analytics Tracking", "Teacher/Student UI", "Engagement Metrics", "Retention Optimization"],
    challenges: ["Integrating real-time analytics with Firebase", "Optimizing UI for diverse user groups", "Balancing gamification with educational content", "Ensuring cross-browser compatibility"],
    achievements: ["Increased classroom engagement by 40%", "Achieved 30% higher user retention in pilot testing", "Streamlined navigation and usability"],
    teamSize: 4,
    duration: "5 months",
    githubUrl: "https://github.com/ssbthedev/ScurryTeacherSide",
    liveUrl: "https://tsa-2023-nu.vercel.app/",
    image: "/projects/scurry.png",
    status: "completed",
    priority: "medium"
  },
  {
    id: 4,
    title: "myBaymax",
    date: "April 2023",
    year: "2023",
    category: "AI/ML",
    description: "Virtual health assistant with ML-based audio recognition and voice controls",
    longDescription: "A virtual health assistant that leverages machine learning for audio recognition and Web Speech API for improved accessibility. It enhances user interaction through voice-based controls and visual engagement features, making it suitable for users with diverse needs.",
    technologies: ["WebSpeech API", "HTML", "CSS", "JS", "Tensorflow.js", "Teachable Machine"],
    features: ["Audio Recognition", "Voice Controls", "Visual Engagement", "Accessibility Features", "ML Integration"],
    challenges: ["Implementing accurate ML-based audio recognition", "Integrating Web Speech API seamlessly", "Enhancing accessibility for diverse users", "Optimizing performance for real-time interactions"],
    achievements: ["Improved accessibility for users with diverse needs", "Enhanced user interaction with voice and visual features", "Achieved high precision in audio processing"],
    teamSize: 3,
    duration: "1 month",
    image: "/projects/baymax.jpg",
    status: "completed",
    priority: "high"
  },
  {
    id: 5,
    title: "AISL",
    date: "April 2022",
    year: "2022",
    category: "AI/ML",
    description: "Real-time ASL recognition and audio translation system using computer vision",
    longDescription: "An AI-powered system for real-time American Sign Language (ASL) recognition and audio translation, utilizing TensorFlow.js and computer vision. It bridges communication gaps between ASL and non-ASL users by providing accurate translations and improving overall accessibility.",
    technologies: ["TensorFlow.js", "Computer Vision", "HTML", "JS", "Speech Synthesis"],
    features: ["Real-time Recognition", "Audio Translation", "Computer Vision", "Speech Synthesis", "Accessibility Bridge"],
    challenges: ["Achieving high precision in ASL recognition", "Integrating computer vision with real-time processing", "Ensuring accurate audio translations", "Optimizing for low-latency performance"],
    achievements: ["Enabled accurate translation with 85% precision", "Bridged communication for ASL and non-ASL users", "Improved accessibility through AI integration"],
    teamSize: 3,
    duration: "1 month",
    githubUrl: "https://github.com/ssbthedev/AISL",
    liveUrl: "https://ssbthedev.github.io/AISL/",
    image: "/projects/AISL.jpg",
    status: "completed",
    priority: "medium"
  },
  {
    id: 6,
    title: "MCST Bus Locator Application",
    date: "October 2021 - June 2022",
    year: "2022",
    category: "Full Stack",
    description: "GPS-enabled bus locator system with automated routing and scheduling",
    longDescription: "A GPS-enabled application for locating school buses, integrated with Firebase and Google APIs. It enhances transportation efficiency by automating routing and scheduling, reducing planning time, and remains in active use across the school district.",
    technologies: ["HTML", "CSS", "JS", "Firebase"],
    features: ["GPS Tracking", "Automated Routing", "Scheduling Tools", "Google API Integration", "Efficiency Metrics", "District-wide Usage"],
    challenges: ["Integrating GPS with Firebase for real-time tracking", "Automating complex routing algorithms", "Ensuring reliability across devices", "Handling school district-scale data"],
    achievements: ["Enhanced school transportation efficiency by 50%", "Reduced planning time by 60%", "Maintained active use across the school district"],
    teamSize: 2,
    duration: "9 months",
    githubUrl: "https://github.com/SaakshiMunot/Student-Bus-Application",
    liveUrl: "https://mcst-student-bus-application.vercel.app/",
    image: "/projects/mcst.png",
    status: "completed",
    priority: "high"
  }, 
  {
    id: 7,
    title: "Personal Portfolio",
    date: "2025 – Present",
    year: "2025",
    category: "Frontend",
    description: "Interactive portfolio featuring a chat interface, 3D visuals, and a modern UI.",
    longDescription: "This portfolio showcases my work and skills through an interactive experience built with Next.js and TypeScript. It includes a custom chat interface, a 3D Spline scene, smooth animations with Framer Motion, and responsive layouts. The site is optimized for performance and accessibility while maintaining a polished visual style.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Spline", "RAG", "OpenAI", "AI/LLMs"],
    features: [
      "Simple chat interface",
      "3D scene",
      "Responsive design",
      "Projects carousel",
      "Photography gallery",
      "Accessible keyboard interactions"
    ],
    challenges: [
      "Preventing full-page scroll on Enter in chat",
      "Balancing animation fidelity and performance",
      "Maintaining accessibility with rich visuals"
    ],
    achievements: [
      "Launched v1 with interactive sections",
      "Improved engagement with modern UI",
      "Optimized page structure and performance"
    ],
    teamSize: 1,
    duration: "Ongoing",
    liveUrl: "/",
    image: "/projects/portfolio.png",
    status: "ongoing",
    priority: "high"
  }
];


