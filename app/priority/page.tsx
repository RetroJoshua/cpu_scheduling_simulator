
'use client';

import { useAppContext } from '@/lib/app-context';
import { AlgorithmSimulator } from '@/components/algorithm-simulator';
import { CodeDisplay } from '@/components/code-display';
import { Quiz } from '@/components/quiz';
import { priorityCode } from '@/lib/code-snippets';
import { priorityQuiz } from '@/lib/quiz-data';
import { priorityExamples } from '@/lib/example-processes';
import { Star, CheckCircle, XCircle } from 'lucide-react';

export default function PriorityPage() {
  const { fontSize } = useAppContext();

  return (
    <div className="space-y-12 pb-12">
      {/* Introduction */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-primary">Priority Scheduling</h1>
        <p className="text-lg text-muted-foreground">
          Understand how processes are scheduled based on priority values, where lower numbers indicate higher priority
        </p>
      </section>

      {/* Theory */}
      <section className="space-y-4 bg-muted/30 p-6 rounded-lg">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Algorithm Overview</h2>
        </div>
        <div className="space-y-3">
          <p>
            <strong>Priority Scheduling</strong> assigns a priority value to each process, and the CPU executes 
            processes in order of their priority. In our implementation, <strong>lower priority numbers indicate 
            higher priority</strong> (priority 1 is highest, priority 2 is lower, etc.).
          </p>
          <p>
            When the CPU becomes available, the scheduler selects the process with the highest priority (lowest number) 
            from the ready queue. This can be implemented as either preemptive or non-preemptive; our implementation 
            is <strong>non-preemptive</strong>.
          </p>
          <div className="bg-background p-4 rounded border-l-4 border-primary">
            <h3 className="font-semibold mb-2">Key Characteristics:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Non-preemptive scheduling (in our implementation)</li>
              <li>Lower priority number = Higher priority</li>
              <li>Processes with same priority can use FCFS</li>
              <li>Can cause indefinite blocking (starvation)</li>
              <li>Priority can be static or dynamic</li>
            </ul>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-semibold mb-2">Starvation Problem & Solution:</h3>
            <p className="text-sm">
              <strong>Problem:</strong> Low-priority processes may never execute if high-priority processes keep arriving.<br/><br/>
              <strong>Solution - Aging:</strong> Gradually increase the priority of processes that wait for a long time. 
              This ensures that even low-priority processes eventually get CPU time.
            </p>
          </div>
        </div>
      </section>

      {/* C Code Implementation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">C Implementation</h2>
        <CodeDisplay code={priorityCode} language="c" />
      </section>

      {/* Interactive Simulator */}
      <section className="space-y-4 bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Interactive Simulation</h2>
        <p className="text-muted-foreground">
          Step through Priority Scheduling to see how processes are selected based on their priority values. 
          Remember: lower numbers = higher priority!
        </p>
        <AlgorithmSimulator 
          algorithmType="priority" 
          exampleProcesses={priorityExamples}
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
              the process with highest priority (lowest priority number) among available processes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Worst Case Analysis:</h3>
            <p>
              Similar to SJF, finding the highest priority process requires scanning:<br/>
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
            Note: Using a priority queue (max-heap for priority) can optimize this to O(n log n).
          </p>
        </div>
      </section>

      {/* Priority Assignment Methods */}
      <section className="space-y-4 bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold">Priority Assignment Methods</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-background p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Internal Priorities</h3>
            <p className="text-sm">Determined by the system based on:</p>
            <ul className="list-disc list-inside text-sm space-y-1 mt-2">
              <li>Memory requirements</li>
              <li>Number of open files</li>
              <li>CPU time used</li>
              <li>I/O to CPU time ratio</li>
            </ul>
          </div>
          <div className="bg-background p-4 rounded-lg">
            <h3 className="font-semibold mb-2">External Priorities</h3>
            <p className="text-sm">Set by factors outside the OS:</p>
            <ul className="list-disc list-inside text-sm space-y-1 mt-2">
              <li>Process importance</li>
              <li>User privileges</li>
              <li>Department/organization rules</li>
              <li>Payment for CPU time</li>
            </ul>
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
              <span><strong>Flexible:</strong> Can accommodate different process importance levels</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Critical Tasks:</strong> Important processes get CPU time quickly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Real-World Applicability:</strong> Reflects real-world task importance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span><strong>Customizable:</strong> Priorities can be adjusted based on system needs</span>
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
              <span><strong>Starvation:</strong> Low-priority processes may never execute</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Complexity:</strong> More complex than FCFS or SJF</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Priority Assignment:</strong> Difficult to determine optimal priorities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span><strong>Unfair:</strong> Lower priority processes wait longer</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 p-6 rounded-lg">
        <Quiz questions={priorityQuiz} algorithmName="Priority Scheduling" />
      </section>
    </div>
  );
}
