import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import CountdownPage from "./pages/CountdownPage";
import GalleryPage from "./pages/GalleryPage";
import MomentsPage from "./pages/MomentsPage";
import MessagePage from "./pages/MessagePage";
import FinalePage from "./pages/FinalePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/cp-birthday">
        <AnimatePresence mode="wait">
          <Routes>
               <Route path="/" element={<CountdownPage />} />
              <Route path="/entrance" element={<Index />} />
            <Route path="/countdown" element={<CountdownPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/moments" element={<MomentsPage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/finale" element={<FinalePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
