import { InteractiveBackground } from "@/components/InteractiveBackground";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoonText?: string;
}

export function PlaceholderPage({ 
  title, 
  description, 
  comingSoonText = "This section is currently under development. Check back soon for updates!" 
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen relative">
      <InteractiveBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            <p className="text-xl text-foreground/80 font-light">
              {description}
            </p>
          </div>

          <div className="glass rounded-2xl p-8 border border-glass-border">
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <MessageCircle size={24} className="text-white" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Coming Soon</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {comingSoonText}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="glass border-glass-border hover:bg-glass-bg/50 rounded-xl"
                  >
                    <ArrowLeft className="mr-2" size={16} />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                  >
                    <MessageCircle className="mr-2" size={16} />
                    Ask Me About This
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
