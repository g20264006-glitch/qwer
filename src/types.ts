export type TabType = 'home' | 'canvas' | 'agent' | 'redteam' | 'log' | 'presentation';

export interface TeamInfo {
  teamNumber: string;
  nickname: string;
}

export interface CanvasData {
  agentName: string;
  problem: string;
  goal: string;
  inputs: string;
  forbidden: string;
  hitl: string;
  privacy: string;
  fairness: string;
}

export interface ImprovementData {
  problemsFound: string;
  addedRules: string;
  finalFixes: string;
  reflections: string;
}

export interface Booking {
  teamNumber: string;
  itemId: string;
  timeSlot: string;
}

export interface AppState {
  teamInfo: TeamInfo;
  canvas: CanvasData;
  improvements: ImprovementData;
  bookings: Booking[];
}
