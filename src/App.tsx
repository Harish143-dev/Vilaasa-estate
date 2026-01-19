import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import Domestic from "./pages/Domestic";
import DomesticRealEstate from "./pages/DomesticRealEstate";
import DomesticFranchise from "./pages/DomesticFranchise";
import International from "./pages/International";
import PropertyDetail from "./pages/PropertyDetail";
import FranchiseDetail from "./pages/FranchiseDetail";
import Contact from "./pages/Contact";
import Calendar from "./pages/Calendar";
import WealthProjector from "./pages/WealthProjector";
import VaultLogin from "./pages/VaultLogin";
import VaultDashboard from "./pages/VaultDashboard";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import { LiveConcierge } from "./components/LiveConcierge";
import { SplashGateway } from "./components/SplashGateway";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CurrencyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <SplashGateway
                  // isVisible={showSplash}
                  // onDismiss={() => setShowSplash(false)}
                />
              }
            />
            <Route path="/home" element={<Index />} />
            <Route path="/domestic" element={<Domestic />} />
            <Route
              path="/domestic/real-estate"
              element={<DomesticRealEstate />}
            />
            <Route path="/domestic/franchise" element={<DomesticFranchise />} />
            <Route path="/international" element={<International />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/franchise/:id" element={<FranchiseDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/wealth-projector" element={<WealthProjector />} />
            <Route path="/vault" element={<VaultLogin />} />
            <Route path="/vault/dashboard" element={<VaultDashboard />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <LiveConcierge />
        </BrowserRouter>
      </TooltipProvider>
    </CurrencyProvider>
  </QueryClientProvider>
);

export default App;
