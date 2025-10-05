
'use client';

import { useState, useEffect } from 'react';
import { Process, SimulationResult, AlgorithmType } from '@/lib/types';
import { ProcessInputForm } from './process-input-form';
import { GanttChart } from './gantt-chart';
import { SimulationControls } from './simulation-controls';
import { ExecutionTrace } from './execution-trace';
import { ResultsTable } from './results-table';
import { simulateFCFS } from '@/lib/algorithms/fcfs';
import { simulateSJF } from '@/lib/algorithms/sjf';
import { simulateRoundRobin } from '@/lib/algorithms/round-robin';
import { simulatePriority } from '@/lib/algorithms/priority';

interface AlgorithmSimulatorProps {
  algorithmType: AlgorithmType;
  exampleProcesses?: Process[];
}

export function AlgorithmSimulator({ algorithmType, exampleProcesses }: AlgorithmSimulatorProps) {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const requirePriority = algorithmType === 'priority';

  const runSimulation = (processes: Process[]) => {
    let simResult: SimulationResult;

    switch (algorithmType) {
      case 'fcfs':
        simResult = simulateFCFS(processes);
        break;
      case 'sjf':
        simResult = simulateSJF(processes);
        break;
      case 'rr':
        simResult = simulateRoundRobin(processes);
        break;
      case 'priority':
        simResult = simulatePriority(processes);
        break;
      default:
        return;
    }

    setResult(simResult);
    setCurrentStep(0);
    setShowResults(false);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    if (result && currentStep < result.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setShowResults(false);
    setIsAutoPlaying(false);
  };

  const handleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isAutoPlaying && result && currentStep < result.steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= (result?.steps?.length ?? 0) - 1) {
            setIsAutoPlaying(false);
            setShowResults(true);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying, currentStep, result]);

  return (
    <div className="space-y-6">
      {!result ? (
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Configure Processes</h3>
          <ProcessInputForm
            onSubmit={runSimulation}
            requirePriority={requirePriority}
            exampleProcesses={exampleProcesses}
          />
        </div>
      ) : (
        <>
          <SimulationControls
            currentStep={currentStep}
            totalSteps={result.steps.length}
            onNext={handleNext}
            onReset={handleReset}
            onAutoPlay={handleAutoPlay}
            isAutoPlaying={isAutoPlaying}
          />

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <GanttChart
                items={result.ganttChart}
                currentStep={currentStep}
              />
            </div>

            <div className="space-y-6">
              <ExecutionTrace
                steps={result.steps}
                currentStep={currentStep}
              />
            </div>
          </div>

          <ResultsTable
            processes={result.processes}
            avgWaitingTime={result.avgWaitingTime}
            avgTurnaroundTime={result.avgTurnaroundTime}
            show={showResults || currentStep >= result.steps.length - 1}
          />
        </>
      )}
    </div>
  );
}
