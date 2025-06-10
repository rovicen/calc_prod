

export enum Complexity {
  Alta = 'alta',
  Media = 'media',
  Baja = 'baja',
}

export enum Responsible {
  DI_Multimedia = 'Diseñador Instruccional/Multimedia',
  DG = 'Diseñador Gráfico',
}

export enum ActivityType {
  Transversal = 'Transversal',
  ModuloIntroductorio = 'Módulo Introductorio',
  ModuloTecnico = 'Módulo técnico',
}

export interface Activity {
  id: string;
  name: string;
  type: ActivityType;
  responsible: Responsible;
  timeAlta: number;
  timeMedia: number;
  timeBaja: number;
  multipliedByModule: boolean;
}

export interface CalculationInput {
  courseName: string;
  courseCode: string;
  numModules: number;
  complexity: Complexity;
  numDiDesigners: number; 
  numDgDesigners: number;
  startDate?: string; // Added: Optional start date in YYYY-MM-DD format
}

export interface DetailedActivityBreakdown {
  id: string;
  name: string;
  calculatedHours: number;
  responsible: Responsible;
}

export interface CalculationResult {
  totalHours: number;
  diMultimediaHours: number;
  dgHours: number;
  detailedBreakdown: DetailedActivityBreakdown[];
  workdays: number;
  estimatedCompletionDate?: string | null; // Added: Optional completion date as string (e.g., "DD/MM/YYYY")
}