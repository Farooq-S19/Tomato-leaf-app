
import React, { useState, useMemo } from 'react';
import { GalleryItem } from '../types';
import { Trash2, Calendar, Search, Leaf, ArrowRight, X, Filter, CheckCircle, AlertTriangle, BarChart3, ChevronRight, Shield, Info, Microscope } from 'lucide-react';

interface GalleryProps {
  items: GalleryItem[];
  onDelete: (id: string) => void;
}

const RadialProgress: React.FC<{ percentage: number, size?: number, strokeWidth?: number }> = ({ percentage, size = 40, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className="text-slate-100" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 1.5s ease-out' }} strokeLinecap="round" className="text-emerald-500" />
      </svg>
      <span className="absolute text-[8px] font-black text-slate-900">{Math.round(percentage)}%</span>
    </div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ items, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'All' | 'Healthy' | 'Diseased'>('All');
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const stats = useMemo(() => ({
    total: items.length,
    healthy: items.filter(i => i.analysis.healthStatus === 'Healthy').length,
    diseased: items.filter(i => i.analysis.healthStatus === 'Diseased').length
  }), [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.customName.toLowerCase().includes(searchTerm.toLowerCase()) || item.analysis.plantName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.analysis.healthStatus === statusFilter;
      const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
      const matchesDateStart = !dateStart || itemDate >= dateStart;
      const matchesDateEnd = !dateEnd || itemDate <= dateEnd;
      return matchesSearch && matchesStatus && matchesDateStart && matchesDateEnd;
    });
  }, [items, searchTerm, statusFilter, dateStart, dateEnd]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 bg-white rounded-3xl border-2 border-dashed border-slate-100 px-6 max-w-2xl mx-auto shadow-sm">
        <div className="p-6 bg-emerald-50 rounded-full text-emerald-200 animate-pulse"><Leaf size={32} fill="currentColor" /></div>
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Archives Offline</h2>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest">No data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-1000 pb-12 px-2">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Diagnostic Archives</h2>
          <p className="text-slate-400 text-xs md:text-sm font-medium">Historical specimen data index.</p>
        </div>
        <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-slate-100 shadow-md">
          <div className="flex flex-col px-3 py-1 border-r border-slate-100 shrink-0"><span className="text-[7px] font-black text-slate-400 uppercase mb-0.5">Scans</span><span className="text-base font-black text-slate-800">{stats.total}</span></div>
          <div className="flex flex-col px-3 py-1 border-r border-slate-100 shrink-0"><span className="text-[7px] font-black text-emerald-400 uppercase mb-0.5">Healthy</span><span className="text-base font-black text-emerald-600">{stats.healthy}</span></div>
          <div className="flex flex-col px-3 py-1 shrink-0"><span className="text-[7px] font-black text-red-400 uppercase mb-0.5">Alert</span><span className="text-base font-black text-red-600">{stats.diseased}</span></div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-50 shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative flex items-center bg-slate-50 px-3 rounded-xl shadow-inner group"><Search size={14} className="text-slate-300 group-focus-within:text-emerald-500" /><input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-transparent px-2 py-2 text-xs font-bold outline-none border-none text-slate-700" /></div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="bg-slate-50 px-3 py-2 rounded-xl text-xs font-black outline-none border-none text-slate-700 uppercase cursor-pointer shadow-inner">
            <option value="All">All Status</option>
            <option value="Healthy">Healthy</option>
            <option value="Diseased">Pathological</option>
          </select>
          <div className="lg:col-span-2 flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-xl shadow-inner"><Calendar size={14} className="text-slate-300" /><input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} className="w-full bg-transparent p-1 text-[9px] font-black outline-none border-none text-slate-600" /><span className="text-slate-200 text-[9px] font-black">TO</span><input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} className="w-full bg-transparent p-1 text-[9px] font-black outline-none border-none text-slate-600" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} onClick={() => setSelectedItem(item)} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ease-out cursor-pointer relative ring-1 ring-slate-100">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={item.image} alt={item.customName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out" />
              <button onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-xl text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-lg"><Trash2 size={12} /></button>
              <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-[7px] font-black uppercase text-white shadow-lg backdrop-blur-md border border-white/20 ${item.analysis.healthStatus === 'Healthy' ? 'bg-emerald-500/80' : 'bg-red-500/80'}`}>{item.analysis.healthStatus}</div>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 truncate tracking-tight">{item.customName}</h3>
                <div className="flex items-center gap-2 text-[8px] text-slate-400 font-bold uppercase tracking-widest"><Calendar size={10} className="text-emerald-500" /> {new Date(item.timestamp).toLocaleDateString()}</div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="mono text-[7px] font-black text-slate-400 uppercase leading-none">Taxonomy: <span className="text-slate-700">{item.analysis.plantName}</span></div>
                <div className="p-2 bg-slate-900 text-white rounded-lg group-hover:bg-emerald-600 transition-all shadow-md group-hover:rotate-6"><ArrowRight size={14} /></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-6xl max-h-[95vh] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-500 ring-1 ring-white/20">
            <div className="p-5 md:p-8 border-b border-slate-50 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex items-center gap-4">
                 <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shadow-inner"><BarChart3 size={20} /></div>
                 <div className="space-y-0.5">
                    <h3 className="text-lg md:text-3xl font-black text-slate-900 tracking-tighter leading-none">{selectedItem.customName}</h3>
                    <p className="text-[7px] md:text-[9px] text-slate-400 font-black uppercase tracking-widest">SPECIMEN_ID: LD-{selectedItem.id.slice(-8).toUpperCase()}</p>
                 </div>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-2.5 hover:bg-slate-50 rounded-full transition-all active:scale-90 bg-slate-50/50"><X size={20} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                <div className="lg:col-span-5 space-y-6">
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-100">
                    <img src={selectedItem.image} alt="Original" className="w-full object-cover aspect-square" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50/50 p-4 rounded-3xl text-center border border-slate-100 shadow-inner flex flex-col items-center justify-center">
                        <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mb-1">Engine Confidence</p>
                        <RadialProgress percentage={selectedItem.analysis.confidence * 100} size={50} />
                     </div>
                     <div className="bg-slate-50/50 p-4 rounded-3xl text-center flex flex-col justify-center items-center border border-slate-100 shadow-inner gap-2">
                        <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none">Biological Status</p>
                        <div className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${selectedItem.analysis.healthStatus === 'Healthy' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-red-50 border-red-500 text-red-700'}`}>{selectedItem.analysis.healthStatus}</div>
                     </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-3">
                    <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">Biological Classification</span>
                    <h2 className="text-3xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">{selectedItem.analysis.plantName}</h2>
                    {selectedItem.analysis.diseaseName && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-[10px] md:text-sm font-black uppercase tracking-widest border border-red-100 shadow-md"><AlertTriangle size={14} /> {selectedItem.analysis.diseaseName}</div>
                    )}
                  </div>

                  <div className="space-y-8">
                    {/* SIGNIFICANTLY EXPANDED DESCRIPTION AREA */}
                    <div className="space-y-4">
                       <h4 className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-slate-800 uppercase tracking-widest border-l-4 border-emerald-500 pl-3">Full Physiological Diagnostics Report</h4>
                       <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                         <div className="absolute top-4 right-4 text-emerald-100 opacity-20"><Microscope size={48} /></div>
                         <p className="text-slate-600 text-sm md:text-xl lg:text-2xl leading-relaxed italic font-medium tracking-tight relative z-10 transition-colors group-hover:text-slate-800">
                           "{selectedItem.analysis.description}"
                         </p>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-4">
                        <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none flex items-center gap-2"><Info size={12} className="text-amber-500" /> Observed Symptoms</h4>
                        <ul className="space-y-2">
                          {selectedItem.analysis.symptoms.map((s, i) => (
                            <li key={i} className="text-[10px] md:text-sm text-slate-700 bg-white px-4 py-3 rounded-2xl flex items-center gap-3 font-bold border border-slate-50 shadow-sm hover:border-amber-100 transition-all"><div className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" /> {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[8px] font-black text-emerald-400 uppercase tracking-widest leading-none flex items-center gap-2"><Shield size={12} /> Treatment Protocol</h4>
                        <ul className="space-y-2">
                          {selectedItem.analysis.recommendations.map((r, i) => (
                            <li key={i} className="text-[10px] md:text-sm text-emerald-950 bg-emerald-50 px-4 py-3 rounded-2xl flex items-start gap-3 font-black border border-emerald-100 shadow-sm transition-all hover:bg-emerald-100 group"><CheckCircle size={14} className="mt-0.5 shrink-0 text-emerald-500" /> {r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-5 md:p-10 border-t border-slate-50 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 sticky bottom-0 z-20 backdrop-blur-xl">
               <div className="hidden sm:flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300"><Shield size={20} /></div>
                 <div className="text-left"><p className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none">Diagnostic v3.1</p><p className="text-[9px] font-bold text-slate-600 mt-1">Certified Research Model</p></div>
               </div>
              <button onClick={() => setSelectedItem(null)} className="w-full sm:w-auto px-10 py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-xl text-[9px] md:text-[10px] tracking-widest uppercase transition-all shadow-xl active:scale-95">Terminate View</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
