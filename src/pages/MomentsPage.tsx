import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { NavigationButton } from '@/components/NavigationButton';
import { PageTransition } from '@/components/PageTransition';

// Placeholder moments - replace with actual photos
const moments = [
  {
    id: 1,
    caption: "Our first moment together...",
    // Add actual image URL here
  },
  {
    id: 2,
    caption: "A memory I'll cherish forever...",
  },
  {
    id: 3,
    caption: "You make every moment special...",
  },
];

const MomentsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % moments.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + moments.length) % moments.length);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6">
        <FloatingHearts />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <Camera className="w-10 h-10 text-primary mx-auto mb-4" />
            <h1 className="font-playfair text-3xl md:text-4xl text-foreground mb-2">
              Our Mini Moments
            </h1>
            <p className="text-muted-foreground font-inter text-sm">
              Little glimpses of us ❤️
            </p>
          </motion.div>

          {/* Photo Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            {/* Main photo container */}
            <div className="relative aspect-[4/5] md:aspect-[3/4] bg-card border-2 border-primary/30 rounded-3xl overflow-hidden romantic-glow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Placeholder - replace with actual image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 via-card to-primary/5 flex flex-col items-center justify-center">
                    <Heart className="w-20 h-20 text-primary/30 mb-4" />
                    <p className="text-muted-foreground/50 font-inter text-sm">
                      Photo {currentIndex + 1}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                <p className="font-playfair text-lg text-foreground italic text-center">
                  "{moments[currentIndex].caption}"
                </p>
              </div>

              {/* Red frame accent */}
              <div className="absolute inset-0 border-4 border-primary/20 rounded-3xl pointer-events-none" />
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {moments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-6'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-12"
          >
            <NavigationButton to="/message" label="Read My Message" variant="minimal" />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MomentsPage;
