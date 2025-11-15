import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border/50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-dark-surface" />
      
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Infinibit Tech" className="w-12 h-12 rounded-lg" />
              <span className="text-lg font-bold neon-text">INFINIBIT</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building the future through AI-powered innovation and enterprise-grade solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 glass-card hover:bg-primary/20 rounded-lg transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass-card hover:bg-primary/20 rounded-lg transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass-card hover:bg-primary/20 rounded-lg transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass-card hover:bg-primary/20 rounded-lg transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">AI Automation</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Custom Software</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Mobile Apps</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Web Development</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>info@infinibit.tech</li>
              <li>+92 XXX XXXXXXX</li>
              <li>Pakistan</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 Infinibit Tech. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
