import React from 'react';
import { MENU_ITEMS } from '../constants';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onNavigate, isOpen, onClose }) => {
  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 border-r border-stone-200 bg-white z-[56] flex flex-col transition-transform duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-stone-900 rounded-sm flex items-center justify-center">
              <span className="text-white font-serif text-xl notranslate" translate="no">H</span>
            </div>
            <span className="font-serif text-xl tracking-widest font-bold notranslate" translate="no">
              PORTAL
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-500 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-medium notranslate" translate="no">
          Corporate Partnership
        </p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          const isExternal = item.path !== '#';
          const shouldOpenNewTab = item.path.startsWith('http') || item.path.startsWith('mailto:');
          
          const Component = isExternal ? 'a' : 'button';
          const extraProps = isExternal
            ? {
                href: item.path,
                target: shouldOpenNewTab ? '_blank' : undefined,
                rel: shouldOpenNewTab ? 'noopener noreferrer' : undefined,
                onClick: () => onNavigate(item.id),
              }
            : { onClick: () => onNavigate(item.id) };

          return (
            <Component
              key={item.id}
              {...extraProps}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group text-left ${
                isActive 
                  ? 'bg-stone-100 text-stone-900' 
                  : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'
              }`}
            >
              <Icon size={18} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className={`text-sm tracking-wide ${isActive ? 'font-medium' : 'font-normal'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-stone-900"
                />
              )}
            </Component>
          );
        })}
      </nav>
    </aside>
  );
};
