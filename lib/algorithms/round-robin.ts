
import { Process, SimulationResult, GanttItem, ExecutionStep } from '../types';

const TIME_QUANTUM = 3;

export function simulateRoundRobin(processes: Process[]): SimulationResult {
  const ganttChart: GanttItem[] = [];
  const steps: ExecutionStep[] = [];
  let currentTime = 0;
  let stepNumber = 0;
  
  const processList = processes.map(p => ({
    ...p,
    remainingTime: p.burstTime,
    startTime: undefined as number | undefined
  }));
  
  const readyQueue: typeof processList = [];
  const completedProcesses: Process[] = [];
  let processIndex = 0;

  // Sort by arrival time
  processList.sort((a, b) => a.arrivalTime - b.arrivalTime);

  while (completedProcesses.length < processes.length) {
    // Add newly arrived processes to ready queue
    while (processIndex < processList.length && processList[processIndex].arrivalTime <= currentTime) {
      readyQueue.push(processList[processIndex]);
      processIndex++;
    }

    if (readyQueue.length === 0) {
      // CPU idle
      const nextArrival = processList[processIndex]?.arrivalTime || currentTime;
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

    const process = readyQueue.shift()!;
    
    if (process.startTime === undefined) {
      process.startTime = currentTime;
    }

    const executionTime = Math.min(TIME_QUANTUM, process.remainingTime || 0);
    
    steps.push({
      time: currentTime,
      action: `Execute ${process.name} for ${executionTime} units (Remaining: ${process.remainingTime})`,
      processName: process.name,
      readyQueue: readyQueue.map(p => p.name),
      ganttItems: [...ganttChart]
    });

    ganttChart.push({
      processName: process.name,
      processId: process.id,
      start: currentTime,
      end: currentTime + executionTime,
      step: stepNumber++
    });

    currentTime += executionTime;
    process.remainingTime = (process.remainingTime || 0) - executionTime;

    // Add newly arrived processes
    while (processIndex < processList.length && processList[processIndex].arrivalTime <= currentTime) {
      readyQueue.push(processList[processIndex]);
      processIndex++;
    }

    if (process.remainingTime === 0) {
      // Process completed
      process.completionTime = currentTime;
      process.turnaroundTime = process.completionTime - process.arrivalTime;
      process.waitingTime = process.turnaroundTime - process.burstTime;
      completedProcesses.push(process);
      
      steps.push({
        time: currentTime,
        action: `Complete ${process.name} (WT: ${process.waitingTime}, TAT: ${process.turnaroundTime})`,
        processName: process.name,
        readyQueue: readyQueue.map(p => p.name),
        ganttItems: [...ganttChart]
      });
    } else {
      // Process not completed, add back to queue
      readyQueue.push(process);
      
      steps.push({
        time: currentTime,
        action: `${process.name} preempted, added back to queue`,
        processName: process.name,
        readyQueue: readyQueue.map(p => p.name),
        ganttItems: [...ganttChart]
      });
    }
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
