
'use client';

import { Book, Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface Term {
  term: string;
  definition: string;
  formula?: string;
  category: string;
}

export default function TerminologyPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const terms: Term[] = [
    {
      term: 'Arrival Time (AT)',
      definition: 'The time at which a process enters the ready queue and is ready to be executed by the CPU. It is the starting point for scheduling decisions.',
      category: 'Time Metrics',
    },
    {
      term: 'Burst Time (BT)',
      definition: 'The total time required by a process for CPU execution. Also known as execution time or CPU time. This represents the actual time the process needs to complete its task.',
      category: 'Time Metrics',
    },
    {
      term: 'Completion Time (CT)',
      definition: 'The time at which a process finishes its execution and leaves the CPU. It marks the end of the process lifecycle in the scheduler.',
      category: 'Time Metrics',
    },
    {
      term: 'Turnaround Time (TAT)',
      definition: 'The total time taken from the arrival of a process to its completion. It includes waiting time, burst time, and any context switching overhead.',
      formula: 'TAT = Completion Time - Arrival Time',
      category: 'Time Metrics',
    },
    {
      term: 'Waiting Time (WT)',
      definition: 'The total time a process spends in the ready queue waiting for CPU allocation. This does not include the actual execution time.',
      formula: 'WT = Turnaround Time - Burst Time',
      category: 'Time Metrics',
    },
    {
      term: 'Response Time (RT)',
      definition: 'The time from the arrival of a process until it gets the CPU for the first time. Important for interactive systems where quick response is needed.',
      formula: 'RT = Time of First CPU Allocation - Arrival Time',
      category: 'Time Metrics',
    },
    {
      term: 'CPU Utilization',
      definition: 'The percentage of time the CPU is busy executing processes. Higher utilization indicates efficient use of CPU resources.',
      formula: 'CPU Utilization = (Total Burst Time / Total Time) × 100%',
      category: 'Performance Metrics',
    },
    {
      term: 'Throughput',
      definition: 'The number of processes completed per unit time. Higher throughput indicates better system performance.',
      formula: 'Throughput = Number of Processes / Total Time',
      category: 'Performance Metrics',
    },
    {
      term: 'Context Switch',
      definition: 'The process of saving the state of a currently running process and loading the state of the next process to be executed. Context switching introduces overhead.',
      category: 'Scheduling Concepts',
    },
    {
      term: 'Time Quantum (Time Slice)',
      definition: 'A fixed time unit allocated to each process in Round Robin scheduling. When the time quantum expires, the process is preempted and moved to the back of the ready queue.',
      category: 'Scheduling Concepts',
    },
    {
      term: 'Priority',
      definition: 'A numerical value assigned to each process indicating its importance or urgency. Lower numerical values typically indicate higher priority (or vice versa depending on convention).',
      category: 'Scheduling Concepts',
    },
    {
      term: 'Preemption',
      definition: 'The ability of the scheduler to forcibly remove a running process from the CPU before it completes. Preemptive algorithms can interrupt processes, while non-preemptive algorithms cannot.',
      category: 'Scheduling Concepts',
    },
    {
      term: 'Ready Queue',
      definition: 'A data structure that holds all processes that are ready to execute and waiting for CPU allocation. The scheduling algorithm determines which process to select from this queue.',
      category: 'Scheduling Concepts',
    },
    {
      term: 'Process',
      definition: 'A program in execution. Each process has attributes like process ID, arrival time, burst time, priority, and state (ready, running, waiting, terminated).',
      category: 'Basic Concepts',
    },
    {
      term: 'Gantt Chart',
      definition: 'A visual representation showing the execution timeline of processes. It displays which process is using the CPU at any given time, making it easy to understand scheduling behavior.',
      category: 'Visualization',
    },
    {
      term: 'Convoy Effect',
      definition: 'A scheduling problem where smaller processes wait for a long process to complete, reducing overall system efficiency. Common in FCFS scheduling.',
      category: 'Scheduling Problems',
    },
    {
      term: 'Starvation',
      definition: 'A situation where a process waits indefinitely because other processes with higher priority keep arriving. Low-priority processes may never get CPU time.',
      category: 'Scheduling Problems',
    },
    {
      term: 'Aging',
      definition: 'A technique to prevent starvation by gradually increasing the priority of processes that have been waiting for a long time.',
      category: 'Solutions',
    },
    {
      term: 'Average Waiting Time',
      definition: 'The mean waiting time of all processes in the system. A lower average waiting time indicates better scheduling performance.',
      formula: 'Avg WT = (Sum of all Waiting Times) / Number of Processes',
      category: 'Performance Metrics',
    },
    {
      term: 'Average Turnaround Time',
      definition: 'The mean turnaround time of all processes in the system. Used as a key metric to evaluate scheduling algorithm efficiency.',
      formula: 'Avg TAT = (Sum of all Turnaround Times) / Number of Processes',
      category: 'Performance Metrics',
    },
    {
      term: 'Non-Preemptive Scheduling',
      definition: 'A scheduling approach where once a process starts executing, it runs until completion or until it voluntarily releases the CPU (e.g., for I/O).',
      category: 'Scheduling Types',
    },
    {
      term: 'Preemptive Scheduling',
      definition: 'A scheduling approach where the operating system can interrupt a running process and allocate the CPU to another process based on scheduling criteria.',
      category: 'Scheduling Types',
    },
  ];

  const filteredTerms = terms.filter(
    (term) =>
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(terms.map((t) => t.category)));

  return (
    <div className="space-y-8 pb-16">
      {/* Header Section */}
      <section className="text-center space-y-4 pt-8">
        <div className="flex items-center justify-center gap-3">
          <Book className="w-12 h-12 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            CPU Scheduling Terminology
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Master the essential terminology and concepts used in CPU scheduling algorithms. 
          Understanding these terms is crucial for analyzing and implementing scheduling strategies.
        </p>
      </section>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search terminology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-6 text-lg"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Terms by Category */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryTerms = filteredTerms.filter((t) => t.category === category);
          if (categoryTerms.length === 0) return null;

          return (
            <section key={category} className="space-y-4">
              <h2 className="text-2xl font-bold text-primary border-b pb-2">
                {category}
              </h2>
              <div className="grid gap-4">
                {categoryTerms.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg border border-muted hover:border-primary/50 transition-all hover:shadow-lg"
                  >
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      {item.term}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {item.definition}
                    </p>
                    {item.formula && (
                      <div className="mt-4 p-4 bg-background/50 rounded border border-primary/20">
                        <p className="text-sm font-semibold text-muted-foreground mb-1">
                          Formula:
                        </p>
                        <code className="text-base font-mono text-primary">
                          {item.formula}
                        </code>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* No Results */}
      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            No terms found matching "{searchQuery}"
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try a different search term or browse all categories
          </p>
        </div>
      )}

      {/* Quick Reference Card */}
      <section className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl space-y-4">
        <h2 className="text-2xl font-bold text-center">Quick Reference Formulas</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="p-4 bg-background/80 rounded-lg">
            <p className="font-semibold mb-2">Turnaround Time:</p>
            <code className="text-primary">TAT = CT - AT</code>
          </div>
          <div className="p-4 bg-background/80 rounded-lg">
            <p className="font-semibold mb-2">Waiting Time:</p>
            <code className="text-primary">WT = TAT - BT</code>
          </div>
          <div className="p-4 bg-background/80 rounded-lg">
            <p className="font-semibold mb-2">Response Time:</p>
            <code className="text-primary">RT = First CPU Time - AT</code>
          </div>
          <div className="p-4 bg-background/80 rounded-lg">
            <p className="font-semibold mb-2">Average WT:</p>
            <code className="text-primary">Avg WT = Σ(WT) / n</code>
          </div>
        </div>
      </section>
    </div>
  );
}
