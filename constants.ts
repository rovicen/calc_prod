
import { Activity, ActivityType, Responsible } from './types';

export const THEME_HEX_COLORS = {
  light: {
    BG_MAIN: '#F2F4F4', // Gris Claro
    TEXT_MAIN: '#2E4053', // Gris oscuro azulado
    TEXT_SECONDARY: '#587592', // Gris medio
    PRIMARY_ACCENT: '#3EBFC7', // Turquesa
    SECONDARY_ACCENT: '#2E76F5', // Azul
    HEADER_BG: '#2E4053', // Header can be dark in light theme
    HEADER_TEXT: '#FFFFFF',
    SWITCHER_BG: '#FFFFFF',
    SWITCHER_TEXT: '#2E4053',
    SWITCHER_ICON_COLOR: '#3EBFC7', // Turquesa for icons
    BUTTON_PRIMARY_BG: '#3EBFC7',
    BUTTON_PRIMARY_HOVER_BG: '#2A9D8F',
    BUTTON_PRIMARY_TEXT: '#FFFFFF',
    BUTTON_SECONDARY_BORDER: '#3EBFC7',
    BUTTON_SECONDARY_TEXT: '#3EBFC7',
    BUTTON_SECONDARY_HOVER_BG: '#3EBFC7',
    BUTTON_SECONDARY_HOVER_TEXT: '#FFFFFF',
    INPUT_BG: '#FFFFFF',
    INPUT_BORDER: '#D1D5DB', // gray-300
    INPUT_FOCUS_BORDER: '#3EBFC7',
    INPUT_FOCUS_RING: '#3EBFC7',
    CARD_BG: '#FFFFFF',
    DIVIDER: '#E5E7EB', // gray-200
    // Chart specific
    CHART_LEGEND_TEXT: '#2E4053',
    CHART_BORDER_COLOR: '#FFFFFF',
    CHART_TOOLTIP_BG: 'rgba(0, 0, 0, 0.8)',
    CHART_TOOLTIP_TEXT: '#FFFFFF',
    // Specific element colors (Tailwind class strings)
    INFO_CARD_BG: 'bg-sky-50',
    INFO_CARD_BORDER: 'border-sky-200',
    INFO_CARD_TEXT: 'text-sky-700', // Example if needed
    ROLE_DI_BG: 'bg-teal-50',
    ROLE_DI_BORDER: 'border-teal-200',
    ROLE_DI_TEXT: 'text-teal-700',
    ROLE_DG_BG: 'bg-blue-50',
    ROLE_DG_BORDER: 'border-blue-200',
    ROLE_DG_TEXT: 'text-blue-700',
    ERROR_TEXT: 'text-red-500',
    HIGHLIGHT_TEXT_PRIMARY: '#3EBFC7', // Turquesa
    TABLE_HEADER_BG: 'bg-gray-50',
  },
  dark: {
    BG_MAIN: '#171923', // Very Dark Blue/Almost Black
    TEXT_MAIN: '#E2E8F0', // Light Gray
    TEXT_SECONDARY: '#A0AEC0', // Medium Gray
    PRIMARY_ACCENT: '#4FD1C5', // Brighter Turquesa
    SECONDARY_ACCENT: '#63B3ED', // Brighter Azul
    HEADER_BG: '#1A202C', // Slightly lighter than BG_MAIN for depth
    HEADER_TEXT: '#E2E8F0',
    SWITCHER_BG: '#2D3748',
    SWITCHER_TEXT: '#E2E8F0',
    SWITCHER_ICON_COLOR: '#4FD1C5', // Brighter Turquesa for icons
    BUTTON_PRIMARY_BG: '#4FD1C5',
    BUTTON_PRIMARY_HOVER_BG: '#38B2AC',
    BUTTON_PRIMARY_TEXT: '#1A202C', // Dark text on light button
    BUTTON_SECONDARY_BORDER: '#4FD1C5',
    BUTTON_SECONDARY_TEXT: '#4FD1C5',
    BUTTON_SECONDARY_HOVER_BG: '#4FD1C5',
    BUTTON_SECONDARY_HOVER_TEXT: '#1A202C',
    INPUT_BG: '#2D3748', // Dark Gray Blue
    INPUT_BORDER: '#4A5568', // Medium Dark Gray
    INPUT_FOCUS_BORDER: '#4FD1C5',
    INPUT_FOCUS_RING: '#4FD1C5',
    CARD_BG: '#1A202C',
    DIVIDER: '#4A5568', // gray-600
    // Chart specific
    CHART_LEGEND_TEXT: '#E2E8F0',
    CHART_BORDER_COLOR: '#1A202C', // Matches card BG
    CHART_TOOLTIP_BG: 'rgba(237, 242, 247, 0.9)', // Lightish for dark mode
    CHART_TOOLTIP_TEXT: '#1A202C', // Dark text
    // Specific element colors (Tailwind class strings)
    INFO_CARD_BG: 'bg-sky-900', // Darker variant
    INFO_CARD_BORDER: 'border-sky-700',
    INFO_CARD_TEXT: 'text-sky-300',
    ROLE_DI_BG: 'bg-teal-900',
    ROLE_DI_BORDER: 'border-teal-700',
    ROLE_DI_TEXT: 'text-teal-300',
    ROLE_DG_BG: 'bg-blue-900',
    ROLE_DG_BORDER: 'border-blue-700',
    ROLE_DG_TEXT: 'text-blue-300',
    ERROR_TEXT: 'text-red-400', // Lighter red for dark bg
    HIGHLIGHT_TEXT_PRIMARY: '#4FD1C5', // Brighter Turquesa
    TABLE_HEADER_BG: 'bg-gray-700',
  }
};

export const HOURS_PER_WORKDAY = 7; // Updated from 8 to 7

export const ACTIVITIES_DATA: Activity[] = [
  { id: 'act1', name: 'Desarrollo de contenido y diseño instruccional (DA)', type: ActivityType.Transversal, responsible: Responsible.DI_Multimedia, timeAlta: 8, timeMedia: 6, timeBaja: 4, multipliedByModule: false },
  { id: 'act2', name: 'Evaluación diagnóstica', type: ActivityType.ModuloIntroductorio, responsible: Responsible.DI_Multimedia, timeAlta: 0.33, timeMedia: 0.33, timeBaja: 0.33, multipliedByModule: false },
  { id: 'act3', name: 'Índice del curso', type: ActivityType.ModuloIntroductorio, responsible: Responsible.DI_Multimedia, timeAlta: 0.08, timeMedia: 0.08, timeBaja: 0.08, multipliedByModule: false },
  { id: 'act4', name: 'Bibliografía', type: ActivityType.ModuloIntroductorio, responsible: Responsible.DI_Multimedia, timeAlta: 0.5, timeMedia: 0.5, timeBaja: 0.5, multipliedByModule: false },
  { id: 'act5', name: 'Glosario', type: ActivityType.ModuloIntroductorio, responsible: Responsible.DI_Multimedia, timeAlta: 0.5, timeMedia: 0.5, timeBaja: 0.5, multipliedByModule: false },
  { id: 'act6', name: 'Evaluación final', type: ActivityType.Transversal, responsible: Responsible.DI_Multimedia, timeAlta: 0.5, timeMedia: 0.5, timeBaja: 0.5, multipliedByModule: false },
  { id: 'act7', name: 'Video introductorio', type: ActivityType.ModuloIntroductorio, responsible: Responsible.DI_Multimedia, timeAlta: 0.45, timeMedia: 0.45, timeBaja: 0.45, multipliedByModule: false },
  { id: 'act8', name: 'Scorm Módulo Introductorio', type: ActivityType.ModuloIntroductorio, responsible: Responsible.DG, timeAlta: 1, timeMedia: 1, timeBaja: 1, multipliedByModule: false },
  { id: 'act9', name: 'Scorm módulo (Técnico)', type: ActivityType.ModuloTecnico, responsible: Responsible.DI_Multimedia, timeAlta: 6.5, timeMedia: 6.5, timeBaja: 6.5, multipliedByModule: true },
  { id: 'act10', name: 'Branding Documento de aprendizaje (Técnico)', type: ActivityType.ModuloTecnico, responsible: Responsible.DG, timeAlta: 2.5, timeMedia: 2.5, timeBaja: 2.5, multipliedByModule: true },
  { id: 'act11', name: 'Scorm módulo (Técnico - Gráfico)', type: ActivityType.ModuloTecnico, responsible: Responsible.DG, timeAlta: 1.5, timeMedia: 1.5, timeBaja: 1.5, multipliedByModule: true },
  { id: 'act12', name: 'Actividad Genially (Técnico)', type: ActivityType.ModuloTecnico, responsible: Responsible.DI_Multimedia, timeAlta: 1, timeMedia: 1, timeBaja: 1, multipliedByModule: true },
  { id: 'act13', name: 'Evaluación parcial (Técnico)', type: ActivityType.ModuloTecnico, responsible: Responsible.DI_Multimedia, timeAlta: 0.33, timeMedia: 0.33, timeBaja: 0.33, multipliedByModule: true },
  { id: 'act14', name: 'Proxy (Curso)', type: ActivityType.Transversal, responsible: Responsible.DI_Multimedia, timeAlta: 0.50, timeMedia: 0.50, timeBaja: 0.50, multipliedByModule: false },
];
