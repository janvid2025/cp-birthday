// New content for src/pages/Index.tsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EntrancePage from './EntrancePage';
import { Fireworks } from '@/components/Fireworks';
import { TypingText } from '@/components/TypingText';
import { PageTransition } from '@/components/PageTransition';

// --- Configuration ---
const BIRTHDAY_MONTH = 11; // December is 11 (0-indexed)
const BIRTHDAY_DAY = 4;
const TRANSITION_DURATION_MS = 5000; // 5 seconds flash

const Index = () => {
  const now = new Date();
  
  // Determine if it is the specific birthday date
  const isTodayBirthday = now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;

  // State 1: Controls the 5-second countdown flash (Only used on the actual birthday)
  const [showCountdownFlash, setShowCountdownFlash] = useState(isTodayBirthday);
  // State 2: Controls the final celebration screen (Only used on the actual birthday)
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (isTodayBirthday) {
      // Case: It IS the birthday. Start the transition timer.
      const timer = setTimeout(() => {
        setShowCountdownFlash(false);
        setShowCelebration(true);
      }, TRANSITION_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [isTodayBirthday]);

  // ------------------- Conditional Rendering -------------------

  // Case 2: It is the birthday. Show the dramatic Celebration flow.
  if (isTodayBirthday) {
      if (showCountdownFlash) {
          // Show the brief "loading" flash for 5 seconds
          return (
              <PageTransition>
                  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-foreground">
                      <h1 className="text-4xl md:text-6xl font-playfair text-primary animate-pulse">
                          Surprise Loading...
                      </h1>
                      <p className="mt-4 text-muted-foreground">
                          Get ready, Chintan! The moment is here.
                      </p>
                  </div>
              </PageTransition>
          );
      }
      
      if (showCelebration) {
          // Show the final flash/fireworks page
          return (
              <PageTransition>
                  <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
                      <Fireworks /> 
                      <div className="relative z-20 text-center">
                          <motion.h1 
                              initial={{ scale: 0.5 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                              className="text-7xl md:text-9xl font-extrabold tracking-tight text-white mb-8" 
                              style={{ textShadow: '0 0 20px #D80032, 0 0 50px #D80032' }}
                          >
                              HAPPY BIRTHDAY
                          </motion.h1>
                          <h2 className="text-5xl md:text-7xl font-playfair text-white drop-shadow-lg">
                              <TypingText 
                                  text="Chintan" 
                                  speed={80} 
                                  className="text-primary"
                              />
                          </h2>
                          <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 2.5, duration: 1 }}
                              className="mt-10 text-xl md:text-2xl font-inter text-gray-300"
                          >
                              Your P Ce ❤️
                          </motion.p>
                      </div>
                  </div>
              </PageTransition>
          );
      }
  }

  // Case 1 & 3 (Future and Past): Show the standard EntrancePage.
  return <EntrancePage />; 
};

export default Index;
