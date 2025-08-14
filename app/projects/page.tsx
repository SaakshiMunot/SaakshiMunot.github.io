'use client'

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, ExternalLink, Github, X, Code, Users, Star, Building, Target, Zap, Award } from "lucide-react";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

import { projects, Project } from "@/data/projects";


interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onViewDetails: () => void;
}

function ProjectCard({ project, isActive, onViewDetails }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "ongoing": return "bg-yellow-500";
      case "archived": return "bg-gray-500";
      default: return "bg-primary";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Full-Stack": return <Code className="w-4 h-4" />;
      case "Frontend": return <Star className="w-4 h-4" />;
      case "Backend": return <Users className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-500/30 bg-red-500/10";
      case "medium": return "border-yellow-500/30 bg-yellow-500/10";
      case "low": return "border-green-500/30 bg-green-500/10";
      default: return "border-primary/30 bg-primary/10";
    }
  };

  return (
    <motion.div
      className={`glass rounded-2xl ${isActive ? 'p-6' : 'p-5'} border transition-all duration-300 cursor-pointer h-full ${isActive
          ? "border-primary/50 shadow-lg shadow-primary/20 bg-glass-bg/80"
          : "border-glass-border/50 hover:border-primary/40 bg-glass-bg/40 hover:bg-glass-bg/60 backdrop-blur-md"
        }`}
      whileHover={isActive ? { y: -5 } : { scale: 1.02, y: -2 }}
      onClick={onViewDetails}
    >
      <div className="flex flex-col h-full">
        {/* Project Image */}
        <div className="relative overflow-hidden rounded-lg mb-4 flex-shrink-0">
          <motion.img
            src={project.image}
            alt={project.title}
            className={`w-full ${isActive ? 'h-48' : 'h-40'} object-cover rounded-lg transition-all duration-300 ${!isActive ? "filter brightness-90 contrast-95" : ""
              }`}
            whileHover={{ scale: isActive ? 1.05 : 1.03 }}
            transition={{ duration: 0.3 }}
          />
          {/* Overlay for inactive cards */}
          {!isActive && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-lg" />
          )}
          <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${getStatusColor(project.status)} ${!isActive ? "ring-2 ring-white/20" : ""
            }`} />
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)} ${!isActive ? "backdrop-blur-sm" : ""
            }`}>
            {project.priority}
          </div>
        </div>

        {/* Project Info */}
        <div className="flex-1 flex flex-col space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getCategoryIcon(project.category)}
            <span>{project.category}</span>
            <span>•</span>
            <Calendar size={14} />
            <span>{project.date}</span>
          </div>

          <h3 className={`${isActive ? 'text-xl' : 'text-lg'} font-bold transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground/90 hover:text-primary group-hover:text-primary"
            }`}>
            {project.title}
          </h3>

          <p className={`text-sm leading-relaxed transition-colors duration-300 ${isActive ? "text-foreground/80" : "text-foreground/70 group-hover:text-foreground/85"
            }`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, isActive ? 5 : 3).map((tech) => (
              <span
                key={tech}
                className={`px-2 py-1 glass rounded-full text-xs border transition-all duration-300 ${isActive
                    ? "border-glass-border hover:border-primary/30"
                    : "border-glass-border/50 bg-glass-bg/30 hover:border-primary/20 hover:bg-glass-bg/50"
                  }`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > (isActive ? 5 : 3) && (
              <span className={`px-2 py-1 text-xs transition-colors duration-300 ${isActive ? "text-muted-foreground" : "text-muted-foreground/70"
                }`}>
                +{project.technologies.length - (isActive ? 5 : 3)} more
              </span>
            )}
          </div>

          {isActive && (
            <div className="flex flex-wrap gap-2 pt-3 mt-auto">
              {project.githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="glass border-glass-border hover:bg-glass-bg/50 text-xs px-3 py-1.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank');
                  }}
                >
                  <Github size={12} className="mr-1.5" />
                  Code
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="glass border-glass-border hover:bg-glass-bg/50 text-xs px-3 py-1.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.liveUrl, '_blank');
                  }}
                >
                  <ExternalLink size={12} className="mr-1.5" />
                  Demo
                </Button>
              )}
              <Button
                variant="default"
                size="sm"
                className="text-xs px-3 py-1.5"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails();
                }}
              >
                Details
              </Button>
            </div>
          )}

          {!isActive && (
            <div className="text-center pt-3 mt-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border border-glass-border/30 group-hover:border-primary/30 transition-all duration-300">
                <span className="text-xs text-muted-foreground/80 group-hover:text-primary/80 transition-colors duration-300">
                  Click to explore
                </span>
                <motion.div
                  className="w-1 h-1 bg-primary/60 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [direction, setDirection] = useState(0);

  // Global keyboard event handler for carousel navigation
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          nextProject();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevProject();
          break;
        case 'Escape':
          if (selectedProject) {
            setSelectedProject(null);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [currentIndex, selectedProject]);

  const nextProject = () => {
    setDirection(1);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 50);
  };

  const prevProject = () => {
    setDirection(-1);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }, 50);
  };

  const goToProject = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setTimeout(() => {
      setCurrentIndex(index);
    }, 50);
  };



  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
                My Projects
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work and creative projects
            </p>
          </div>

          {/* Enhanced Project Carousel */}
          <div className="relative mt-10 overflow-hidden">
            <div className="flex items-center justify-center min-h-[600px]">
              {/* Navigation Buttons */}
              <motion.div
                className="absolute left-4 z-20"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95, x: -10 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass border border-glass-border hover:bg-glass-bg/50 transition-all duration-300"
                  onClick={prevProject}
                >
                  <ChevronLeft size={24} />
                </Button>
              </motion.div>

              <motion.div
                className="absolute right-4 z-20"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95, x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass border border-glass-border hover:bg-glass-bg/50 transition-all duration-300"
                  onClick={nextProject}
                >
                  <ChevronRight size={24} />
                </Button>
              </motion.div>

              {/* Carousel Container */}
              <div className="relative w-full max-w-7xl mx-auto px-16">
                <div className="flex items-start justify-center space-x-8 min-h-[600px]">
                  {/* Previous Project (Enhanced Side Card) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`prev-${(currentIndex - 1 + projects.length) % projects.length}`}
                      className="hidden lg:block w-full max-w-sm relative group cursor-pointer"
                      onClick={() => goToProject((currentIndex - 1 + projects.length) % projects.length)}
                      initial={{ opacity: 0, scale: 0.6, x: -100, rotateY: -15 }}
                      animate={{
                        opacity: 0.6,
                        scale: 0.8,
                        x: 0,
                        rotateY: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                          duration: 0.8
                        }
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.6,
                        x: -100,
                        rotateY: -15,
                        transition: { duration: 0.4 }
                      }}
                      whileHover={{
                        scale: 0.85,
                        opacity: 0.8,
                        x: 10,
                        rotateY: 5,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      style={{ perspective: 1000 }}
                    >
                      {/* Gradient overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                      {/* Navigation hint */}
                      {/* <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2 border border-primary/30">
                        <ChevronLeft size={16} className="text-primary" />
                      </div>
                    </div> */}

                      <div className="relative z-10 h-full flex items-center">
                        <div className="w-full">
                          <ProjectCard
                            project={projects[(currentIndex - 1 + projects.length) % projects.length]}
                            isActive={false}
                            onViewDetails={() => setSelectedProject(projects[(currentIndex - 1 + projects.length) % projects.length])}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Current Project (Main Focus) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      className="w-full max-w-4xl h-full flex items-center"
                      initial={{
                        x: direction > 0 ? 400 : -400,
                        opacity: 0,
                        scale: 0.7,
                        rotateY: direction > 0 ? 20 : -20
                      }}
                      animate={{
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                          duration: 0.8
                        }
                      }}
                      exit={{
                        x: direction > 0 ? -400 : 400,
                        opacity: 0,
                        scale: 0.7,
                        rotateY: direction > 0 ? -20 : 20,
                        transition: {
                          duration: 0.4,
                          ease: "easeInOut"
                        }
                      }}
                      style={{ perspective: 1000 }}
                    >
                      <div className="w-full">
                        <ProjectCard
                          project={projects[currentIndex]}
                          isActive={true}
                          onViewDetails={() => setSelectedProject(projects[currentIndex])}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Next Project (Enhanced Side Card) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`next-${(currentIndex + 1) % projects.length}`}
                      className="hidden lg:block w-full max-w-sm relative group cursor-pointer"
                      onClick={() => goToProject((currentIndex + 1) % projects.length)}
                      initial={{ opacity: 0, scale: 0.6, x: 100, rotateY: 15 }}
                      animate={{
                        opacity: 0.6,
                        scale: 0.8,
                        x: 0,
                        rotateY: 0,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                          duration: 0.8
                        }
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.6,
                        x: 100,
                        rotateY: 15,
                        transition: { duration: 0.4 }
                      }}
                      whileHover={{
                        scale: 0.85,
                        opacity: 0.8,
                        x: -10,
                        rotateY: -5,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      style={{ perspective: 1000 }}
                    >
                      {/* Gradient overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary/5 to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-l from-primary/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                      {/* Navigation hint */}
                      {/* <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2 border border-primary/30">
                        <ChevronRight size={16} className="text-primary" />
                      </div>
                    </div> */}

                      <div className="relative z-10 h-full flex items-center">
                        <div className="w-full">
                          <ProjectCard
                            project={projects[(currentIndex + 1) % projects.length]}
                            isActive={false}
                            onViewDetails={() => setSelectedProject(projects[(currentIndex + 1) % projects.length])}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Enhanced Project Indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  onClick={() => goToProject(index)}
                  className={`relative transition-all duration-300 ${index === currentIndex
                      ? "w-8 h-3 bg-primary rounded-full"
                      : "w-3 h-3 bg-muted hover:bg-primary/50 rounded-full"
                    }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Project Counter */}
            <div className="text-center mt-4">
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {projects.length} projects
              </span>
            </div>

            {/* Keyboard Navigation Hint */}
            <div className="text-center mt-2">
              <span className="text-xs text-muted-foreground/70">
                Use arrow keys to navigate • ESC to close dialogs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass border border-glass-border max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Code className="w-4 h-4" />
                      <span className="text-sm font-medium capitalize">{selectedProject.category}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${selectedProject.status === "completed" ? "bg-green-500" :
                        selectedProject.status === "ongoing" ? "bg-yellow-500" : "bg-gray-500"
                      }`}></div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${selectedProject.priority === "high" ? "bg-red-500/20 text-red-400" :
                        selectedProject.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-green-500/20 text-green-400"
                      }`}>
                      {selectedProject.priority} priority
                    </div>
                  </div>
                  <DialogTitle asChild>
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                      {selectedProject.title}
                    </h2>
                  </DialogTitle>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {selectedProject.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {selectedProject.teamSize ? `${selectedProject.teamSize} team members` : "Solo project"}
                    </span>
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      {selectedProject.duration}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                  className="glass border border-glass-border"
                >
                  <X size={16} />
                </Button>
              </div>

              {/* Project Image */}
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {selectedProject.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass border-glass-border hover:bg-glass-bg/50"
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </Button>
                  )}
                  {selectedProject.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass border-glass-border hover:bg-glass-bg/50"
                      onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="glass rounded-xl p-6 border border-glass-border">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  Project Overview
                </h3>
                <p className="text-foreground/90 leading-relaxed text-base">
                  {selectedProject.longDescription}
                </p>
              </div>

              {/* Technologies */}
              <div className="glass rounded-xl p-6 border border-glass-border">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Technologies & Tools
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 glass rounded-full text-sm border border-glass-border hover:border-primary/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Features and Challenges Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Key Features */}
                <div className="glass rounded-xl p-6 border border-glass-border">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="text-foreground/90 flex items-start gap-3 text-base">
                        <span className="w-2 h-2 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges */}
                <div className="glass rounded-xl p-6 border border-glass-border">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-yellow-500" />
                    Technical Challenges
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.challenges.map((challenge, idx) => (
                      <li key={idx} className="text-foreground/90 flex items-start gap-3 text-base">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2.5 flex-shrink-0" />
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Achievements */}
              {selectedProject.achievements.length > 0 && (
                <div className="glass rounded-xl p-6 border border-glass-border">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-500" />
                    Key Achievements
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-foreground/90 flex items-start gap-3 text-base">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project Status Badge */}
              <div className="flex justify-center pt-4">
                <div className={`px-4 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 ${selectedProject.status === "completed" ? "bg-green-500" :
                    selectedProject.status === "ongoing" ? "bg-yellow-500" : "bg-gray-500"
                  }`}>
                  <Code className="w-4 h-4" />
                  <span className="capitalize">{selectedProject.status} Project</span>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
