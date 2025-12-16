import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
import Portfolio from "./pages/Portfolio";
import Quote from "./pages/Quote";
import Services from "./pages/Services";
import AIAutomation from "./pages/services/AIAutomation";
import CustomSoftware from "./pages/services/CustomSoftware";
import MobileApp from "./pages/services/MobileApp";
import WebApp from "./pages/services/WebApp";
import Ecommerce from "./pages/services/Ecommerce";
import CRMERP from "./pages/services/CRMERP";
import UIUXDesign from "./pages/services/UIUXDesign";
import APIdev from "./pages/services/APIdev";
import CallCenter from "./pages/services/CallCenter";
import BusinessConsultancy from "./pages/services/BusinessConsultancy";
import CorporateSolutions from "./pages/services/CorporateSolutions";
import DataEngineering from "./pages/services/DataEngineering";
import AIChatbot from "./pages/services/AIChatbot";
import SaaS from "./pages/services/SaaS";
import DigitalMarketing from "./pages/services/DigitalMarketing";
import QualityAssurance from "./pages/services/QualityAssurance";
import Careers from "./pages/Careers";
import Team from "./pages/Team";
import ContactPage from "./pages/ContactPage";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/services/ai-automation" element={<AIAutomation />} />
                <Route path="/services/custom-software" element={<CustomSoftware />} />
                <Route path="/services/mobile-app" element={<MobileApp />} />
                <Route path="/services/web-app" element={<WebApp />} />
                <Route path="/services/ecommerce" element={<Ecommerce />} />
                <Route path="/services/crm-erp" element={<CRMERP />} />
                <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
                <Route path="/services/api-development" element={<APIdev />} />
                <Route path="/services/call-center" element={<CallCenter />} />
                <Route path="/services/business-consultancy" element={<BusinessConsultancy />} />
                <Route path="/services/corporate-solutions" element={<CorporateSolutions />} />
                <Route path="/services/data-engineering" element={<DataEngineering />} />
                <Route path="/services/ai-chatbot" element={<AIChatbot />} />
                <Route path="/services/saas" element={<SaaS />} />
                <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
                <Route path="/services/quality-assurance" element={<QualityAssurance />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
