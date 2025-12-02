import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { TypingText } from '@/components/TypingText';
import { NavigationButton } from '@/components/NavigationButton';
import { PageTransition } from '@/components/PageTransition';

const EntrancePage = () => {
  const [showButton, setShowButton] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6">
        <FloatingHearts />
        
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-2xl">
          {/* Heart icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <Heart className="w-16 h-16 md:w-20 md:h-20 text-primary fill-primary mx-auto animate-pulse-heart" />
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 romantic-title"
          >
            Happy Birthday,
            <br />
            <span className="text-gradient-romantic">Chintan</span>
            <span className="text-primary"> ❤️</span>
          </motion.h1>

          {/* Subtitle with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mb-12"
          >
            <p className="font-inter text-lg md:text-xl text-muted-foreground italic">
              <TypingText 
                text="A small website I made with love, just for you..." 
                delay={1200}
                speed={60}
                onComplete={() => setShowButton(true)}
              />
            </p>
          </motion.div>

          {/* Enter button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <NavigationButton to="/countdown" label="Tap to Begin" />
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />
        </div>

        {/* Bottom signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 text-sm text-muted-foreground/50 font-inter tracking-widest"
        >
          Made with ❤️ by Janvi
        </motion.p>
      </div>
    </PageTransition>
  );
};

export default EntrancePage;
