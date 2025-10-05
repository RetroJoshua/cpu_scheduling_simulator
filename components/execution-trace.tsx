
'use client';

import { ExecutionStep } from '@/lib/types';
import { Clock, Cpu, ListOrdered } from 'lucide-react';

interface ExecutionTraceProps {
  steps: ExecutionStep[];
  currentStep: number;
}

export function ExecutionTrace({ steps, currentStep }: ExecutionTraceProps) {
  if (!steps || steps.length === 0) {
    return null;
  }

  const currentStepData = steps[currentStep];

  if (!currentStepData) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Current Execution State</h3>
      
      <div className="grid gap-3">
        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
          <Clock className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <div className="font-medium text-sm">Current Time</div>
            <div className="text-lg">{currentStepData.time}</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
          <Cpu className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <div className="font-medium text-sm">Action</div>
            <div className="text-sm">{currentStepData.action}</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
          <ListOrdered className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <div className="font-medium text-sm">Ready Queue</div>
            <div className="text-sm">
              {currentStepData.readyQueue?.length > 0
                ? currentStepData.readyQueue.join(', ')
                : 'Empty'}
            </div>
          </div>
        </div>
      </div>

      {/* Execution history */}
      <div className="mt-6">
        <h4 className="font-medium text-sm mb-2">Execution History</h4>
        <div className="space-y-1 max-h-48 overflow-y-auto bg-muted/20 p-3 rounded-lg">
          {steps.slice(0, currentStep + 1).map((step, index) => (
            <div
              key={index}
              className={`text-sm py-1 ${
                index === currentStep ? 'font-medium text-primary' : 'text-muted-foreground'
              }`}
            >
              <span className="text-xs mr-2">[t={step.time}]</span>
              {step.action}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
