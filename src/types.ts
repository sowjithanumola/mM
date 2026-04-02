export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizResult {
  score: number;
  total: number;
}

export type AppState = 'home' | 'quiz' | 'results' | 'learn';
