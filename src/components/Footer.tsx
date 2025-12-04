import { Linkedin, Briefcase, Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { Link } from "react-router-dom";

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
              <a 
                href="https://wa.me/923147647998" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 glass-card hover:bg-primary/20 rounded-lg transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/husnain-shabeer-099557268/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 glass-card hover:bg-primary/20 rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.upwork.com/freelancers/~01ba20040044647ec2?mp_source=share" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 glass-card hover:bg-primary/20 rounded-lg transition-colors"
                aria-label="Upwork"
              >
                <Briefcase className="w-5 h-5" />
              </a>
              <a 
                href="mailto:infinibitech@gmail.com" 
                className="p-2 glass-card hover:bg-primary/20 rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services/ai-automation" className="hover:text-primary transition-colors">AI Automation</Link></li>
              <li><Link to="/services/custom-software" className="hover:text-primary transition-colors">Custom Software</Link></li>
              <li><Link to="/services/mobile-app" className="hover:text-primary transition-colors">Mobile Apps</Link></li>
              <li><Link to="/services/web-app" className="hover:text-primary transition-colors">Web Development</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a 
                  href="mailto:infinibitech@gmail.com" 
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  infinibitech@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/923147647998" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-primary" />
                  +92 314 7647998
                </a>
              </li>
              <li className="text-muted-foreground">Pakistan</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Infinibit Tech. All rights reserved.
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