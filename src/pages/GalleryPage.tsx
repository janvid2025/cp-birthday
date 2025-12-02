import { motion } from 'framer-motion';
import { Heart, Gift } from 'lucide-react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { NavigationButton } from '@/components/NavigationButton';
import { PageTransition } from '@/components/PageTransition';

const GalleryPage = () => {
  // Placeholder for 33 chocolate letters - replace with actual images
  const chocolateLetters = Array.from({ length: 33 }, (_, i) => ({
    id: i + 1,
    // You'll replace these with actual chocolate letter images
    placeholder: `Letter ${i + 1}`,
  }));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
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

        {/* Ambient glow */}
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
              Each one wrapped with a piece of my heart, spelling out how much you mean to me
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-16"
          >
            {chocolateLetters.map((letter) => (
              <motion.div
                key={letter.id}
                variants={item}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="aspect-square bg-card border border-primary/20 rounded-xl overflow-hidden cursor-pointer group relative"
              >
                {/* Placeholder - replace with actual image */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <Heart className="w-8 h-8 text-primary/40 group-hover:text-primary group-hover:fill-primary transition-all duration-300 group-hover:scale-110" />
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Number badge */}
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-background/80 rounded-full flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-inter">{letter.id}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center text-muted-foreground/60 font-inter text-sm italic mb-8"
          >
            Tap each letter to reveal its message ❤️
          </motion.p>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="flex justify-center"
          >
            <NavigationButton to="/moments" label="See Our Moments" variant="minimal" />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default GalleryPage;
