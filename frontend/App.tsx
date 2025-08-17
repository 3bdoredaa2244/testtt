import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/ui/navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import InvestorPage from "./pages/marketing/InvestorPage";
import BusinessPage from "./pages/marketing/BusinessPage";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import InvestorDashboard from "./pages/dashboards/InvestorDashboard";
import BusinessDashboard from "./pages/dashboards/BusinessDashboard";
import GuestDashboard from "./pages/dashboards/GuestDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/investor" element={<InvestorPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/investor-dashboard" element={<InvestorDashboard />} />
            <Route path="/business-dashboard" element={<BusinessDashboard />} />
            <Route path="/guest" element={<GuestDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
