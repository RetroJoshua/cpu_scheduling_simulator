
import { Process, SimulationResult, GanttItem, ExecutionStep } from '../types';

export function simulateFCFS(processes: Process[]): SimulationResult {
  // Sort by arrival time
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  
  const ganttChart: GanttItem[] = [];
  const steps: ExecutionStep[] = [];
  let currentTime = 0;
  let stepNumber = 0;
  
  const results: Process[] = sortedProcesses.map(p => ({ ...p }));

  for (let i = 0; i < results.length; i++) {
    const process = results[i];
    
    // If current time is less than arrival time, CPU is idle
    if (currentTime < process.arrivalTime) {
      const idleTime = process.arrivalTime - currentTime;
      if (idleTime > 0) {
        ganttChart.push({
          processName: 'Idle',
          processId: 'idle',
          start: currentTime,
          end: process.arrivalTime,
          step: stepNumber++
        });
        
        steps.push({
          time: currentTime,
          action: `CPU Idle (waiting for next process)`,
          processName: 'Idle',
          readyQueue: results.slice(i).map(p => p.name),
          ganttItems: [...ganttChart]
        });
      }
      currentTime = process.arrivalTime;
    }

    // Add step for process execution start
    steps.push({
      time: currentTime,
      action: `Start executing ${process.name}`,
      processName: process.name,
      readyQueue: results.slice(i + 1).filter(p => p.arrivalTime <= currentTime).map(p => p.name),
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

    // Add step for process completion
    steps.push({
      time: currentTime,
      action: `Complete ${process.name} (WT: ${process.waitingTime}, TAT: ${process.turnaroundTime})`,
      processName: process.name,
      readyQueue: results.slice(i + 1).filter(p => p.arrivalTime <= currentTime).map(p => p.name),
      ganttItems: [...ganttChart]
    });
  }

  const avgWaitingTime = results.reduce((sum, p) => sum + (p.waitingTime || 0), 0) / results.length;
  const avgTurnaroundTime = results.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) / results.length;

  return {
    processes: results,
    ganttChart,
    steps,
    avgWaitingTime,
    avgTurnaroundTime
  };
}
