import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ContactPage = () => {
  const locations = [
    {
      city: "New York",
      address: "123 Tech Avenue, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@infinibit.tech",
      image: "/images/services/corporate-solutions-1.jpg"
    },
    {
      city: "London",
      address: "45 Innovation Street, EC1A 1BB",
      phone: "+44 20 7123 4567",
      email: "london@infinibit.tech",
      image: "/images/services/business-consultancy-3.jpg"
    },
    {
      city: "Singapore",
      address: "88 Future Road, 018956",
      phone: "+65 6789 0123",
      email: "sg@infinibit.tech",
      image: "/images/services/digital-marketing-2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/services/corporate-solutions-1.jpg"
            alt="Contact Hero"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
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

      {/* Global Presence Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12">Global Presence</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {locations.map((loc, idx) => (
              <Card key={idx} className="glass-card border-primary/20 overflow-hidden group hover:border-primary/50 transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <img
                    src={loc.image}
                    alt={loc.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-2xl font-bold">{loc.city}</h3>
                  </div>
                </div>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <span>{loc.email}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section (Reusing Component) */}
      <Contact />

      {/* Map Section Placeholder */}
      <section className="h-[400px] relative w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
        <div className="absolute inset-0 bg-primary/10 z-10 pointer-events-none" />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564756836!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Office Location"
        />
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default ContactPage;
