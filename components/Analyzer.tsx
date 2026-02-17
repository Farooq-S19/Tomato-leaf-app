
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Camera, Upload, RefreshCw, X, AlertCircle, CheckCircle, Sparkles, Save, Target, Crosshair, ZoomIn, Info, Terminal, Fingerprint, Layers, Microscope } from 'lucide-react';
import { analyzeLeafImage } from '../services/geminiService.ts';
import { AnalysisResult, GalleryItem } from '../types.ts';

interface AnalyzerProps {
  onSave: (item: GalleryItem) => void;
}

const SOUNDS = {
  CLICK: 'https://assets.mixkit.co/active_storage/sfx/700/700-preview.mp3',
  WHOOSH: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  SUCCESS: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'
};

const DIAGNOSTIC_STEPS = [
  "INITIALIZING_OPTICS",
  "NORMALIZING_LUMINANCE",
  "EXTRACTING_VEINS",
  "CHLOROPHYLL_SCAN",
  "PATTERN_MATCHING",
  "CONSULTING_ENGINE",
  "SYNTHESIZING_REPORT"
];

const RadialProgress: React.FC<{ percentage: number, size?: number }> = ({ percentage, size = 50 }) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" className="text-slate-100" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 2s ease-out' }} strokeLinecap="round" className="text-emerald-500" />
      </svg>
      <span className="absolute mono text-[8px] md:text-[10px] font-black text-slate-900">{Math.round(percentage)}%</span>
    </div>
  );
};

const Analyzer: React.FC<AnalyzerProps> = ({ onSave }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [customName, setCustomName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const scanAudio = useRef<HTMLAudioElement | null>(null);
  const successAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload audio assets for zero-latency feedback
    clickAudio.current = new Audio(SOUNDS.CLICK);
    scanAudio.current = new Audio(SOUNDS.WHOOSH);
    scanAudio.current.loop = true;
    scanAudio.current.volume = 0.15;
    successAudio.current = new Audio(SOUNDS.SUCCESS);
    
    return () => {
      scanAudio.current?.pause();
      clickAudio.current = null;
      scanAudio.current = null;
      successAudio.current = null;
    };
  }, []);

  const playClick = () => {
    if (clickAudio.current) {
      clickAudio.current.currentTime = 0;
      clickAudio.current.play().catch(() => {});
    }
  };

  const playSuccess = () => {
    if (successAudio.current) {
      successAudio.current.currentTime = 0;
      successAudio.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (showCamera) startCamera();
    else stopCamera();
    return () => stopCamera();
  }, [showCamera]);

  useEffect(() => {
    let interval: number | undefined;
    if (isAnalyzing) {
      interval = window.setInterval(() => {
        setDiagnosticStep(prev => (prev + 1) % DIAGNOSTIC_STEPS.length);
      }, 1000);
    } else {
      setDiagnosticStep(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setError(null);
    } catch (err) {
      setError("Unable to access high-res camera.");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      playClick();
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL('image/jpeg', 0.9));
        setShowCamera(false);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setIsSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const performAnalysis = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setResult(null);
    setError(null);
    
    scanAudio.current?.play().catch(() => {});
    
    try {
      const diagnosis = await analyzeLeafImage(image);
      setResult(diagnosis);
      setCustomName(diagnosis.plantName);
    } catch (err: any) {
      setError(err.message || "Diagnostic connection lost.");
    } finally {
      setIsAnalyzing(false);
      if (scanAudio.current) {
        scanAudio.current.pause();
        scanAudio.current.currentTime = 0;
      }
    }
  };

  const handleSave = () => {
    if (!image || !result) return;
    onSave({
      id: Date.now().toString(),
      image,
      analysis: result,
      customName: customName || result.plantName,
      timestamp: Date.now()
    });
    setIsSaved(true);
    playSuccess();
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setCustomName("");
    setIsSaved(false);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 px-4">
      {!image && !showCamera && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 py-8 md:py-12">
          <div className="text-center space-y-2">
             <div className="inline-flex items-center gap-2 px-3 py-1 glass-card rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-100/50">
                <Target size={12} /> System Standby
             </div>
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter">Diagnostic Queue</h2>
            <p className="text-slate-400 text-[10px] md:text-sm max-w-sm mx-auto leading-relaxed mono uppercase tracking-tight">Provide specimens for neural processing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => { playClick(); setShowCamera(true); }}
              className="group p-6 md:p-8 glass-card rounded-3xl md:rounded-[2.5rem] hover:shadow-lg transition-all text-center flex flex-col items-center border-slate-100"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 transition-all shadow-md">
                <Camera size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="mt-4 text-lg font-black text-slate-800 tracking-tight">Live Capture</h3>
              <p className="mono text-slate-400 text-[8px] mt-0.5 uppercase tracking-widest font-bold">Field Optics</p>
            </button>

            <button
              onClick={() => { playClick(); fileInputRef.current?.click(); }}
              className="group p-6 md:p-8 glass-card rounded-3xl md:rounded-[2.5rem] hover:shadow-lg transition-all text-center flex flex-col items-center border-slate-100"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white border border-slate-100 text-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-md">
                <Upload size={20} className="md:w-6 md:h-6" />
              </div>
              <h3 className="mt-4 text-lg font-black text-slate-800 tracking-tight">Local Import</h3>
              <p className="mono text-slate-400 text-[8px] mt-0.5 uppercase tracking-widest font-bold">Media Stream</p>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
          </div>
        </div>
      )}

      {showCamera && (
        <div className="relative bg-black rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl aspect-[3/4] animate-in fade-in zoom-in-95 max-w-sm mx-auto ring-4 ring-white/10">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between">
            <div className="mono text-[8px] text-emerald-400 font-bold bg-black/30 px-2 py-1 rounded border border-emerald-400/20 self-start">REC // 4K</div>
            <div className="flex justify-center"><div className="w-32 h-32 border border-white/20 border-dashed rounded-full" /></div>
            <div className="mono text-[8px] text-white/40 font-bold self-end">XY_TRACKING: TRUE</div>
          </div>
          <div className="absolute bottom-6 inset-x-0 flex justify-center items-center gap-6">
            <button onClick={() => setShowCamera(false)} className="w-10 h-10 bg-white/10 backdrop-blur-xl text-white rounded-full flex items-center justify-center border border-white/20"><X size={18} /></button>
            <button onClick={capturePhoto} className="w-16 h-16 bg-white rounded-full p-1 shadow-2xl active:scale-95 flex items-center justify-center">
               <div className="w-full h-full bg-emerald-500 rounded-full flex items-center justify-center"><Target size={24} className="text-white animate-pulse" /></div>
            </button>
            <div className="w-10" />
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {image && !isAnalyzing && !result && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 max-w-xl mx-auto py-6">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-100">
            <img src={image} alt="Preview" className="w-full h-auto object-cover max-h-[500px]" />
            <button onClick={reset} className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg transition-all"><X size={16} /></button>
          </div>
          <button
            onClick={performAnalysis}
            className="group w-full py-4 bg-slate-900 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-lg flex flex-col items-center justify-center gap-1 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-400" />
              <span className="text-lg tracking-tight uppercase">Analyze Specimen</span>
            </div>
          </button>
        </div>
      )}

      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in fade-in duration-700">
          <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border-4 border-white ring-1 ring-slate-200">
            <img src={image!} alt="Analyzing" className="w-full h-full object-cover opacity-20 blur-sm scale-110" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
               <div className="mono text-[7px] text-emerald-400/60 uppercase tracking-widest">Pipeline: Processing</div>
               <div className="space-y-2">
                  <div className="mono text-[8px] text-emerald-400 font-bold">{DIAGNOSTIC_STEPS[diagnosticStep]}</div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${(diagnosticStep + 1) * 14}%` }} />
                  </div>
               </div>
            </div>
            <div className="absolute left-0 right-0 h-1 bg-emerald-400 shadow-[0_0_30px_rgba(52,211,153,1)] scanner-line z-50" />
          </div>
          <p className="text-slate-400 font-bold text-[8px] md:text-[10px] animate-pulse tracking-[0.3em] uppercase mono">Neural synthesis in progress...</p>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 py-6">
          <div className="glass-card rounded-3xl md:rounded-[3rem] p-6 md:p-10 shadow-xl relative overflow-hidden border border-white/60">
            <div className="flex flex-col lg:flex-row gap-8 relative z-10">
              <div className="lg:w-[35%] space-y-6">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                   <img src={image!} alt="Analyzed" className="w-full object-cover aspect-square" />
                </div>
                
                <div className="glass-card p-5 rounded-3xl space-y-4 border border-white shadow-sm ring-1 ring-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Fingerprint size={12} className="text-emerald-500" />
                    <h4 className="mono text-[8px] font-black text-slate-400 uppercase tracking-widest">Archive Metadata</h4>
                  </div>
                  <input 
                    type="text" 
                    value={customName} 
                    onChange={(e) => setCustomName(e.target.value)} 
                    placeholder="Enter Alias Label..." 
                    className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-100 outline-none transition-all" 
                  />
                  <button 
                    disabled={isSaved} 
                    onClick={handleSave} 
                    className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md ${
                      isSaved 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
                    }`}
                  >
                    {isSaved ? <CheckCircle size={16} /> : <Save size={16} />}
                    {isSaved ? "Saved to Gallery" : "Commit to Gallery"}
                  </button>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="mono text-[8px] font-black text-emerald-600 uppercase tracking-widest">Scan Complete</span></div>
                  <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter">{result.plantName}</h2>
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${result.healthStatus === 'Healthy' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-red-50 border-red-500 text-red-700'}`}>
                    {result.healthStatus === 'Healthy' ? <CheckCircle size={14} /> : <AlertCircle size={14} />} {result.healthStatus}
                  </div>
                </div>

                <div className="glass-card p-5 rounded-2xl border border-white/60 bg-white/50">
                   <h4 className="mono text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Microscope size={12} /> Clinical Observation</h4>
                   <p className="text-slate-600 text-sm md:text-lg italic font-medium leading-relaxed">"{result.description}"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="mono text-[8px] font-black text-slate-900 uppercase tracking-widest border-b pb-1">Pathology</h4>
                    <div className="flex flex-wrap gap-2">{result.symptoms.map((s, i) => <span key={i} className="px-2 py-1 bg-white rounded-lg text-[10px] font-bold text-slate-600 shadow-sm border border-slate-50">{s}</span>)}</div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="mono text-[8px] font-black text-emerald-600 uppercase tracking-widest border-b pb-1">Clinical Plan</h4>
                    <div className="flex flex-wrap gap-2">{result.recommendations.map((r, i) => <span key={i} className="px-2 py-1 bg-emerald-50 rounded-lg text-[10px] font-bold text-emerald-900 border border-emerald-100">{r}</span>)}</div>
                  </div>
                </div>

                <div className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                   <div className="flex items-center gap-4">
                     <RadialProgress percentage={result.confidence * 100} />
                     <div className="mono text-[8px] font-black text-slate-400 uppercase tracking-widest">Confidence Index</div>
                   </div>
                   <button onClick={reset} className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md">
                      <RefreshCw size={14} /> New Scan
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="glass-card border-2 border-red-100 shadow-xl rounded-3xl p-6 text-center text-red-700 max-w-sm mx-auto mt-8">
          <AlertCircle size={32} className="mx-auto text-red-500 mb-2" />
          <h4 className="font-black uppercase text-sm tracking-widest">Pipeline Error</h4>
          <p className="mono text-[9px] mt-1">{error}</p>
          <button onClick={() => { playClick(); setError(null); }} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg font-black text-[10px] uppercase shadow-md active:scale-95">Reset</button>
        </div>
      )}
    </div>
  );
};

export default Analyzer;
