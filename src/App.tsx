import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { LogoScroller } from './components/LogoScroller';
import { TopicsList } from './components/TopicsList';
import { ActionCards } from './components/ActionCards';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, PanelLeftClose, X } from 'lucide-react';

export default function App() {
  const [activeId, setActiveId] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row overflow-x-hidden">
      {/* Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-stone-200 sticky top-0 z-[60] w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-stone-900 rounded-sm flex items-center justify-center">
            <span className="text-white font-serif text-xl notranslate" translate="no">H</span>
          </div>
          <span className="font-serif text-lg tracking-widest font-bold notranslate" translate="no">PORTAL</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[55]"
            />
          )}
      </AnimatePresence>

      {!isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="hidden md:flex fixed top-5 left-5 z-[57] items-center gap-2 px-3 py-2 rounded-lg border border-stone-200 bg-white/95 hover:bg-white text-stone-700 transition-colors shadow-sm"
        >
          <PanelLeftClose size={16} />
          <span className="text-xs font-medium notranslate" translate="no">PORTAL</span>
        </button>
      )}

      {/* Sidebar */}
      <Sidebar 
        activeId={activeId} 
        onNavigate={(id) => {
          setActiveId(id);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <Hero />

          {/* Logo Scroller */}
          <LogoScroller />

          <div className="bg-white">
            {/* Topics List */}
            <TopicsList />

            {/* Action Cards */}
            <ActionCards />
          </div>

          {/* Footer */}
          <footer className="py-12 px-6 md:px-20 border-t border-stone-100 bg-stone-50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
              <div>
                <p className="font-serif text-lg tracking-widest mb-1">PORTAL</p>
                <p className="text-[10px] text-stone-400">© 2024 Corporate Partnership Portal. All rights reserved.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                <a href="#" className="text-[10px] text-stone-500 hover:text-stone-900 transition-colors">利用規約</a>
                <a href="#" className="text-[10px] text-stone-500 hover:text-stone-900 transition-colors">プライバシーポリシー</a>
                <a href="#" className="text-[10px] text-stone-500 hover:text-stone-900 transition-colors">ヘルプセンター</a>
              </div>
            </div>
          </footer>
        </motion.div>
      </main>
    </div>
  );
}
