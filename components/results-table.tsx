
'use client';

import { Process } from '@/lib/types';

interface ResultsTableProps {
  processes: Process[];
  avgWaitingTime: number;
  avgTurnaroundTime: number;
  show?: boolean;
}

export function ResultsTable({ processes, avgWaitingTime, avgTurnaroundTime, show = true }: ResultsTableProps) {
  if (!show || !processes || processes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Results</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border p-2 text-left">Process</th>
              <th className="border p-2 text-center">Arrival Time</th>
              <th className="border p-2 text-center">Burst Time</th>
              <th className="border p-2 text-center">Completion Time</th>
              <th className="border p-2 text-center">Turnaround Time</th>
              <th className="border p-2 text-center">Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr key={process.id} className="hover:bg-muted/50">
                <td className="border p-2 font-medium">{process.name}</td>
                <td className="border p-2 text-center">{process.arrivalTime}</td>
                <td className="border p-2 text-center">{process.burstTime}</td>
                <td className="border p-2 text-center">{process.completionTime}</td>
                <td className="border p-2 text-center">{process.turnaroundTime}</td>
                <td className="border p-2 text-center">{process.waitingTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-primary/10 rounded-lg">
          <div className="text-sm text-muted-foreground">Average Waiting Time</div>
          <div className="text-2xl font-bold text-primary">{avgWaitingTime.toFixed(2)}</div>
        </div>
        <div className="p-4 bg-primary/10 rounded-lg">
          <div className="text-sm text-muted-foreground">Average Turnaround Time</div>
          <div className="text-2xl font-bold text-primary">{avgTurnaroundTime.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
