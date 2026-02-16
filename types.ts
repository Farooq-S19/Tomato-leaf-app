
export interface AnalysisResult {
  plantName: string;
  healthStatus: 'Healthy' | 'Diseased' | 'Unknown';
  diseaseName?: string;
  confidence: number;
  description: string;
  symptoms: string[];
  recommendations: string[];
}

export interface GalleryItem {
  id: string;
  image: string;
  analysis: AnalysisResult;
  customName: string;
  timestamp: number;
}

export type AppView = 'HOME' | 'ABOUT_APP' | 'ABOUT_DISEASES' | 'ANALYZER' | 'GALLERY';
