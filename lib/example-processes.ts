
import { Process } from './types';

export const fcfsExamples: Process[] = [
  { id: 'p1', name: 'P1', arrivalTime: 0, burstTime: 4 },
  { id: 'p2', name: 'P2', arrivalTime: 1, burstTime: 3 },
  { id: 'p3', name: 'P3', arrivalTime: 2, burstTime: 1 },
  { id: 'p4', name: 'P4', arrivalTime: 3, burstTime: 5 },
];

export const sjfExamples: Process[] = [
  { id: 'p1', name: 'P1', arrivalTime: 0, burstTime: 6 },
  { id: 'p2', name: 'P2', arrivalTime: 1, burstTime: 2 },
  { id: 'p3', name: 'P3', arrivalTime: 2, burstTime: 8 },
  { id: 'p4', name: 'P4', arrivalTime: 3, burstTime: 3 },
];

export const rrExamples: Process[] = [
  { id: 'p1', name: 'P1', arrivalTime: 0, burstTime: 5 },
  { id: 'p2', name: 'P2', arrivalTime: 1, burstTime: 3 },
  { id: 'p3', name: 'P3', arrivalTime: 2, burstTime: 8 },
  { id: 'p4', name: 'P4', arrivalTime: 3, burstTime: 6 },
];

export const priorityExamples: Process[] = [
  { id: 'p1', name: 'P1', arrivalTime: 0, burstTime: 4, priority: 2 },
  { id: 'p2', name: 'P2', arrivalTime: 1, burstTime: 3, priority: 1 },
  { id: 'p3', name: 'P3', arrivalTime: 2, burstTime: 5, priority: 4 },
  { id: 'p4', name: 'P4', arrivalTime: 3, burstTime: 2, priority: 3 },
];
