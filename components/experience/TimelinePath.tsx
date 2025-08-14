export function TimelinePath() {
  return (
    <div className="absolute inset-0 hidden lg:block">
      {/* Enhanced Horizontal Timeline Path with Angular and Curved Elements */}
      <svg
        className="w-full h-full"
        viewBox="0 0 1800 800"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Enhanced gradient for the timeline path */}
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="20%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="40%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
            <stop offset="80%" stopColor="hsl(var(--accent))" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          </linearGradient>

          {/* Enhanced glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Stronger glow for emphasis */}
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Animated gradient for flowing effect */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
            <stop offset="75%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-200 0; 1800 0; -200 0"
              dur="12s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {/* Background glow path - Curved horizontal line */}
        <path
          d="M 100 400 Q 300 350, 500 380 Q 700 420, 900 400 Q 1100 370, 1300 400 Q 1500 380, 1700 400"
          stroke="url(#timelineGradient)"
          strokeWidth="10"
          fill="none"
          filter="url(#strongGlow)"
          opacity="0.7"
        />

        {/* Main horizontal timeline path - Curved line */}
        <path
          d="M 100 400 Q 300 350, 500 380 Q 700 420, 900 400 Q 1100 370, 1300 400 Q 1500 380, 1700 400"
          stroke="url(#timelineGradient)"
          strokeWidth="5"
          fill="none"
          className="animate-pulse-glow"
        />

        {/* Animated flowing effect - Curved line */}
        <path
          d="M 100 400 Q 300 350, 500 380 Q 700 420, 900 400 Q 1100 370, 1300 400 Q 1500 380, 1700 400"
          stroke="url(#flowGradient)"
          strokeWidth="7"
          fill="none"
        />

        {/* Enhanced Timeline nodes with angular elements - Following the curve */}
        <g className="timeline-nodes">
          {/* Node 1 - Angular design */}
          <g transform="translate(250, 375)">
            <polygon points="-12,0 -6,-10 6,-10 12,0 6,10 -6,10" fill="hsl(var(--primary))" className="animate-pulse-glow">
              <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="3s" repeatCount="indefinite" />
            </polygon>
            <circle r="6" fill="white" />
            <circle r="3" fill="hsl(var(--primary))" />
          </g>

          {/* Node 2 - Diamond shape */}
          <g transform="translate(500, 380)">
            <polygon points="0,-12 12,0 0,12 -12,0" fill="hsl(var(--accent))" className="animate-pulse-glow">
              <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="3s" repeatCount="indefinite" begin="0.6s" />
            </polygon>
            <circle r="6" fill="white" />
            <circle r="3" fill="hsl(var(--accent))" />
          </g>

          {/* Node 3 - Hexagon */}
          <g transform="translate(750, 405)">
            <polygon points="-10,0 -5,-8.7 5,-8.7 10,0 5,8.7 -5,8.7" fill="hsl(var(--primary))" className="animate-pulse-glow">
              <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="3s" repeatCount="indefinite" begin="1.2s" />
            </polygon>
            <circle r="6" fill="white" />
            <circle r="3" fill="hsl(var(--primary))" />
          </g>

          {/* Node 4 - Star shape */}
          <g transform="translate(1000, 385)">
            <polygon points="0,-12 3,-4 12,-4 6,2 9,10 0,6 -9,10 -6,2 -12,-4 -3,-4" fill="hsl(var(--accent))" className="animate-pulse-glow">
              <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="3s" repeatCount="indefinite" begin="1.8s" />
            </polygon>
            <circle r="6" fill="white" />
            <circle r="3" fill="hsl(var(--accent))" />
          </g>

          {/* Node 5 - Triangle shape */}
          <g transform="translate(1300, 400)">
            <polygon points="0,-12 10,8 -10,8" fill="hsl(var(--primary))" className="animate-pulse-glow">
              <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="3s" repeatCount="indefinite" begin="2.4s" />
            </polygon>
            <circle r="6" fill="white" />
            <circle r="3" fill="hsl(var(--primary))" />
          </g>
        </g>

        {/* Enhanced decorative elements with angular shapes */}
        <g className="decorative-elements" opacity="0.5">
          {/* Vertical connector lines extending both up and down from timeline */}
          <line x1="250" y1="320" x2="250" y2="480" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
          <line x1="500" y1="300" x2="500" y2="460" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.4" />
          <line x1="750" y1="320" x2="750" y2="480" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
          <line x1="1000" y1="290" x2="1000" y2="450" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.4" />
          <line x1="1300" y1="320" x2="1300" y2="480" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />

          {/* Angular accent shapes at key positions - centered around timeline */}
          {/* <polygon
            points="190,320 210,320 200,300"
            fill="hsl(var(--primary))"
            opacity="0.6"
            className="animate-pulse-glow"
          />
          <polygon
            points="390,480 410,480 400,500"
            fill="hsl(var(--accent))"
            opacity="0.6"
            className="animate-pulse-glow"
          /> */}
          {/* <polygon
            points="590,320 610,320 600,300"
            fill="hsl(var(--primary))"
            opacity="0.6"
            className="animate-pulse-glow"
          />
          <polygon
            points="790,480 810,480 800,500"
            fill="hsl(var(--accent))"
            opacity="0.6"
            className="animate-pulse-glow"
          />
          <polygon
            points="990,320 1010,320 1000,300"
            fill="hsl(var(--primary))"
            opacity="0.6"
            className="animate-pulse-glow"
          /> */}

          {/* Additional geometric elements along timeline */}
          <rect x="296" y="396" width="8" height="8" fill="hsl(var(--accent))" opacity="0.5" transform="rotate(45 300 400)" />
          <rect x="496" y="396" width="8" height="8" fill="hsl(var(--primary))" opacity="0.5" transform="rotate(45 500 400)" />
          <rect x="696" y="396" width="8" height="8" fill="hsl(var(--accent))" opacity="0.5" transform="rotate(45 700 400)" />
          <rect x="896" y="396" width="8" height="8" fill="hsl(var(--primary))" opacity="0.5" transform="rotate(45 900 400)" />
          <rect x="1096" y="396" width="8" height="8" fill="hsl(var(--accent))" opacity="0.5" transform="rotate(45 1100 400)" />
          <rect x="1096" y="396" width="8" height="8" fill="hsl(var(--accent))" opacity="0.5" transform="rotate(45 1100 400)" />

          {/* Horizontal flow indicators */}
          <polygon points="120,395 140,390 140,410" fill="hsl(var(--primary))" opacity="0.4" />
          <polygon points="1460,395 1480,390 1480,410" fill="hsl(var(--primary))" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}
