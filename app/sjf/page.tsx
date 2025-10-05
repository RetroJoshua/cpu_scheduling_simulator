
'use client';

import { useAppContext } from '@/lib/app-context';
import { AlgorithmSimulator } from '@/components/algorithm-simulator';
import { CodeDisplay } from '@/components/code-display';
import { Quiz } from '@/components/quiz';
import { sjfCode } from '@/lib/code-snippets';
import { sjfQuiz } from '@/lib/quiz-data';
import { sjfExamples } from '@/lib/example-processes';
import { Zap, CheckCircle, XCircle } from 'lucide-react';

export default function SJFPage() {
  const { fontSize } = useAppContext();

  return (
    <div className="space-y-12 pb-12">
      {/* Introduction */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-primary">Shortest Job First (SJF)</h1>
        <p className="text-lg text-muted-foreground">
          Explore the optimal non-preemptive scheduling algorithm that minimizes average waiting time
        </p>
      </section>

      {/* Theory */}
      <section className="space-y-4 bg-muted/30 p-6 rounded-lg">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Algorithm Overview</h2>
        </div>
        <div className="space-y-3">
          <p>
            <strong>Shortest Job First (SJF)</strong> is a non-preemptive scheduling algorithm that selects the process 
            with the <strong>smallest burst time</strong> from the ready queue. It is provably optimal for minimizing 
            average waiting time among all non-preemptive scheduling algorithms.
          </p>
          <p>
            When the CPU becomes available, SJF examines all processes that have arrived and selects the one with the 
            shortest burst time. This process then runs to completion without interruption.
          </p>
          <div className="bg-background p-4 rounded border-l-4 border-primary">
            <h3 className="font-semibold mb-2">Key Characteristics:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Non-preemptive scheduling algorithm</li>
              <li>Optimal for minimizing average waiting time</li>
              <li>Requires knowing burst time in advance (theoretical limitation)</li>
              <li>Can cause starvation of longer processes</li>
              <li>Also known as Shortest Job Next (SJN)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* C Code Implementation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">C Implementation</h2>
        <CodeDisplay code={sjfCode} language="c" />
      </section>

      {/* Interactive Simulator */}
      <section className="space-y-4 bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Interactive Simulation</h2>
        <p className="text-muted-foreground">
          Step through SJF execution to understand how the shortest burst time processes are selected and executed.
        </p>
        <AlgorithmSimulator 
          algorithmType="sjf" 
          exampleProcesses={sjfExamples}
        />
      </section>

      {/* Time Complexity Analysis */}
      <section className="space-y-4 bg-muted/30 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Time Complexity Analysis</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-2">Selection Phase:</h3>
            <p>
              For each of the <code className="bg-background px-2 py-1 rounded">n</code> processes, we need to find 
              the minimum burst time among available processes. This requires scanning through the remaining processes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Worst Case Analysis:</h3>
            <p>
              First selection: scan n processes<br/>
              Second selection: scan (n-1) processes<br/>
              ...<br/>
              Last selection: scan 1 process<br/>
              Total: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2
            </p>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="font-semibold">
              Overall Time Complexity: <code className="text-xl font-bold">O(n²)</code>
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Note: Using a priority queue (min-heap) can reduce the complexity to O(n log n).
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
              <span><strong>Optimal Waiting Time:</strong> Minimizes average waiting time among non-preemptive algorithms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Better Throughput:</strong> More processes complete in less time compared to FCFS</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Efficient for Batch Systems:</strong> Works well when burst times are known</span>
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
              <span><strong>Starvation:</strong> Long processes may never execute if short processes keep arriving</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Impractical:</strong> Difficult to predict accurate burst time in real systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Higher Complexity:</strong> More complex than FCFS to implement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Unfair:</strong> Favors short processes over long ones</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-6 rounded-lg">
        <Quiz questions={sjfQuiz} algorithmName="SJF" />
      </section>
    </div>
  );
}
