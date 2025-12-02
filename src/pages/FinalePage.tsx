import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { Fireworks } from '@/components/Fireworks';
import { PageTransition } from '@/components/PageTransition';

const FinalePage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    const messageTimer = setTimeout(() => setShowMessage(true), 2000);
    const signatureTimer = setTimeout(() => setShowSignature(true), 4000);

    return () => {
      clearTimeout(messageTimer);
      clearTimeout(signatureTimer);
    };
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-6">
        {/* Fireworks canvas */}
        <Fireworks />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[200px] pointer-events-none" />

        <div className="relative z-20 text-center max-w-2xl">
          {/* Celebration icons */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto" />
              <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary fill-primary animate-pulse-heart" />
            </div>
          </motion.div>

          {/* Main birthday message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: showMessage ? 1 : 0, scale: showMessage ? 1 : 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 romantic-title">
              Happy Birthday
            </h1>
            <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-semibold text-gradient-romantic mb-8">
              Chintan ❤️
            </h2>
          </motion.div>

          {/* Nicknames */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showMessage ? 1 : 0, y: showMessage ? 0 : 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center gap-4 mb-12 flex-wrap"
          >
            {['CP', 'Cipla', 'P Ce'].map((nickname, index) => (
              <motion.span
                key={nickname}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-foreground font-inter text-sm md:text-base"
              >
                {nickname} ❤️
              </motion.span>
            ))}
          </motion.div>

          {/* Final message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showMessage ? 1 : 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-inter text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-12"
          >
            May this year bring you all the happiness, love, and success you deserve.
            You are my world. ✨
          </motion.p>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showSignature ? 1 : 0, y: showSignature ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            <p className="font-playfair text-2xl md:text-3xl italic text-foreground">
              From your <span className="text-primary">Janvi</span> 💖
            </p>
            
            {/* Decorative hearts around signature */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 pointer-events-none"
            >
              {[...Array(6)].map((_, i) => (
                <Heart
                  key={i}
                  className="absolute w-4 h-4 text-primary/50 fill-primary/50"
                  style={{
                    top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 6)}%`,
                    left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 6)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Replay hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showSignature ? 1 : 0 }}
            transition={{ delay: 1 }}
            className="mt-16 text-sm text-muted-foreground/50 font-inter"
          >
            ❤️ Made with all my love ❤️
          </motion.p>
        </div>
      </div>
    </PageTransition>
  );
};

export default FinalePage;
