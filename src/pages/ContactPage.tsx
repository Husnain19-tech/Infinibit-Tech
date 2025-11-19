import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default ContactPage;
