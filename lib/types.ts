
// Types for CPU Scheduling Simulator

export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
  remainingTime?: number;
  completionTime?: number;
  turnaroundTime?: number;
  waitingTime?: number;
  startTime?: number;
}

export interface GanttItem {
  processName: string;
  processId: string;
  start: number;
  end: number;
  step: number;
}

export interface ExecutionStep {
  time: number;
  action: string;
  processName: string;
  readyQueue: string[];
  ganttItems: GanttItem[];
}

export interface SimulationResult {
  processes: Process[];
  ganttChart: GanttItem[];
  steps: ExecutionStep[];
  avgWaitingTime: number;
  avgTurnaroundTime: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'mcq' | 'calculation';
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export type AlgorithmType = 'fcfs' | 'sjf' | 'rr' | 'priority';
