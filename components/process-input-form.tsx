
'use client';

import { useState } from 'react';
import { Process } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface ProcessInputFormProps {
  onSubmit: (processes: Process[]) => void;
  requirePriority?: boolean;
  exampleProcesses?: Process[];
}

export function ProcessInputForm({ onSubmit, requirePriority = false, exampleProcesses }: ProcessInputFormProps) {
  const [processes, setProcesses] = useState<Process[]>([
    { id: '1', name: 'P1', arrivalTime: 0, burstTime: 0, priority: requirePriority ? 1 : undefined }
  ]);

  const addProcess = () => {
    if (processes.length >= 5) {
      alert('Maximum 5 processes allowed');
      return;
    }
    const newId = String(processes.length + 1);
    setProcesses([...processes, {
      id: newId,
      name: `P${newId}`,
      arrivalTime: 0,
      burstTime: 0,
      priority: requirePriority ? 1 : undefined
    }]);
  };

  const removeProcess = (id: string) => {
    if (processes.length === 1) {
      alert('At least one process is required');
      return;
    }
    setProcesses(processes.filter(p => p.id !== id));
  };

  const updateProcess = (id: string, field: keyof Process, value: number) => {
    setProcesses(processes.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    for (const p of processes) {
      if (p.burstTime <= 0) {
        alert(`Burst time for ${p.name} must be greater than 0`);
        return;
      }
      if (p.arrivalTime < 0) {
        alert(`Arrival time for ${p.name} cannot be negative`);
        return;
      }
      if (requirePriority && (p.priority === undefined || p.priority < 1)) {
        alert(`Priority for ${p.name} must be at least 1`);
        return;
      }
    }
    
    onSubmit(processes);
  };

  const loadExample = () => {
    if (exampleProcesses) {
      setProcesses(exampleProcesses.map(p => ({ ...p })));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button type="button" onClick={addProcess} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Process
        </Button>
        {exampleProcesses && (
          <Button type="button" onClick={loadExample} variant="outline" size="sm">
            Load Example
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-2">
          {processes.map((process) => (
            <div key={process.id} className="grid grid-cols-[auto,1fr,1fr,1fr,auto] gap-2 items-center bg-muted/30 p-3 rounded-lg">
              <div className="font-medium w-12">{process.name}</div>
              
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Arrival Time</label>
                <input
                  type="number"
                  min="0"
                  value={process.arrivalTime}
                  onChange={(e) => updateProcess(process.id, 'arrivalTime', parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground block mb-1">Burst Time</label>
                <input
                  type="number"
                  min="1"
                  value={process.burstTime}
                  onChange={(e) => updateProcess(process.id, 'burstTime', parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  required
                />
              </div>

              {requirePriority && (
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Priority</label>
                  <input
                    type="number"
                    min="1"
                    value={process.priority || 1}
                    onChange={(e) => updateProcess(process.id, 'priority', parseInt(e.target.value) || 1)}
                    className="w-full px-2 py-1 border rounded text-sm"
                    required
                  />
                </div>
              )}

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeProcess(process.id)}
                disabled={processes.length === 1}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full">
          Start Simulation
        </Button>
      </form>
    </div>
  );
}
