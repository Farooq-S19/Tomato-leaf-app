
import React from 'react';
import { AlertTriangle, Droplets, Sun, Wind, Bug, ThermometerSnowflake, Zap, HeartPulse, ShieldCheck, Search, Activity, Skull, Microscope } from 'lucide-react';

const DISEASES = [
  {
    name: "Powdery Mildew",
    type: "Fungal Pathogen",
    risk: "Medium",
    image: "https://images.unsplash.com/photo-1599839610332-680f4882772a?auto=format&fit=crop&q=80&w=600",
    icon: <Droplets className="text-blue-500" />,
    description: "Identifiable by white, flour-like dust on leaf surfaces. It saps nutrients and reduces yield significantly.",
    remedy: "Improve air circulation, use sulfur-based sprays, or a milk-water solution (40/60)."
  },
  {
    name: "Leaf Rust",
    type: "Fungal Pathogen",
    risk: "High",
    image: "https://images.unsplash.com/photo-1592150621344-82d43b4da9f4?auto=format&fit=crop&q=80&w=600",
    icon: <AlertTriangle className="text-orange-500" />,
    description: "Characterized by orange/red pustules. Common in cereal crops and roses. Can survive over winter.",
    remedy: "Prune heavily infected areas and apply copper fungicides during early spring."
  },
  {
    name: "Mosaic Virus",
    type: "Viral Vector",
    risk: "Critical",
    image: "https://images.unsplash.com/photo-1505063364132-3580436d10e5?auto=format&fit=crop&q=80&w=600",
    icon: <Zap className="text-yellow-500" />,
    description: "Produces mottled 'mosaic' patterns. Causes severe stunting and leaf distortion. Highly contagious.",
    remedy: "No known chemical cure. Destroy infected plants and control aphid populations."
  },
  {
    name: "Black Spot",
    type: "Fungal Pathogen",
    risk: "Medium",
    image: "https://images.unsplash.com/photo-1598901861713-54ad16a7e70e?auto=format&fit=crop&q=80&w=600",
    icon: <HeartPulse className="text-red-600" />,
    description: "Deep black spots with fringed margins. Leads to premature leaf drop and weakened immunity.",
    remedy: "Avoid overhead watering. Apply fungicide containing chlorothalonil or mancozeb."
  },
  {
    name: "Leaf Miner",
    type: "Pest Larvae",
    risk: "Low",
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=600",
    icon: <Bug className="text-emerald-700" />,
    description: "Larvae create winding white trails inside leaf tissue, interfering with local photosynthesis.",
    remedy: "Introduce beneficial insects like parasitic wasps or use neem oil to disrupt egg laying."
  }
];

const AboutDiseases: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 md:space-y-20 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center space-y-4 px-4">
        <div className="flex justify-center mb-6">
           <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center shadow-inner">
              <Microscope size={32} />
           </div>
        </div>
        <h2 className="text-4xl md:text-8xl font-black text-slate-900 tracking-tighter leading-tight">Specimen <span className="text-emerald-600">Database</span></h2>
        <p className="mono text-[10px] md:text-xl text-slate-400 font-bold uppercase tracking-widest max-w-2xl mx-auto">
          Clinical Index of Phyto-Pathology Markers
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-12 px-4">
        {DISEASES.map((disease, idx) => (
          <div 
            key={idx} 
            className="group glass-card rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/60 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 flex flex-col lg:flex-row border-slate-100"
          >
            {/* Specimen Visual */}
            <div className="lg:w-[40%] relative h-64 lg:h-auto overflow-hidden">
              <img 
                src={disease.image} 
                alt={disease.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4000ms] ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 left-4 mono text-[8px] bg-black/60 text-white font-bold px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-widest backdrop-blur-md">
                 Index_Ref: #{1000 + idx}
              </div>
              <div className="absolute bottom-6 left-6 lg:hidden">
                <h3 className="text-3xl font-black text-white tracking-tighter">{disease.name}</h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-8 md:p-14 space-y-8">
              <div className="hidden lg:flex justify-between items-start">
                <div className="space-y-1">
                   <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">{disease.name}</h3>
                   <p className="mono text-[10px] text-emerald-500 font-bold uppercase tracking-widest pt-2">{disease.type}</p>
                </div>
                <div className={`px-5 py-2 glass-card rounded-full text-[10px] font-black uppercase tracking-widest border border-white/60 shadow-lg ${
                  disease.risk === 'Critical' ? 'text-rose-600 bg-rose-50/50' : 
                  disease.risk === 'High' ? 'text-orange-600 bg-orange-50/50' : 'text-blue-600 bg-blue-50/50'
                }`}>
                  Hazard: {disease.risk}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Search size={18} className="text-emerald-500" />
                    <h4 className="mono font-black uppercase tracking-widest text-[10px]">Morphology</h4>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-lg font-medium tracking-tight">
                    {disease.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Activity size={18} className="text-amber-500" />
                    <h4 className="mono font-black uppercase tracking-widest text-[10px]">Intervention Protocol</h4>
                  </div>
                  <p className="text-slate-800 font-bold leading-relaxed text-sm md:text-lg italic tracking-tight opacity-90">
                    "{disease.remedy}"
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-[10px] md:text-xs text-slate-400 italic mono uppercase tracking-widest">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-xl group-hover:rotate-12 transition-transform">{disease.icon}</div>
                  <span className="font-bold">Clinical Source v3.1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Skull size={16} className={disease.risk === 'Critical' ? 'text-red-500 animate-pulse' : 'text-slate-200'} />
                  <span className="hidden md:inline font-bold">Biosecurity Alert</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutDiseases;