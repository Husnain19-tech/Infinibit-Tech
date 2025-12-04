import Navigation from "@/components/Navigation";
import HomeHero from "@/components/HomeHero";
import FeaturedServices from "@/components/FeaturedServices";
import TechStack from "@/components/TechStack";
import Stats from "@/components/Stats";
import About from "@/components/About";
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
        <About />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
