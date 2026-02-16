
import React from 'react';
import { 
  Cpu, GraduationCap, Github, Linkedin, Mail, CheckCircle2, Milestone, 
  Calendar, Microscope, Rocket, Shapes, ChevronRight, BarChart3, 
  Fingerprint, Zap, Target, ShieldCheck, Activity, BrainCircuit, Globe,
  Server, Shield, ZapOff
} from 'lucide-react';

const METRICS = [
  { label: "Accuracy", value: "99.69%", icon: <Target className="text-emerald-500" />, sub: "Classification Success" },
  { label: "Precision", value: "98.27%", icon: <CheckCircle2 className="text-blue-500" />, sub: "Diagnostic Reliability" },
  { label: "Recall", value: "98.26%", icon: <Zap className="text-amber-500" />, sub: "Symptom Identification" }
];

const MILESTONES = [
  {
    title: "Phase I: Concepts",
    date: "Oct 2024",
    description: "In-depth research into Solanum lycopersicum pathology and clinical markers.",
    icon: <Microscope className="text-emerald-500" />,
    color: "emerald"
  },
  {
    title: "Phase II: Neural",
    date: "Dec 2024",
    description: "EfficientNet-B0 integration and transfer learning optimization.",
    icon: <BrainCircuit className="text-indigo-500" />,
    color: "indigo"
  },
  {
    title: "Phase III: UX/UI",
    date: "Feb 2025",
    description: "Designing a tactile, high-performance interface for real-time diagnostics.",
    icon: <Shapes className="text-amber-500" />,
    color: "amber"
  },
  {
    title: "Phase IV: Deploy",
    date: "May 2025",
    description: "Mobile system deployment for resource-constrained environments.",
    icon: <Globe className="text-rose-500" />,
    color: "rose"
  }
];

const AboutApp: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-16 md:space-y-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 px-4">
      
      {/* --- HERO SECTION --- */}
      <section className="text-center space-y-6 pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-800 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest border border-emerald-100 shadow-sm animate-float">
          <GraduationCap size={16} />
          Official Research Abstract
        </div>
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
          The <span className="text-emerald-600 italic underline decoration-emerald-200 underline-offset-8">EfficientNet</span> <br />
          Diagnostic Paradigm
        </h1>
        <p className="text-sm md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto opacity-80">
          Bridging deep learning and sustainable agriculture through automated phyto-pathology.
        </p>
      </section>

      {/* --- EDGE STATUS BAR (Netlify-themed) --- */}
      <div className="flex flex-wrap justify-center gap-4 py-2 border-y border-slate-100">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="mono text-[8px] font-black text-slate-500 uppercase tracking-widest">Network: Optimized</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100">
          <Server size={10} className="text-emerald-500" />
          <span className="mono text-[8px] font-black text-slate-500 uppercase tracking-widest">Deployment: Edge CDN</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100">
          <Shield size={10} className="text-emerald-500" />
          <span className="mono text-[8px] font-black text-slate-500 uppercase tracking-widest">Security: High-Fidelity</span>
        </div>
      </div>

      {/* --- CORE RESEARCH ABSTRACT --- */}
      <section className="relative">
        <div className="absolute inset-0 bg-emerald-50/30 rounded-[3rem] -rotate-1 scale-105 pointer-events-none" />
        <div className="glass-card rounded-[3rem] p-8 md:p-16 border border-white shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <Fingerprint size={400} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Methodology Context */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                    <Microscope size={20} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Executive Summary</h2>
                </div>
                <div className="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                  <p>
                    Tomato crops are highly susceptible to leaf diseases, which significantly reduce crop yield and agricultural productivity. 
                    Traditional disease diagnosis relies on manual inspection and expert knowledge, making it time-consuming and prone to errors.
                  </p>
                  <div className="p-6 bg-emerald-50 rounded-3xl border-l-8 border-emerald-500 shadow-sm transition-all hover:translate-x-1 duration-500">
                    <p className="text-emerald-950 font-bold italic">
                      "To overcome these limitations, this study proposes a deep learning–based automated tomato leaf disease classification system using the EfficientNet-B0 architecture with transfer learning."
                    </p>
                  </div>
                  <p>
                    Compared to other models, <strong>EfficientNet-B0</strong> provides the optimal balance between high classification accuracy and computational efficiency, 
                    making it suitable for real-time applications in resource-constrained agricultural environments.
                  </p>
                </div>
              </div>

              {/* Mobile Integration Card */}
              <div className="bg-white/50 border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Rocket size={40} className="text-slate-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-slate-900 text-lg">Practical Usability</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Integrated into a <strong>mobile application</strong> that allows users to capture images and receive instant predictions with disease-specific precautions and treatment recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Metric Matrix */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
                <h3 className="mono text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-8">Performance.Matrix_v3.1</h3>
                
                <div className="space-y-10">
                  {METRICS.map((m, i) => (
                    <div key={i} className="flex items-center justify-between group/metric">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover/metric:bg-white/10 transition-all border border-white/10 shadow-inner">
                          {m.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                          <p className="text-[9px] text-slate-500 font-bold">{m.sub}</p>
                        </div>
                      </div>
                      <div className="text-3xl md:text-4xl font-black tracking-tighter text-white tabular-nums">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="mono text-[9px] font-bold text-emerald-400/80 uppercase">Verified Results</span>
                  </div>
                  <BarChart3 size={16} className="text-white/20" />
                </div>
              </div>

              <div className="glass-card p-6 rounded-3xl border border-slate-100 shadow-lg text-center space-y-3">
                 <ShieldCheck className="mx-auto text-emerald-600" size={24} />
                 <p className="text-[11px] md:text-xs text-slate-600 font-bold italic leading-relaxed px-4">
                   "The proposed solution supports early disease detection, informed decision-making, and improved tomato crop management."
                 </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TECHNICAL METHODOLOGY --- */}
      <section className="space-y-10">
        <div className="flex flex-col items-center text-center space-y-2">
           <Cpu className="text-emerald-500" size={36} />
           <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">EfficientNet-B0 Strategy</h3>
           <p className="text-slate-400 mono text-[10px] uppercase font-bold tracking-[0.2em]">Edge AI Architecture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500 group">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h4 className="font-black text-slate-900 text-lg mb-2">Compound Scaling</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Optimal depth, width, and resolution scaling for efficient neural processing.</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500 group">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BrainCircuit size={24} />
            </div>
            <h4 className="font-black text-slate-900 text-lg mb-2">Transfer Learning</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Leveraging pre-trained botanical patterns for high-precision leaf texture recognition.</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500 group">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe size={24} />
            </div>
            <h4 className="font-black text-slate-900 text-lg mb-2">Edge Optimization</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Minimized computational overhead for deployment in resource-constrained environments.</p>
          </div>
        </div>
      </section>

      {/* --- RESEARCH ROADMAP --- */}
      <section className="space-y-12">
        <div className="flex flex-col items-center text-center space-y-2">
           <Milestone className="text-slate-300" size={36} />
           <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">Development Pipeline</h3>
        </div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2 hidden md:block" />
          <div className="space-y-8 md:space-y-0">
            {MILESTONES.map((milestone, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center group ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-slate-100 rounded-full z-10 hidden md:flex items-center justify-center shadow-lg group-hover:scale-110 transition-all ring-4 ring-emerald-50">
                   <ChevronRight size={18} className={`text-emerald-500 transition-transform ${idx % 2 === 0 ? 'rotate-180' : ''}`} strokeWidth={3} />
                </div>
                <div className="w-full md:w-[45%]">
                  <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-50 shadow-lg hover:shadow-2xl transition-all duration-700 relative overflow-hidden group/card">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="p-3 bg-slate-50 rounded-2xl group-hover/card:bg-emerald-500 group-hover/card:text-white transition-colors duration-500">{milestone.icon}</div>
                       <div>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{milestone.date}</span>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight">{milestone.title}</h4>
                       </div>
                    </div>
                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">{milestone.description}</p>
                  </div>
                </div>
                <div className="md:w-[10%]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CREATOR SECTION --- */}
      <section className="bg-slate-900 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden text-white group border border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="relative shrink-0">
             <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-800 rounded-full overflow-hidden border-8 border-white/5 shadow-2xl group-hover:rotate-3 transition-transform duration-700">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Creator" className="w-full h-full object-cover scale-110" />
             </div>
             <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-3 rounded-2xl shadow-xl animate-bounce">
                <ShieldCheck size={24} />
             </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] md:text-xs font-black text-emerald-400 uppercase tracking-[0.3em]">Principal Researcher</span>
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter">Project Directorate</h3>
              <p className="text-slate-400 text-base md:text-xl font-medium italic opacity-80 leading-relaxed max-w-2xl">
                "Building a future where AI democratizes agricultural expertise, ensuring food security through early edge intervention."
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <a href="#" className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest transition-all"><Github size={16} /> Repository</a>
              <a href="#" className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest transition-all"><Linkedin size={16} /> Profile</a>
              <a href="#" className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20"><Mail size={16} /> Contact Lead</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER BADGE --- */}
      <div className="text-center pt-8 opacity-40">
        <div className="inline-flex items-center gap-3 px-6 py-3 border border-slate-200 rounded-full">
           <ShieldCheck size={18} className="text-emerald-500" />
           <span className="mono text-[10px] font-black uppercase tracking-widest text-slate-500">Tomato_Pathology_Core.v3.1_Approved</span>
        </div>
      </div>

    </div>
  );
};

export default AboutApp;
