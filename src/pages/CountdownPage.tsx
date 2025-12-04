// New content for src/pages/CountdownPage.tsx

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { PageTransition } from '@/components/PageTransition';
import { TypingText } from '@/components/TypingText';

// Define the structure for time components
interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// --- Animated Time Block Component ---
interface TimeBlockProps {
  value: number;
  label: string;
  delay: number;
}

// Component to handle the flip animation on value change
const TimeBlock = ({ value, label, delay }: TimeBlockProps) => {
    // Format the value to always be two digits
    const displayValue = String(value).padStart(2, '0');
    
    // Key change forces the component to re-render, triggering the framer-motion exit/enter
    const animationKey = displayValue; 

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col items-center justify-center p-4 md:p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-primary/30 min-w-[70px] md:min-w-[100px] shadow-lg"
            // Ensure the months box has a little more room if needed
            style={{ minWidth: label === 'Months' ? '120px' : '100px' }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={animationKey} // Key change triggers the flip animation
                    initial={{ y: -20, opacity: 0, scale: 0.8, rotateX: 90 }}
                    animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ y: 20, opacity: 0, scale: 0.8, rotateX: -90 }}
                    transition={{ duration: 0.4 }}
                    className="text-4xl md:text-6xl font-extrabold text-primary drop-shadow-md"
                >
                    {displayValue}
                </motion.span>
            </AnimatePresence>
            <span className="mt-1 text-xs md:text-sm uppercase tracking-wider text-white/80">
                {label}
            </span>
        </motion.div>
    );
};
// --- End Time Block Component ---


const CountdownPage = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  // Define the target date: Dec 4th, always looking forward to the NEXT Dec 4th.
  const targetDate = useMemo(() => {
    const now = new Date();
    const BIRTHDAY_MONTH = 11; // December is 11
    const BIRTHDAY_DAY = 4;
    let date = new Date(now.getFullYear(), BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0, 0);

    // If the target date is in the past, set it to next year.
    // Index.tsx should prevent rendering if it's currently the birthday.
    if (now.getTime() > date.getTime()) {
      date.setFullYear(now.getFullYear() + 1);
    }
    return date;
  }, []); 

  useEffect(() => {
    const calculateTimeLeft = () => {
        const now = new Date();
        let difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) {
            return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        
        // Approximate Months calculation (using 30.4375 days average)
        const months = Math.floor(totalDays / 30.4375);
        
        // Remaining Days (left after months are calculated)
        const daysRemaining = Math.floor(totalDays % 30.4375);

        return {
            months: months,
            days: daysRemaining,
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    // Initial call and interval setup
    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);


  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6">
        <FloatingHearts />
        
        {/* Ambient glow - Using Red/Black theme */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl font-playfair mb-4 text-foreground">
                    Our Countdown to Forever ❤️
                </h1>
                <p className="font-inter text-lg md:text-xl text-muted-foreground/80 mb-12">
                    Dec 4th is coming!
                </p>
            </motion.div>

            {/* Countdown blocks: Now includes Months, Days, Hours, Minutes, Seconds */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-6 mb-16 justify-center">
                {/* Only show Months if there are remaining months for a cleaner visual */}
                {timeLeft.months > 0 && (
                    <TimeBlock value={timeLeft.months} label="Months" delay={0.1} />
                )}
                <TimeBlock value={timeLeft.days} label="Days" delay={0.3} />
                <TimeBlock value={timeLeft.hours} label="Hours" delay={0.5} />
                <TimeBlock value={timeLeft.minutes} label="Minutes" delay={0.7} />
                <TimeBlock value={timeLeft.seconds} label="Seconds" delay={0.9} />
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <ChevronDown className="w-6 h-6 text-muted-foreground/50 animate-bounce" />
            </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CountdownPage;
