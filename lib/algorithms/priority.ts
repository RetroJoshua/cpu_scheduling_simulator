
import { Process, SimulationResult, GanttItem, ExecutionStep } from '../types';

export function simulatePriority(processes: Process[]): SimulationResult {
  const ganttChart: GanttItem[] = [];
  const steps: ExecutionStep[] = [];
  let currentTime = 0;
  let stepNumber = 0;
  
  const remainingProcesses = processes.map(p => ({ ...p }));
  const completedProcesses: Process[] = [];

  while (remainingProcesses.length > 0) {
    // Get processes that have arrived
    const availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);

    if (availableProcesses.length === 0) {
      // CPU idle
      const nextArrival = Math.min(...remainingProcesses.map(p => p.arrivalTime));
      ganttChart.push({
        processName: 'Idle',
        processId: 'idle',
        start: currentTime,
        end: nextArrival,
        step: stepNumber++
      });
      
      steps.push({
        time: currentTime,
        action: 'CPU Idle',
        processName: 'Idle',
        readyQueue: [],
        ganttItems: [...ganttChart]
      });
      
      currentTime = nextArrival;
      continue;
    }

    // Select process with highest priority (lower number = higher priority)
    availableProcesses.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    const selectedProcess = availableProcesses[0];
    
    const index = remainingProcesses.findIndex(p => p.id === selectedProcess.id);
    const process = remainingProcesses.splice(index, 1)[0];

    steps.push({
      time: currentTime,
      action: `Start executing ${process.name} (Priority: ${process.priority}, Burst: ${process.burstTime})`,
      processName: process.name,
      readyQueue: availableProcesses.slice(1).map(p => `${p.name}(P:${p.priority})`),
      ganttItems: [...ganttChart]
    });

    process.startTime = currentTime;
    process.completionTime = currentTime + process.burstTime;
    process.turnaroundTime = process.completionTime - process.arrivalTime;
    process.waitingTime = process.turnaroundTime - process.burstTime;

    ganttChart.push({
      processName: process.name,
      processId: process.id,
      start: currentTime,
      end: process.completionTime,
      step: stepNumber++
    });

    currentTime = process.completionTime;
    completedProcesses.push(process);

    steps.push({
      time: currentTime,
      action: `Complete ${process.name} (WT: ${process.waitingTime}, TAT: ${process.turnaroundTime})`,
      processName: process.name,
      readyQueue: remainingProcesses.filter(p => p.arrivalTime <= currentTime).map(p => `${p.name}(P:${p.priority})`),
      ganttItems: [...ganttChart]
    });
  }

  const avgWaitingTime = completedProcesses.reduce((sum, p) => sum + (p.waitingTime || 0), 0) / completedProcesses.length;
  const avgTurnaroundTime = completedProcesses.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) / completedProcesses.length;

  return {
    processes: completedProcesses,
    ganttChart,
    steps,
    avgWaitingTime,
    avgTurnaroundTime
  };
}
