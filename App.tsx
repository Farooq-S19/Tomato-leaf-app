
import React, { useState, useEffect } from 'react';
import Home from './components/Home.tsx';
import AboutApp from './components/AboutApp.tsx';
import AboutDiseases from './components/AboutDiseases.tsx';
import Analyzer from './components/Analyzer.tsx';
import Gallery from './components/Gallery.tsx';
import { AppView, GalleryItem } from './types.ts';
import { Leaf, ArrowLeft, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('HOME');
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('leafdoctor_gallery');
    if (saved) {
      try {
        setGallery(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load gallery", e);
      }
    }
  }, []);

  const saveToGallery = (item: GalleryItem) => {
    const newGallery = [item, ...gallery];
    setGallery(newGallery);
    localStorage.setItem('leafdoctor_gallery', JSON.stringify(newGallery));
  };

  const removeFromGallery = (id: string) => {
    const newGallery = gallery.filter(item => item.id !== id);
    setGallery(newGallery);
    localStorage.setItem('leafdoctor_gallery', JSON.stringify(newGallery));
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <Home onNavigate={setCurrentView} galleryCount={gallery.length} />;
      case 'ABOUT_APP':
        return <AboutApp />;
      case 'ABOUT_DISEASES':
        return <AboutDiseases />;
      case 'ANALYZER':
        return <Analyzer onSave={saveToGallery} />;
      case 'GALLERY':
        return <Gallery items={gallery} onDelete={removeFromGallery} />;
      default:
        return <Home onNavigate={setCurrentView} galleryCount={gallery.length} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-500">
      <header className="sticky top-0 z-[60] bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setCurrentView('HOME')}
          >
            <div className="bg-emerald-600 p-1.5 md:p-2 rounded-lg text-white shadow-md group-hover:scale-110 transition-all">
              <Leaf size={16} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-sm md:text-lg leading-none tracking-tight">LeafDoctor <span className="text-emerald-600">AI</span></span>
              <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">v3.1 Research</span>
            </div>
          </div>

          {currentView !== 'HOME' && (
            <button 
              onClick={() => setCurrentView('HOME')}
              className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 font-black text-[9px] md:text-[11px] transition-all bg-slate-50 hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-slate-100 uppercase tracking-widest shadow-sm"
            >
              <ArrowLeft size={12} />
              <span>Back</span>
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-4 md:py-8">
        {renderView()}
      </main>

      <footer className="py-8 md:py-12 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-slate-200">
            <Shield size={16} /><div className="h-px w-8 bg-slate-100" /><Leaf size={16} /><div className="h-px w-8 bg-slate-100" /><Shield size={16} />
          </div>
          <div className="text-center space-y-1">
            <div className="font-black text-slate-800 text-[8px] uppercase tracking-[0.2em]">Final Year Research</div>
            <div className="text-slate-400 text-[8px] font-medium uppercase">Computer Science • AI Lab</div>
          </div>
          <p className="text-slate-300 text-[8px] font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} LeafDoctor AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
