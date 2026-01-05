import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Badge } from "@/components/ui/badge";

// Lazy load 3D components
const Scene3D = lazy(() => import("@/components/3d/Scene3D"));
const ContactSceneContent = lazy(() => import("@/components/3d/ContactScene"));

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Breadcrumbs />

      {/* Hero Section with 3D Background */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[50vh]">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          }>
            <Scene3D className="absolute inset-0">
              <ContactSceneContent />
            </Scene3D>
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="glass-card border-primary/30 text-primary px-6 py-2 text-sm mb-6">
            Get in Touch
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in">
            Have a project in mind? We'd love to hear from you. Let's build something amazing together.
          </p>
        </div>
      </section>

      {/* Contact Form Section (Reusing Component) */}
      <Contact />

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default ContactPage;
