import { X, Calendar, MapPin, Building, Award, Code, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Experience } from "./ExperienceTimeline";

interface ExperienceDialogProps {
  experience: Experience | null;
  onClose: () => void;
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'work':
      return <Building className="w-4 h-4" />;
    case 'education':
      return <Award className="w-4 h-4" />;
    case 'project':
      return <Code className="w-4 h-4" />;
    default:
      return <Building className="w-4 h-4" />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case 'work':
      return 'bg-primary';
    case 'education':
      return 'bg-accent';
    case 'project':
      return 'bg-secondary';
    default:
      return 'bg-primary';
  }
}

export function ExperienceDialog({ experience, onClose }: ExperienceDialogProps) {
  if (!experience) return null;

  return (
    <Dialog open={!!experience} onOpenChange={onClose}>
      <DialogContent className="glass border border-glass-border max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2 text-primary">
                  {getTypeIcon(experience.type)}
                  <span className="text-sm font-medium capitalize">{experience.type}</span>
                </div>
                <div className={`w-2 h-2 rounded-full ${getTypeColor(experience.type)}`}></div>
              </div>
              <DialogTitle asChild>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                  {experience.title}
                </h2>
              </DialogTitle>
              <p className="text-xl text-primary font-medium mb-1">{experience.company}</p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {experience.period}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {experience.location}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="glass border border-glass-border"
            >
              <X size={16} />
            </Button>
          </div>

          {/* Description */}
          <div className="glass rounded-xl p-6 border border-glass-border">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              Overview
            </h3>
            <p className="text-foreground/90 leading-relaxed text-base">
              {experience.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {experience.responsibilities.length > 0 && (
            <div className="glass rounded-xl p-6 border border-glass-border">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Key Responsibilities
              </h3>
              <ul className="space-y-3">
                {experience.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="text-foreground/90 flex items-start gap-3 text-base">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div className="glass rounded-xl p-6 border border-glass-border">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-2 bg-primary/20 text-primary text-sm rounded-full border border-primary/30 hover:bg-primary/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Achievements */}
          {experience.achievements.length > 0 && (
            <div className="glass rounded-xl p-6 border border-glass-border">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {experience.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-foreground/90 flex items-start gap-3 text-base">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Experience Type Badge */}
          <div className="flex justify-center pt-4">
            <div className={`px-4 py-2 rounded-full ${getTypeColor(experience.type)} text-white text-sm font-medium flex items-center gap-2`}>
              {getTypeIcon(experience.type)}
              <span className="capitalize">{experience.type} Experience</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
