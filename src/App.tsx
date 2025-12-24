import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy-loaded pages for better performance
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Quote = lazy(() => import("./pages/Quote"));
const Services = lazy(() => import("./pages/Services"));
const Careers = lazy(() => import("./pages/Careers"));
const Team = lazy(() => import("./pages/Team"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Auth = lazy(() => import("./pages/Auth"));

// Lazy-loaded service pages
const AIAutomation = lazy(() => import("./pages/services/AIAutomation"));
const CustomSoftware = lazy(() => import("./pages/services/CustomSoftware"));
const MobileApp = lazy(() => import("./pages/services/MobileApp"));
const WebApp = lazy(() => import("./pages/services/WebApp"));
const Ecommerce = lazy(() => import("./pages/services/Ecommerce"));
const CRMERP = lazy(() => import("./pages/services/CRMERP"));
const UIUXDesign = lazy(() => import("./pages/services/UIUXDesign"));
const APIdev = lazy(() => import("./pages/services/APIdev"));
const CallCenter = lazy(() => import("./pages/services/CallCenter"));
const BusinessConsultancy = lazy(() => import("./pages/services/BusinessConsultancy"));
const CorporateSolutions = lazy(() => import("./pages/services/CorporateSolutions"));
const DataEngineering = lazy(() => import("./pages/services/DataEngineering"));
const AIChatbot = lazy(() => import("./pages/services/AIChatbot"));
const SaaS = lazy(() => import("./pages/services/SaaS"));
const DigitalMarketing = lazy(() => import("./pages/services/DigitalMarketing"));
const QualityAssurance = lazy(() => import("./pages/services/QualityAssurance"));

// Lazy-loaded admin pages
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Contacts = lazy(() => import("./pages/admin/Contacts"));
const Quotes = lazy(() => import("./pages/admin/Quotes"));
const Chats = lazy(() => import("./pages/admin/Chats"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const AuditLogs = lazy(() => import("./pages/admin/AuditLogs"));
const AdminServices = lazy(() => import("./pages/admin/Services"));
const AdminPortfolio = lazy(() => import("./pages/admin/Portfolio"));
const Inventory = lazy(() => import("./pages/admin/Inventory"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <span className="text-muted-foreground text-sm">Loading...</span>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <PageTransition>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/quote" element={<Quote />} />
                  <Route path="/services" element={<Services />} />
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

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="contacts" element={<Contacts />} />
                    <Route path="quotes" element={<Quotes />} />
                    <Route path="chats" element={<Chats />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="audit-logs" element={<AuditLogs />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="portfolio" element={<AdminPortfolio />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </PageTransition>
            <BackToTopButton />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
