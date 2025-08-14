import { InteractiveBackground } from "@/components/InteractiveBackground";
import { SimpleChat } from "@/components/SimpleChat";
import Spline from '@splinetool/react-spline/next';
import { AnimatedName } from "@/components/AnimatedName";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experiences";
 

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />

      <div className="relative z-10 min-h-screen flex items-center px-4 pt-2">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[calc(100vh-8rem)]">

            {/* Left Column - Content */}
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left lg:pl-12 xl:pl-20">
              {/* Name */}
              <AnimatedName />
              <p className="text-l md:text-xl lg:text-2xl font-bold leading-tight text-center lg:text-left">
                <span className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
                  Computer Science Student @ Purdue University
                </span>
              </p>

              {/* Chat Interface */}
              <div className="w-full">
                <SimpleChat />
              </div>
            </div>

            {/* Right Column - Spline 3D Viewer */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg lg:max-w-none lg:w-full h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
                <Spline
                  scene="https://prod.spline.design/DzC955ykVhb5FHGF/scene.splinecode"
                  className="w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="relative z-10 py-4 pt-20 px-4 -mt-16 md:-mt-24">
        <div className="w-full max-w-7xl mx-auto">
          <div className="glass rounded-3xl border border-glass-border p-8 md:p-12" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
                  Tech Stack
                </span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Languages, frameworks, and tools I use
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Languages */}
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold mb-6">Languages</h3>
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 max-w-md">
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Java">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" alt="Java" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Python">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="C">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" alt="C" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="C++">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="PostgreSQL">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="MySQL">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="JavaScript">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="HTML5">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML5" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="CSS3">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS3" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="R">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg" alt="R" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="TypeScript">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" />
                  </div>
                </div>
              </div>

              {/* Frameworks */}
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold mb-6">Frameworks</h3>
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 max-w-md">
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="React">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Node.js">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Next.js">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Flask">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" alt="Flask" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="FastAPI">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" alt="FastAPI" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Spring Boot">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" alt="Spring Boot" />
                  </div>
                </div>
              </div>

              {/* Tools */}
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold mb-6">Tools</h3>
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 max-w-md">
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Git">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Docker">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="Docker" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Google Cloud Platform">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" alt="Google Cloud Platform" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="VS Code">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt="VS Code" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Visual Studio">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-plain.svg" alt="Visual Studio" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="IntelliJ IDEA">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" alt="IntelliJ IDEA" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="AWS">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Linux">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" alt="Linux" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Firebase">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" alt="Firebase" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="Android Studio">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg" alt="Android Studio" />
                  </div>
                  <div className="glass rounded-xl border border-glass-border p-2 md:p-3 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:border-primary/50 transition-all duration-300" title="IntelliJ IDEA">
                    <img className="w-6 h-6 md:w-7 md:h-7" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" alt="IntelliJ" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="relative z-10 py-4 px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="glass rounded-3xl border border-glass-border p-6 md:p-8" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">Featured Projects</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A quick peek at my recent work</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="glass rounded-2xl border border-glass-border overflow-hidden hover:border-primary/40 transition-all">
                  <div className="h-40 w-full overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 glass rounded-full text-xs border border-glass-border/60">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/projects">
                <Button className="rounded-xl">View all projects</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="relative z-10 py-4 px-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="glass rounded-3xl border border-glass-border p-6 md:p-8" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">Experience</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Recent roles and contributions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experiences.slice(0, 3).map((exp) => (
                <div key={exp.id} className="glass rounded-2xl border border-glass-border p-5 hover:border-primary/40 transition-all">
                  <h3 className="text-lg font-semibold text-primary mb-1">{exp.title}</h3>
                  <p className="text-foreground/90">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period} • {exp.location}</p>
                  <p className="text-sm text-foreground/80 mt-3 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-1 glass rounded-full text-xs border border-glass-border/60">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/experience">
                <Button className="rounded-xl">View all experience</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
