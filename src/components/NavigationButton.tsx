import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';

interface NavigationButtonProps {
  to: string;
  label: string;
  variant?: 'primary' | 'minimal';
}

export const NavigationButton = ({ to, label, variant = 'primary' }: NavigationButtonProps) => {
  const navigate = useNavigate();

  if (variant === 'minimal') {
    return (
      <motion.button
        onClick={() => navigate(to)}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm tracking-widest uppercase">{label}</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={() => navigate(to)}
      className="relative group px-8 py-4 bg-primary/10 border border-primary/50 rounded-full overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute inset-0 animate-glow-pulse opacity-0 group-hover:opacity-50" />
      <span className="relative flex items-center gap-3 text-foreground font-playfair text-lg">
        <Heart className="w-5 h-5 text-primary fill-primary group-hover:animate-pulse-heart" />
        {label}
        <Heart className="w-5 h-5 text-primary fill-primary group-hover:animate-pulse-heart" />
      </span>
    </motion.button>
  );
};
