import React from 'react';
import { ACTION_CARDS } from '../constants';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export const ActionCards: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="font-serif text-2xl md:text-3xl mb-2 notranslate" translate="no">Quick Access</h2>
        <p className="text-stone-400 text-xs md:text-sm tracking-widest uppercase notranslate" translate="no">Service Navigation</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {ACTION_CARDS.map((card, index) => {
          const Icon = card.icon;
          const isPriority = card.priority;

          return (
            <motion.a
              key={card.id}
              href={card.path}
              target={card.path.startsWith('http') ? '_blank' : undefined}
              rel={card.path.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className={`relative p-3 md:p-5 rounded-lg md:rounded-2xl border transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col justify-between h-full ${
                card.color.startsWith('bg-stone-50')
                  ? 'bg-stone-50/50 border-stone-200/60 hover:bg-white hover:border-stone-300 hover:shadow-xl hover:shadow-stone-200/30'
                  : `${card.color} border-transparent shadow-lg shadow-stone-900/10`
              }`}
            >
              {/* Decorative background element */}
              <div className={`absolute -right-2 -top-2 w-16 h-16 rounded-full blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-20 ${
                card.color.startsWith('bg-stone-50') ? 'bg-stone-400' : 'bg-white'
              }`} />

              <div>
                <div className="flex justify-between items-start mb-3 md:mb-5 relative z-10">
                  <div className={`p-1.5 md:p-2.5 rounded-md md:rounded-xl ${
                    card.color.startsWith('bg-stone-50') ? 'bg-stone-100' : 'bg-white/10'
                  }`}>
                    <Icon size={16} className={card.textColor} />
                  </div>
                  <ArrowUpRight size={14} className={`${
                    card.color.startsWith('bg-stone-50') ? 'text-stone-300' : 'text-white/40'
                  } group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
                </div>

                <div className="relative z-10">
                  <h3 className={`text-sm md:text-base font-bold mb-1 md:mb-2 tracking-tight leading-tight ${card.textColor}`}>
                    {card.title}
                  </h3>
                  <p className={`text-[10px] md:text-xs leading-tight font-medium line-clamp-2 ${
                    card.color.startsWith('bg-stone-50') ? 'text-stone-500' : 'text-stone-400'
                  }`}>
                    {card.description}
                  </p>
                </div>
              </div>

              {isPriority && (
                <div className="mt-3 md:mt-4 flex items-center gap-2 relative z-10">
                  <span className={`text-[7px] md:text-[8px] font-black tracking-[0.1em] uppercase px-1.5 md:px-2 py-0.5 rounded-full ${
                    card.color.startsWith('bg-stone-50') ? 'bg-stone-900 text-white' : 'bg-white text-stone-900'
                  }`}>
                    Priority
                  </span>
                </div>
              )}
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};
