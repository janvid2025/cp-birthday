import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { NavigationButton } from "@/components/NavigationButton";
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

  const [status, setStatus] = useState<"before" | "arrived" | "after">("before");
  const navigate = useNavigate();

  useEffect(() => {
    const targetDate = new Date("2025-12-05T00:00:00"); // your target date

    const update = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        // BEFORE DATE
        setStatus("before");
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      // ON THE DATE OR AFTER
      setStatus(difference > -1000 ? "arrived" : "after");
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(update());

    const timer = setInterval(() => {
      setTimeLeft(update());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // HANDLE BIRTHDAY REDIRECT
  useEffect(() => {
    if (status === "arrived" || status === "after") {
      // play animation for 2 seconds
      const t = setTimeout(() => {
        navigate("/entrance");
      }, 2000);

      return () => clearTimeout(t);
    }
  }, [status, navigate]);

  // COMPONENT FOR COUNTDOWN BLOCKS
  const TimeBlock = ({
    value,
    label,
    delay,
  }: {
    value: number;
    label: string;
    delay: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="w-20 h-20 md:w-28 md:h-28 bg-card border border-primary/30 rounded-2xl flex items-center justify-center animate-glow-pulse">
          <span className="font-playfair text-3xl md:text-5xl font-bold text-foreground">
            {value.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl -z-10" />
      </div>
      <span className="mt-3 text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-inter">
        {label}
      </span>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6">
        <FloatingHearts />

        {/* Background Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Heart className="w-10 h-10 text-primary fill-primary mx-auto mb-4 animate-pulse-heart" />
            <h1 className="font-playfair text-2xl md:text-4xl text-foreground mb-2">
              Countdown to Your Day
            </h1>
            <p className="text-muted-foreground font-inter">
              December 4th is coming...
            </p>
          </motion.div>

          {/* BEFORE DATE → SHOW COUNTDOWN */}
          {status === "before" && (
            <div className="grid grid-cols-4 gap-3 md:gap-6 mb-16">
              <TimeBlock value={timeLeft.days} label="Days" delay={0.2} />
              <TimeBlock value={timeLeft.hours} label="Hours" delay={0.4} />
              <TimeBlock value={timeLeft.minutes} label="Minutes" delay={0.6} />
              <TimeBlock value={timeLeft.seconds} label="Seconds" delay={0.8} />
            </div>
          )}

          {/* ON DATE OR AFTER → SHOW QUICK CELEBRATION ANIMATION */}
          {(status === "arrived" || status === "after") && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-16"
            >
              <span className="text-8xl">🎉</span>
              <p className="mt-4 text-muted-foreground font-inter">
                Just a moment...
              </p>
            </motion.div>
          )}

          {/* ONLY BEFORE DATE → Show Continue button */}
          {status === "before" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <NavigationButton to="/gallery" label="Continue" variant="minimal" />
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground/50 animate-bounce" />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default CountdownPage;
