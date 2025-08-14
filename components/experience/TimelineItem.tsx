import { MapPin, Calendar } from "lucide-react";
import { Experience } from "./ExperienceTimeline";

interface TimelineItemProps {
  experience: Experience;
  index: number;
  total: number;
  onSelect: (experience: Experience) => void;
}

export function TimelineItem({ experience, index, onSelect }: TimelineItemProps) {

  // Calculate position along the curved timeline with alternating layout
  const itemIsAbove = index % 2 === 0; // Even indexes (0, 2, 4...) go above, odd indexes (1, 3, 5...) go below
  
  // Positions following the curved timeline path
  const curvePositions = [
    { x: 250, y: 400 },  // First point on curve
    { x: 500, y: 380 },  // Second point on curve (slightly up)
    { x: 750, y: 400 },  // Third point on curve  
    { x: 1000, y: 370 }, // Fourth point on curve (up)
    { x: 1250, y: 400 }  // Fifth point on curve
  ];
  
  const position = curvePositions[index] || curvePositions[0];

  const handleClick = () => {
    onSelect(experience);
  };

  return (
    <div
      className="absolute block"
      style={{
        left: `${position.x - 175}px`,
        top: itemIsAbove ? `${position.y - 280}px` : `${position.y + 40}px`, // Position above or below timeline
        width: '350px',
        zIndex: 10
      }}
    >
      {/* Enhanced Experience Card with angular accents */}
      <div
        className={`glass rounded-2xl border border-glass-border transition-all duration-500 ease-in-out transform hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
          itemIsAbove ? 'animate-fade-in-down' : 'animate-fade-in-up'
        }`}
        style={{ animationDelay: `${index * 0.2}s` }}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${experience.title} at ${experience.company}`}
        aria-describedby={`experience-${experience.id}-description`}
      >
        {/* Angular accent corner - consistent positioning */}
        <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-t-[20px] ${
          experience.type === 'work' ? 'border-l-primary/20 border-t-primary/20' :
          experience.type === 'education' ? 'border-l-accent/20 border-t-accent/20' : 'border-l-secondary/20 border-t-secondary/20'
        }`} />

        {/* Side accent line - consistent positioning */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${
          experience.type === 'work' ? 'bg-gradient-to-b from-primary to-primary/30' :
          experience.type === 'education' ? 'bg-gradient-to-b from-accent to-accent/30' : 'bg-gradient-to-b from-secondary to-secondary/30'
        }`} />
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                {experience.title}
              </h3>
              <p className="text-primary font-medium text-sm mb-1">{experience.company}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {experience.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {experience.location}
                </span>
              </div>
            </div>

            {/* Type indicator */}
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
              experience.type === 'work' ? 'bg-primary' :
              experience.type === 'education' ? 'bg-accent' : 'bg-secondary'
            }`} />
          </div>

          {/* Description */}
          <p
            id={`experience-${experience.id}-description`}
            className="text-sm text-foreground/80 mb-3 line-clamp-2"
          >
            {experience.description}
          </p>

          {/* Technologies Preview */}
          <div className="flex flex-wrap gap-1 mb-3">
            {experience.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                {tech}
              </span>
            ))}
            {experience.technologies.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{experience.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Click to view more hint */}
          <div className="text-center">
            <span className="text-xs text-muted-foreground">Click to view details</span>
          </div>
        </div>
      </div>
    </div>
  );
}
