import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[300px] md:h-[350px] lg:h-[400px] w-full overflow-hidden bg-stone-900">
      {/* Background Image with Overlay */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Housing" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="font-serif text-2xl md:text-4xl text-white mb-4 tracking-tight leading-tight">
            法人提携ポータル
          </h1>
          <p className="text-stone-300 text-xs md:text-lg font-light tracking-widest uppercase notranslate" translate="no">
            Partnership for the Future of Living
          </p>
        </motion.div>
      </div>

      {/* Decorative Line for Luxury Mode */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute bottom-0 left-0 h-1 bg-white/20 w-full origin-left"
      />
    </section>
  );
};
