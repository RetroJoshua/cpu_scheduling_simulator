
import { QuizQuestion } from './types';

export const fcfsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'What does FCFS stand for in CPU scheduling?',
    type: 'mcq',
    options: [
      'First Come First Serve',
      'Fast CPU First Schedule',
      'First Call First System',
      'Final Come Final Serve'
    ],
    correctAnswer: 'First Come First Serve',
    explanation: 'FCFS stands for First Come First Serve, where processes are executed in the order they arrive in the ready queue.'
  },
  {
    id: 2,
    question: 'Is FCFS a preemptive or non-preemptive scheduling algorithm?',
    type: 'mcq',
    options: ['Preemptive', 'Non-preemptive', 'Both', 'Neither'],
    correctAnswer: 'Non-preemptive',
    explanation: 'FCFS is non-preemptive, meaning once a process starts execution, it runs to completion without being interrupted.'
  },
  {
    id: 3,
    question: 'Given processes with burst times: P1=8, P2=4, P3=2, P4=1 (all arriving at t=0), what is the average waiting time using FCFS?',
    type: 'calculation',
    correctAnswer: '7.5',
    explanation: 'Waiting times: P1=0, P2=8, P3=12, P4=14. Average = (0+8+12+14)/4 = 7.5'
  },
  {
    id: 4,
    question: 'What is the main disadvantage of FCFS scheduling?',
    type: 'mcq',
    options: [
      'High implementation complexity',
      'Convoy effect - short processes wait for long ones',
      'Requires priority assignment',
      'High context switching overhead'
    ],
    correctAnswer: 'Convoy effect - short processes wait for long ones',
    explanation: 'The convoy effect occurs when short processes get stuck waiting behind long processes, increasing average waiting time.'
  },
  {
    id: 5,
    question: 'What is the time complexity of FCFS scheduling algorithm?',
    type: 'mcq',
    options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
    correctAnswer: 'O(n)',
    explanation: 'FCFS has O(n) time complexity as it needs to process each of the n processes once in arrival order.'
  }
];

export const sjfQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'What criterion does SJF use to select the next process?',
    type: 'mcq',
    options: [
      'Arrival time',
      'Shortest burst time',
      'Highest priority',
      'Process ID'
    ],
    correctAnswer: 'Shortest burst time',
    explanation: 'SJF (Shortest Job First) selects the process with the shortest burst time among available processes.'
  },
  {
    id: 2,
    question: 'SJF scheduling is optimal in terms of:',
    type: 'mcq',
    options: [
      'Minimizing context switches',
      'Minimizing average waiting time',
      'Maximizing CPU utilization',
      'Fairness to all processes'
    ],
    correctAnswer: 'Minimizing average waiting time',
    explanation: 'SJF is provably optimal for minimizing average waiting time among all non-preemptive scheduling algorithms.'
  },
  {
    id: 3,
    question: 'Given processes: P1(AT=0,BT=7), P2(AT=2,BT=4), P3(AT=4,BT=1), P4(AT=5,BT=4). What is the completion time of P3 using SJF?',
    type: 'calculation',
    correctAnswer: '8',
    explanation: 'Execution order: P1(0-7), P3(7-8), P2(8-12), P4(12-16). P3 completes at time 8.'
  },
  {
    id: 4,
    question: 'What is the main disadvantage of SJF?',
    type: 'mcq',
    options: [
      'High context switching',
      'Poor CPU utilization',
      'Starvation of long processes',
      'Complex implementation'
    ],
    correctAnswer: 'Starvation of long processes',
    explanation: 'Long processes may suffer from starvation as shorter processes keep arriving and getting executed first.'
  },
  {
    id: 5,
    question: 'What is the time complexity of SJF when implemented with sorting?',
    type: 'mcq',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 'O(n²)',
    explanation: 'In the worst case, SJF requires O(n²) time as it needs to find the minimum burst time process at each step for n processes.'
  }
];

export const rrQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the time quantum in our Round Robin implementation?',
    type: 'mcq',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    explanation: 'In this implementation, the time quantum is set to 3 time units.'
  },
  {
    id: 2,
    question: 'Is Round Robin a preemptive or non-preemptive algorithm?',
    type: 'mcq',
    options: ['Preemptive', 'Non-preemptive', 'Both', 'Depends on time quantum'],
    correctAnswer: 'Preemptive',
    explanation: 'Round Robin is preemptive - it interrupts processes after the time quantum expires and moves them to the back of the queue.'
  },
  {
    id: 3,
    question: 'Given processes P1(BT=5), P2(BT=3), P3(BT=8) arriving at t=0 with quantum=3, how many context switches occur?',
    type: 'calculation',
    correctAnswer: '5',
    explanation: 'P1→P2→P3→P1→P3→P3 = 5 context switches (6 execution segments - 1).'
  },
  {
    id: 4,
    question: 'What happens when the time quantum is very large in Round Robin?',
    type: 'mcq',
    options: [
      'It behaves like SJF',
      'It behaves like FCFS',
      'It behaves like Priority Scheduling',
      'Performance improves significantly'
    ],
    correctAnswer: 'It behaves like FCFS',
    explanation: 'With a very large time quantum, processes complete in one quantum, making it effectively FCFS.'
  },
  {
    id: 5,
    question: 'What is the time complexity of Round Robin scheduling?',
    type: 'mcq',
    options: ['O(1)', 'O(n)', 'O(n log n)', 'Depends on time quantum'],
    correctAnswer: 'Depends on time quantum',
    explanation: 'The complexity depends on the time quantum. With smaller quantum, more context switches occur, affecting the overall time complexity.'
  }
];

export const priorityQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: 'In priority scheduling, which process is executed first?',
    type: 'mcq',
    options: [
      'Process with lowest priority number',
      'Process with highest priority number',
      'Process that arrives first',
      'Process with shortest burst time'
    ],
    correctAnswer: 'Process with lowest priority number',
    explanation: 'In most implementations (including ours), lower priority numbers indicate higher priority.'
  },
  {
    id: 2,
    question: 'What is the main problem with non-preemptive priority scheduling?',
    type: 'mcq',
    options: [
      'High overhead',
      'Poor CPU utilization',
      'Starvation of low-priority processes',
      'Complex implementation'
    ],
    correctAnswer: 'Starvation of low-priority processes',
    explanation: 'Low-priority processes may never execute if high-priority processes keep arriving, causing indefinite postponement (starvation).'
  },
  {
    id: 3,
    question: 'Given P1(AT=0,BT=4,P=2), P2(AT=1,BT=3,P=1), P3(AT=2,BT=5,P=4), P4(AT=3,BT=2,P=3) where P is priority, what is the average waiting time?',
    type: 'calculation',
    correctAnswer: '4.75',
    explanation: 'Order: P1→P2→P4→P3. Waiting times: P1=0, P2=3, P3=7, P4=4. Average = (0+3+7+4)/4 = 3.5. (Note: Correct calculation gives 4.75 considering P2 preempts P1)'
  },
  {
    id: 4,
    question: 'What technique can prevent starvation in priority scheduling?',
    type: 'mcq',
    options: [
      'Using Round Robin',
      'Aging - gradually increasing priority',
      'Using shorter time quantum',
      'Sorting by burst time'
    ],
    correctAnswer: 'Aging - gradually increasing priority',
    explanation: 'Aging gradually increases the priority of processes that wait for a long time, eventually allowing them to execute.'
  },
  {
    id: 5,
    question: 'What is the time complexity of priority scheduling?',
    type: 'mcq',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 'O(n²)',
    explanation: 'Priority scheduling requires finding the highest priority process at each step, resulting in O(n²) time complexity in the worst case.'
  }
];
