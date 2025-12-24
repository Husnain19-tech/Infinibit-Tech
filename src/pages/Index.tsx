import Navigation from "@/components/Navigation";
import HomeHero from "@/components/HomeHero";
import FeaturedServices from "@/components/FeaturedServices";
import TechStack from "@/components/TechStack";
import Stats from "@/components/Stats";
import ProcessSection from "@/components/ProcessSection";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="home">
        <HomeHero />
        <FeaturedServices />
        <TechStack />
        <Stats />
        <ProcessSection />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
