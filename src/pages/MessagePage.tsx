import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { TypingText } from '@/components/TypingText';
import { NavigationButton } from '@/components/NavigationButton';
import { PageTransition } from '@/components/PageTransition';

const MessagePage = () => {
  const [showContinue, setShowContinue] = useState(false);

  // Replace this with your actual heartfelt message
  const message = `My dearest CP,

On this special day, I want you to know how incredibly grateful I am to have you in my life. Every moment with you feels like a beautiful dream I never want to wake up from.

You make me laugh when I want to cry, you hold my hand when I'm scared, and you love me even when we fight (which happens a lot, I know! 😄).

Through all our silly arguments and sweet moments, through every up and down, my love for you has only grown stronger.

You are my person, my best friend, my everything.

Happy Birthday, my love. Here's to many more years of us being us – imperfect, crazy, and madly in love.

Forever yours,
Your Janvi ❤️`;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background py-16 px-6 relative overflow-hidden">
        <FloatingHearts />

        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h1 className="font-playfair text-3xl md:text-5xl text-foreground mb-2">
              To My <span className="text-gradient-romantic">CP</span> —
            </h1>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-4 h-4 text-primary fill-primary"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Message container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            {/* Letter background */}
            <div className="bg-card/50 border border-primary/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm romantic-glow">
              {/* Decorative corner */}
              <div className="absolute top-4 left-4">
                <Heart className="w-6 h-6 text-primary/30" />
              </div>
              <div className="absolute bottom-4 right-4">
                <Heart className="w-6 h-6 text-primary/30" />
              </div>

              {/* Message text */}
              <div className="font-inter text-foreground/90 leading-relaxed whitespace-pre-line text-base md:text-lg">
                <TypingText
                  text={message}
                  speed={30}
                  onComplete={() => setShowContinue(true)}
                />
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl -z-10" />
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContinue ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-12"
          >
            <NavigationButton to="/finale" label="One Last Surprise" />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MessagePage;
