import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { NavigationButton } from "@/components/NavigationButton";
import { PageTransition } from "@/components/PageTransition";
import { ImageModal } from "@/components/ImageModal";

const GalleryPage = () => {
  // Create list of 33 images
const images = [
  "/cp-birthday/chocolates/1.jpeg",
  "/cp-birthday/chocolates/2.png",
  "/cp-birthday/chocolates/3.png",
  "/cp-birthday/chocolates/4.png.PNG",
  "/cp-birthday/chocolates/5.png.PNG",
  "/cp-birthday/chocolates/6.PNG",
  "/cp-birthday/chocolates/7.png.PNG",
  "/cp-birthday/chocolates/8.png.PNG",
  "/cp-birthday/chocolates/9.png.PNG",
  "/cp-birthday/chocolates/10.png.PNG",
  "/cp-birthday/chocolates/11.png.PNG",
  "/cp-birthday/chocolates/12.png.PNG",
  "/cp-birthday/chocolates/13.png.PNG",
  "/cp-birthday/chocolates/14.PNG",
  "/cp-birthday/chocolates/15.png.PNG",
  "/cp-birthday/chocolates/16.png.PNG",
  "/cp-birthday/chocolates/17.png.PNG",
  "/cp-birthday/chocolates/18.png.PNG",
  "/cp-birthday/chocolates/19.png.PNG",
  "/cp-birthday/chocolates/20.PNG",
  "/cp-birthday/chocolates/21.PNG",
  "/cp-birthday/chocolates/22.PNG",
];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background py-16 px-4 md:px-8 relative overflow-hidden">
        <FloatingHearts />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="font-playfair text-3xl md:text-5xl text-foreground mb-4">
              33 Chocolate Letters
            </h1>
            <p className="text-muted-foreground font-inter max-w-md mx-auto">
              Tap a chocolate to view it closer ❤️
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-16"
          >
            {images.map((src, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square bg-card rounded-xl overflow-hidden cursor-pointer group relative border border-primary/20"
                onClick={() => setSelectedImage(src)}
              >
                <img
                  src={src}
                  alt={`Letter ${index + 1}`}
                  className="w-full h-full object-cover group-hover:opacity-90 transition"
                />

                {/* Number badge */}
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-background/80 rounded-full flex items-center justify-center shadow">
                  <span className="text-xs text-muted-foreground font-inter">
                    {index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <NavigationButton to="/moments" label="See Our Moments" variant="minimal" />
          </motion.div>
        </div>

        {/* MODAL PREVIEW */}
        <AnimatePresence>
          {selectedImage && (
            <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default GalleryPage;
