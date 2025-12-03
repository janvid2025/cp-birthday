import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EntrancePage from './EntrancePage';
import { Fireworks } from '@/components/Fireworks'; // Used for the birthday flash
import { TypingText } from '@/components/TypingText'; // Used for the "Chintan" typing effect
import { PageTransition } from '@/components/PageTransition'; // To keep transitions smooth

// --- Configuration ---
// Target Birthday: December 4th
const BIRTHDAY_MONTH = 11; // JavaScript months are 0-11 (Dec is 11)
const BIRTHDAY_DAY = 4;
// How long the "Countdown/Loading" screen is shown before the flash
const TRANSITION_DURATION_MS = 5000; // 5 seconds

const Index = () => {
  const now = new Date();
  const todayMonth = now.getMonth();
  const todayDay = now.getDate();
  
  // Check if today is the birthday
  const isBirthday = todayMonth === BIRTHDAY_MONTH && todayDay === BIRTHDAY_DAY;

  // State 1: Controls the 5-second countdown flash
  const [showCountdownFlash, setShowCountdownFlash] = useState(isBirthday);
  // State 2: Controls the final celebration screen
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (isBirthday) {
      // Case B: It IS the birthday. Start the transition timer.
      const timer = setTimeout(() => {
        // After 5 seconds, hide the flash and show the celebration
        setShowCountdownFlash(false);
        setShowCelebration(true);
      }, TRANSITION_DURATION_MS);

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }
    // Case A: Not the birthday. showCountdownFlash remains false, and we render the normal EntrancePage.
  }, [isBirthday]);


  // ------------------- Conditional Rendering -------------------

  // Case A: Not the birthday yet. Render the standard entrance flow.
  if (!isBirthday) {
    // This leads to the perpetual countdown page.
    return <EntrancePage />;
  }

  // Case B.1: It is the birthday, and we are showing the brief countdown flash/loading screen.
  if (showCountdownFlash) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground bg-black">
          <h1 className="text-4xl md:text-6xl font-playfair text-primary animate-pulse">
            Loading the surprise...
          </h1>
          <p className="mt-4 text-muted-foreground">
            Get ready, CP! ({Math.round(TRANSITION_DURATION_MS / 1000)} seconds)
          </p>
        </div>
      </PageTransition>
    );
  }

  // Case B.2: It is the birthday, transition is complete. Show the dramatic Celebration.
  if (showCelebration) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
          {/* Fireworks component for the dramatic effect */}
          <Fireworks /> 
          
          <div className="relative z-20 text-center">
              <motion.h1 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                  // Use your preferred Red/Black/White colors here:
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

  // Fallback (e.g., if date check is delayed)
  return <EntrancePage />;
};

export default Index;
