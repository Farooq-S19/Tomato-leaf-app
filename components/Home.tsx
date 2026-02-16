
import React, { useState, useEffect, useMemo } from 'react';
import { AppView } from '../types';
import { Leaf, Info, ShieldAlert, LayoutGrid, Sparkles, ChevronRight, Activity, Database, Crosshair } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: AppView) => void;
  galleryCount: number;
}

const Home: React.FC<HomeProps> = ({ onNavigate, galleryCount }) => {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // Generate a fixed set of random properties for the blowing leaves
  const leafParticles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      duration: `${15 + Math.random() * 20}s`,
      delay: `${Math.random() * -30}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 10 + Math.random() * 30
    }));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const newOpacity = Math.max(0, 1 - currentScroll / 400);
      setScrollOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 md:space-y-12 py-4 md:py-12 animate-in fade-in duration-1000 relative">
      {/* Blowing Leaves Background Pattern */}
      {leafParticles.map((p) => (
        <div 
          key={p.id}
          className="leaf-particle text-emerald-500/10"
          style={{ 
            '--duration': p.duration, 
            '--delay': p.delay,
            '--left': p.left,
            '--top': p.top
          } as any}
        >
          <Leaf size={p.size} />
        </div>
      ))}

      <div 
        className="fixed -top-40 -left-40 w-[30rem] h-[30rem] md:w-[40rem] md:h-[40rem] pointer-events-none z-[-1] transition-opacity duration-300 ease-out"
        style={{ opacity: scrollOpacity * 0.4 }}
      >
        <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 group">
          <Leaf size={500} className="text-emerald-900/10 rotate-[-15deg]" strokeWidth={0.5} />
        </div>
      </div>

      <div className="w-full flex justify-between items-center px-4 md:px-0 opacity-60 mono text-[7px] md:text-[9px] tracking-widest uppercase mb-2 font-bold text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Neural Engine Online
        </div>
        <div className="flex items-center gap-4">
          <span>Region: Global</span>
          <span>Lat: 34.05° N</span>
        </div>
      </div>

      <div className="text-center space-y-3 md:space-y-6 max-w-4xl px-4 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 glass-card rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] border border-white/40 mb-1 animate-float shadow-md">
          <Sparkles size={12} className="text-emerald-500" />
          Tomato Phyto-Analytics v3.1
        </div>
        
        <h1 className="text-3xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter">
          Botanical <br />
          <span className="text-emerald-600 italic">Neural</span> Intelligence
        </h1>
        
        <p className="text-xs md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl mx-auto opacity-70">
          Hyperspectral vision for clinical diagnostics. 
          Bridging agricultural heritage with frontier AI.
        </p>
      </div>

      <div className="w-full max-w-4xl px-4 space-y-4 md:space-y-8">
        <button
          onClick={() => onNavigate('ANALYZER')}
          className="group relative w-full glass-card rounded-3xl md:rounded-[3rem] flex flex-col items-center md:flex-row md:justify-between p-6 md:p-10 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1 active:scale-[0.99] border-emerald-100/50"
        >
          <div className="flex flex-col items-center md:items-start space-y-2 relative z-10">
            <div className="flex items-center gap-2">
              <Crosshair size={14} className="text-emerald-500 animate-spin" />
              <span className="text-emerald-500 text-[8px] md:text-xs font-black uppercase tracking-[0.4em]">Initialize Scan</span>
            </div>
            <h3 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter">
              Begin Laboratory
            </h3>
          </div>
          
          <div className="mt-6 md:mt-0 relative flex items-center justify-center">
             {/* Pulse Animation for Light Theme */}
             <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping group-hover:bg-emerald-500/20 duration-1000" />
             <div className="absolute inset-0 bg-emerald-500/5 rounded-full animate-pulse group-hover:bg-emerald-500/10 duration-700 scale-125" />
             
             <div className="w-14 h-14 md:w-20 md:h-20 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl relative z-10 group-hover:bg-emerald-600 transition-all duration-500 group-hover:scale-110">
                <ChevronRight size={28} className="md:w-10 md:h-10 transition-transform group-hover:translate-x-1" strokeWidth={3} />
             </div>
          </div>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
          <button
            onClick={() => onNavigate('GALLERY')}
            className="group glass-card p-4 md:p-6 rounded-2xl md:rounded-[2rem] hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center space-y-2 hover:-translate-y-1 border-emerald-50/50"
          >
            <div className="relative p-3 bg-slate-900 text-white rounded-xl md:rounded-2xl group-hover:bg-emerald-600 transition-all duration-500">
              <Database size={20} className="md:w-6 md:h-6" />
              {galleryCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                  {galleryCount}
                </span>
              )}
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-sm md:text-lg tracking-tight">Archives</h3>
              <p className="mono text-[7px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">Database</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('ABOUT_DISEASES')}
            className="group glass-card p-4 md:p-6 rounded-2xl md:rounded-[2rem] hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center space-y-2 hover:-translate-y-1"
          >
            <div className="p-3 bg-white shadow-inner border border-slate-100 text-amber-500 rounded-xl md:rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-500">
              <ShieldAlert size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-sm md:text-lg tracking-tight">Library</h3>
              <p className="mono text-[7px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">Specimens</p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('ABOUT_APP')}
            className="group glass-card p-4 md:p-6 rounded-2xl md:rounded-[2rem] hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center space-y-2 hover:-translate-y-1"
          >
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl md:rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
              <Activity size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="font-black text-slate-800 text-sm md:text-lg tracking-tight">Analysis</h3>
              <p className="mono text-[7px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">System</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
