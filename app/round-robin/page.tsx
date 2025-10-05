
'use client';

import { useAppContext } from '@/lib/app-context';
import { AlgorithmSimulator } from '@/components/algorithm-simulator';
import { CodeDisplay } from '@/components/code-display';
import { Quiz } from '@/components/quiz';
import { rrCode } from '@/lib/code-snippets';
import { rrQuiz } from '@/lib/quiz-data';
import { rrExamples } from '@/lib/example-processes';
import { RotateCw, CheckCircle, XCircle } from 'lucide-react';

export default function RoundRobinPage() {
  const { fontSize } = useAppContext();

  return (
    <div className="space-y-12 pb-12">
      {/* Introduction */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-primary">Round Robin (RR)</h1>
        <p className="text-lg text-muted-foreground">
          Learn about the preemptive scheduling algorithm designed for time-sharing systems with a time quantum of 3
        </p>
      </section>

      {/* Theory */}
      <section className="space-y-4 bg-muted/30 p-6 rounded-lg">
        <div className="flex items-center gap-3">
          <RotateCw className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Algorithm Overview</h2>
        </div>
        <div className="space-y-3">
          <p>
            <strong>Round Robin (RR)</strong> is a preemptive scheduling algorithm designed specifically for time-sharing systems. 
            Each process is assigned a fixed time slice called a <strong>time quantum</strong> (in our implementation, 3 time units).
          </p>
          <p>
            The ready queue is treated as a circular queue. When a process's time quantum expires, it is preempted and moved 
            to the back of the ready queue. The CPU then switches to the next process in the queue.
          </p>
          <div className="bg-background p-4 rounded border-l-4 border-primary">
            <h3 className="font-semibold mb-2">Key Characteristics:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Preemptive scheduling algorithm</li>
              <li>Fixed time quantum (3 units in our implementation)</li>
              <li>Circular ready queue (FIFO order)</li>
              <li>Fair CPU allocation to all processes</li>
              <li>No starvation - every process gets CPU time</li>
              <li>Performance depends on time quantum size</li>
            </ul>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-semibold mb-2">Time Quantum Selection:</h3>
            <p className="text-sm">
              • <strong>Too small:</strong> High context switching overhead<br/>
              • <strong>Too large:</strong> Degenerates to FCFS<br/>
              • <strong>Optimal:</strong> Typically 10-100ms in real systems; we use 3 units for educational purposes
            </p>
          </div>
        </div>
      </section>

      {/* C Code Implementation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">C Implementation</h2>
        <CodeDisplay code={rrCode} language="c" />
      </section>

      {/* Interactive Simulator */}
      <section className="space-y-4 bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Interactive Simulation</h2>
        <p className="text-muted-foreground">
          Step through Round Robin execution to see how processes are preempted after the time quantum expires (3 units).
        </p>
        <AlgorithmSimulator 
          algorithmType="rr" 
          exampleProcesses={rrExamples}
        />
      </section>

      {/* Time Complexity Analysis */}
      <section className="space-y-4 bg-muted/30 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Time Complexity Analysis</h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg mb-2">Queue Operations:</h3>
            <p>
              Each process is enqueued and dequeued multiple times. In the worst case, a process with burst time B 
              is enqueued <code className="bg-background px-2 py-1 rounded">B/Q</code> times, where Q is the time quantum.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Total Operations:</h3>
            <p>
              For n processes with total burst time T and time quantum Q:<br/>
              Number of context switches ≈ <code className="bg-background px-2 py-1 rounded">T/Q</code><br/>
              Each context switch involves O(1) queue operations
            </p>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="font-semibold">
              Overall Time Complexity: <code className="text-xl font-bold">O(n) to O(T/Q)</code>
            </p>
            <p className="text-sm mt-2">
              Where T is total burst time and Q is time quantum. Depends on the relationship between quantum size and burst times.
            </p>
          </div>
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
              <span><strong>Fair Allocation:</strong> Every process gets equal CPU time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>No Starvation:</strong> All processes eventually execute</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Good Response Time:</strong> Excellent for interactive systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Time-Sharing:</strong> Ideal for multi-user systems</span>
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
              <span><strong>Context Switching Overhead:</strong> Frequent switching increases overhead</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Higher Waiting Time:</strong> Not optimal for minimizing average waiting time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Quantum Selection:</strong> Performance heavily depends on choosing correct quantum</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Lower Throughput:</strong> More context switches mean less actual work done</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-6 rounded-lg">
        <Quiz questions={rrQuiz} algorithmName="Round Robin" />
      </section>
    </div>
  );
}
