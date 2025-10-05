
'use client';

import { Button } from '@/components/ui/button';
import { Play, SkipForward, RotateCcw, Pause } from 'lucide-react';

interface SimulationControlsProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onReset: () => void;
  onAutoPlay?: () => void;
  isAutoPlaying?: boolean;
}

export function SimulationControls({
  currentStep,
  totalSteps,
  onNext,
  onReset,
  onAutoPlay,
  isAutoPlaying
}: SimulationControlsProps) {
  const isComplete = currentStep >= totalSteps - 1;

  return (
    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
      <div className="flex gap-2">
        <Button
          onClick={onNext}
          disabled={isComplete || isAutoPlaying}
          size="sm"
        >
          <SkipForward className="w-4 h-4 mr-1" />
          Next Step
        </Button>

        {onAutoPlay && (
          <Button
            onClick={onAutoPlay}
            disabled={isComplete}
            variant="outline"
            size="sm"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Auto Play
              </>
            )}
          </Button>
        )}

        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="ml-auto text-sm text-muted-foreground">
        Step {currentStep + 1} of {totalSteps}
        {isComplete && <span className="ml-2 text-green-600 font-medium">✓ Complete</span>}
      </div>
    </div>
  );
}
