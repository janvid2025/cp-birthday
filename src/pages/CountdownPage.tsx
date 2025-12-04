import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { PageTransition } from "@/components/PageTransition";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownPage = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isBirthdayReached, setIsBirthdayReached] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const targetDate = new Date("2025-12-04T00:00:00");

    const calculate = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setIsBirthdayReached(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculate());

    const timer = setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Redirect 2 seconds after the date arrives
  useEffect(() => {
    if (isBirthdayReached) {
      const t = setTimeout(() => {
        navigate("/entrance");
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [isBirthdayReached, navigate]);

  // Clean simple countdown block
  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-20 h-20 md:w-28 md:h-28 bg-card border border-primary/30 rounded-2xl flex items-center justify-center">
          <span className="font-playfair text-3xl md:text-5xl font-bold text-foreground">
            {value.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="mt-3 text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-inter">
        {label}
      </span>
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6">
        <FloatingHearts />

        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 text-center">
          {/* Title */}
          <div className="mb-12">
            <Heart className="w-10 h-10 text-primary fill-primary mx-auto mb-4" />
            <h1 className="font-playfair text-2xl md:text-4xl text-foreground mb-2">
              Counting Down to Your Day
            </h1>
            <p className="text-muted-foreground font-inter">December 4th is coming…</p>
          </div>

          {/* Countdown Always Visible */}
          <div className="grid grid-cols-4 gap-3 md:gap-6 mb-16">
            <TimeBlock value={timeLeft.days} label="Days" />
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <TimeBlock value={timeLeft.minutes} label="Minutes" />
            <TimeBlock value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground/50 animate-bounce" />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default CountdownPage;
