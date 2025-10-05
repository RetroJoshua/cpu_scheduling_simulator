
'use client';

import { useAppContext } from '@/lib/app-context';
import { AlgorithmSimulator } from '@/components/algorithm-simulator';
import { CodeDisplay } from '@/components/code-display';
import { Quiz } from '@/components/quiz';
import { fcfsCode } from '@/lib/code-snippets';
import { fcfsQuiz } from '@/lib/quiz-data';
import { fcfsExamples } from '@/lib/example-processes';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

export default function FCFSPage() {
  const { fontSize } = useAppContext();

  return (
    <div className="space-y-12 pb-12">
      {/* Introduction */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-primary">First Come First Serve (FCFS)</h1>
        <p className="text-lg text-muted-foreground">
          Understand the simplest CPU scheduling algorithm where processes are executed in the order they arrive
        </p>
      </section>

      {/* Theory */}
      <section className="space-y-4 bg-muted/30 p-6 rounded-lg">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Algorithm Overview</h2>
        </div>
        <div className="space-y-3">
          <p>
            <strong>First Come First Serve (FCFS)</strong> is the simplest CPU scheduling algorithm. It operates on a 
            <strong> non-preemptive</strong> basis, where processes are executed in the exact order they arrive in the ready queue.
          </p>
          <p>
            When a process enters the ready queue, it is placed at the end. The CPU executes processes from the front of the queue, 
            and once a process starts execution, it runs to completion without interruption.
          </p>
          <div className="bg-background p-4 rounded border-l-4 border-primary">
            <h3 className="font-semibold mb-2">Key Characteristics:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Non-preemptive scheduling</li>
              <li>Easy to implement using FIFO queue</li>
              <li>No starvation - every process gets executed eventually</li>
              <li>Performance depends heavily on arrival order</li>
              <li>Suffers from the "convoy effect"</li>
            </ul>
          </div>
        </div>
      </section>

      {/* C Code Implementation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">C Implementation</h2>
        <CodeDisplay code={fcfsCode} language="c" />
      </section>

      {/* Interactive Simulator */}
      <section className="space-y-4 bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Interactive Simulation</h2>
        <p className="text-muted-foreground">
          Step through FCFS execution manually to see how processes are scheduled. Configure your own processes or use the example.
        </p>
        <AlgorithmSimulator 
          algorithmType="fcfs" 
          exampleProcesses={fcfsExamples}
        />
      </section>

      {/* Time Complexity Analysis */}
      <section className="space-y-4 bg-muted/30 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Time Complexity Analysis</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-2">Sorting Phase:</h3>
            <p>
              Sorting processes by arrival time: <code className="bg-background px-2 py-1 rounded">O(n log n)</code> using 
              efficient sorting algorithms like merge sort or quick sort.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Execution Phase:</h3>
            <p>
              Processing each process once: <code className="bg-background px-2 py-1 rounded">O(n)</code>
            </p>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="font-semibold">
              Overall Time Complexity: <code className="text-lg">O(n log n)</code> for sorting + <code className="text-lg">O(n)</code> for processing 
              = <code className="text-xl font-bold">O(n log n)</code>
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Note: If processes are already sorted by arrival time, the complexity reduces to O(n).
          </p>
        </div>
      </section>

      {/* Advantages and Disadvantages */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-green-50 dark:bg-green-950/20 p-6 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-semibold">Advantages</h2>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Simple Implementation:</strong> Easy to understand and implement using a simple FIFO queue</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>No Starvation:</strong> Every process will eventually be executed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Fair:</strong> Processes are treated equally based on arrival order</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Low Overhead:</strong> Minimal context switching and scheduling decisions</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4 bg-red-50 dark:bg-red-950/20 p-6 rounded-lg">
          <div className="flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-semibold">Disadvantages</h2>
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Convoy Effect:</strong> Short processes wait for long processes ahead of them</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Poor Average Waiting Time:</strong> Not optimal for minimizing average waiting time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Non-Preemptive:</strong> Cannot handle time-critical tasks effectively</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Performance Varies:</strong> Heavily dependent on process arrival order</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-6 rounded-lg">
        <Quiz questions={fcfsQuiz} algorithmName="FCFS" />
      </section>
    </div>
  );
}
