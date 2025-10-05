
'use client';

import { GanttItem } from '@/lib/types';

interface GanttChartProps {
  items: GanttItem[];
  currentStep?: number;
}

export function GanttChart({ items, currentStep }: GanttChartProps) {
  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground bg-muted/30 rounded-lg">
        No execution data yet. Start the simulation to see the Gantt chart.
      </div>
    );
  }

  // Filter items up to current step
  const visibleItems = currentStep !== undefined
    ? items.filter(item => item.step <= currentStep)
    : items;

  if (visibleItems.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground bg-muted/30 rounded-lg">
        Click "Next Step" to begin execution
      </div>
    );
  }

  const maxTime = Math.max(...visibleItems.map(item => item.end));
  const colors = [
    '#60B5FF', '#FF9149', '#FF9898', '#FF90BB', 
    '#FF6363', '#80D8C3', '#A19AD3', '#72BF78'
  ];

  // Assign colors to processes
  const processColors = new Map<string, string>();
  let colorIndex = 0;
  visibleItems.forEach(item => {
    if (!processColors.has(item.processId) && item.processId !== 'idle') {
      processColors.set(item.processId, colors[colorIndex % colors.length]);
      colorIndex++;
    }
  });

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Gantt Chart</h3>
      
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Process blocks */}
          <div className="relative h-16 bg-muted/30 rounded-lg">
            {visibleItems.map((item, index) => {
              const width = ((item.end - item.start) / maxTime) * 100;
              const left = (item.start / maxTime) * 100;
              const bgColor = item.processId === 'idle' 
                ? '#E5E7EB' 
                : processColors.get(item.processId);

              return (
                <div
                  key={index}
                  className="absolute top-0 h-full flex items-center justify-center border-r border-background text-sm font-medium"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    backgroundColor: bgColor,
                    color: item.processId === 'idle' ? '#6B7280' : '#ffffff'
                  }}
                >
                  {item.processName}
                </div>
              );
            })}
          </div>

          {/* Timeline */}
          <div className="relative h-8 mt-1">
            {visibleItems.map((item, index) => {
              const left = (item.start / maxTime) * 100;
              const endLeft = (item.end / maxTime) * 100;

              return (
                <div key={index}>
                  <div
                    className="absolute text-xs text-muted-foreground"
                    style={{ left: `${left}%` }}
                  >
                    {item.start}
                  </div>
                  {index === visibleItems.length - 1 && (
                    <div
                      className="absolute text-xs text-muted-foreground"
                      style={{ left: `${endLeft}%` }}
                    >
                      {item.end}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {Array.from(processColors.entries()).map(([processId, color]) => {
          const processName = visibleItems.find(item => item.processId === processId)?.processName;
          return (
            <div key={processId} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{processName}</span>
            </div>
          );
        })}
        {visibleItems.some(item => item.processId === 'idle') && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-300" />
            <span className="text-sm">Idle</span>
          </div>
        )}
      </div>
    </div>
  );
}
