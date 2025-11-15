import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-surface to-background" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <span className="text-sm text-primary">Get In Touch</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              Let's Build <span className="neon-text">Together</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your business with cutting-edge technology? Let's discuss your project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="glass-card p-6 hover:scale-105 transition-transform">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">info@infinibit.tech</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 hover:scale-105 transition-transform">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-sm text-muted-foreground">+92 XXX XXXXXXX</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 hover:scale-105 transition-transform">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-sm text-muted-foreground">Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="lg:col-span-2">
              <form className="glass-card p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input 
                      placeholder="Your name" 
                      className="bg-secondary/50 border-border focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="bg-secondary/50 border-border focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input 
                    placeholder="Your company name (optional)" 
                    className="bg-secondary/50 border-border focus:border-primary transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Details</label>
                  <Textarea 
                    placeholder="Tell us about your project..." 
                    rows={6}
                    className="bg-secondary/50 border-border focus:border-primary transition-colors resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full glass-button bg-primary text-primary-foreground hover:bg-primary/90 group"
                >
                  Send Message
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
