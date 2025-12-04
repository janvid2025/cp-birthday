import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ImageModalProps {
  src: string;
  onClose: () => void;
}

export const ImageModal = ({ src, onClose }: ImageModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.img
        src={src}
        alt="preview"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-[90%] max-h-[85%] rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-red-400 transition"
      >
        <X size={32} />
      </button>
    </motion.div>
  );
};
