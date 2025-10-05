
export const fcfsCode = `// FCFS (First Come First Serve) Scheduling in C

#include <stdio.h>

struct Process {
    int id;
    int arrivalTime;
    int burstTime;
    int completionTime;
    int turnaroundTime;
    int waitingTime;
};

void calculateTimes(struct Process proc[], int n) {
    int currentTime = 0;
    
    for (int i = 0; i < n; i++) {
        // If CPU is idle, jump to next arrival
        if (currentTime < proc[i].arrivalTime) {
            currentTime = proc[i].arrivalTime;
        }
        
        // Calculate times
        proc[i].completionTime = currentTime + proc[i].burstTime;
        proc[i].turnaroundTime = proc[i].completionTime - proc[i].arrivalTime;
        proc[i].waitingTime = proc[i].turnaroundTime - proc[i].burstTime;
        
        currentTime = proc[i].completionTime;
    }
}

void fcfsScheduling(struct Process proc[], int n) {
    // Sort by arrival time
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (proc[j].arrivalTime > proc[j+1].arrivalTime) {
                struct Process temp = proc[j];
                proc[j] = proc[j+1];
                proc[j+1] = temp;
            }
        }
    }
    
    calculateTimes(proc, n);
}

int main() {
    struct Process proc[] = {
        {1, 0, 4}, {2, 1, 3}, {3, 2, 1}, {4, 3, 5}
    };
    int n = sizeof(proc) / sizeof(proc[0]);
    
    fcfsScheduling(proc, n);
    
    printf("Process\\tAT\\tBT\\tCT\\tTAT\\tWT\\n");
    float totalWT = 0, totalTAT = 0;
    
    for (int i = 0; i < n; i++) {
        printf("P%d\\t%d\\t%d\\t%d\\t%d\\t%d\\n",
               proc[i].id, proc[i].arrivalTime, proc[i].burstTime,
               proc[i].completionTime, proc[i].turnaroundTime,
               proc[i].waitingTime);
        totalWT += proc[i].waitingTime;
        totalTAT += proc[i].turnaroundTime;
    }
    
    printf("\\nAverage Waiting Time: %.2f\\n", totalWT / n);
    printf("Average Turnaround Time: %.2f\\n", totalTAT / n);
    
    return 0;
}`;

export const sjfCode = `// SJF (Shortest Job First) Scheduling in C

#include <stdio.h>
#include <limits.h>

struct Process {
    int id;
    int arrivalTime;
    int burstTime;
    int completionTime;
    int turnaroundTime;
    int waitingTime;
    int isCompleted;
};

void sjfScheduling(struct Process proc[], int n) {
    int currentTime = 0;
    int completed = 0;
    
    while (completed < n) {
        int shortest = -1;
        int minBurst = INT_MAX;
        
        // Find process with shortest burst time
        for (int i = 0; i < n; i++) {
            if (proc[i].arrivalTime <= currentTime && 
                !proc[i].isCompleted &&
                proc[i].burstTime < minBurst) {
                minBurst = proc[i].burstTime;
                shortest = i;
            }
        }
        
        if (shortest == -1) {
            // No process available, CPU idle
            currentTime++;
            continue;
        }
        
        // Execute the shortest process
        proc[shortest].completionTime = currentTime + proc[shortest].burstTime;
        proc[shortest].turnaroundTime = proc[shortest].completionTime - 
                                        proc[shortest].arrivalTime;
        proc[shortest].waitingTime = proc[shortest].turnaroundTime - 
                                     proc[shortest].burstTime;
        proc[shortest].isCompleted = 1;
        
        currentTime = proc[shortest].completionTime;
        completed++;
    }
}

int main() {
    struct Process proc[] = {
        {1, 0, 6, 0, 0, 0, 0},
        {2, 1, 2, 0, 0, 0, 0},
        {3, 2, 8, 0, 0, 0, 0},
        {4, 3, 3, 0, 0, 0, 0}
    };
    int n = sizeof(proc) / sizeof(proc[0]);
    
    sjfScheduling(proc, n);
    
    printf("Process\\tAT\\tBT\\tCT\\tTAT\\tWT\\n");
    float totalWT = 0, totalTAT = 0;
    
    for (int i = 0; i < n; i++) {
        printf("P%d\\t%d\\t%d\\t%d\\t%d\\t%d\\n",
               proc[i].id, proc[i].arrivalTime, proc[i].burstTime,
               proc[i].completionTime, proc[i].turnaroundTime,
               proc[i].waitingTime);
        totalWT += proc[i].waitingTime;
        totalTAT += proc[i].turnaroundTime;
    }
    
    printf("\\nAverage Waiting Time: %.2f\\n", totalWT / n);
    printf("Average Turnaround Time: %.2f\\n", totalTAT / n);
    
    return 0;
}`;

export const rrCode = `// Round Robin Scheduling in C

#include <stdio.h>

#define TIME_QUANTUM 3

struct Process {
    int id;
    int arrivalTime;
    int burstTime;
    int remainingTime;
    int completionTime;
    int turnaroundTime;
    int waitingTime;
};

void roundRobinScheduling(struct Process proc[], int n) {
    int currentTime = 0;
    int completed = 0;
    int queue[100], front = 0, rear = 0;
    int inQueue[100] = {0};
    
    // Add first process
    queue[rear++] = 0;
    inQueue[0] = 1;
    
    while (completed < n) {
        if (front == rear) {
            // Queue empty, advance time
            currentTime++;
            for (int i = 0; i < n; i++) {
                if (proc[i].arrivalTime <= currentTime && 
                    proc[i].remainingTime > 0 && !inQueue[i]) {
                    queue[rear++] = i;
                    inQueue[i] = 1;
                }
            }
            continue;
        }
        
        int idx = queue[front++];
        inQueue[idx] = 0;
        
        int execTime = (proc[idx].remainingTime > TIME_QUANTUM) ? 
                       TIME_QUANTUM : proc[idx].remainingTime;
        
        proc[idx].remainingTime -= execTime;
        currentTime += execTime;
        
        // Add newly arrived processes
        for (int i = 0; i < n; i++) {
            if (proc[i].arrivalTime <= currentTime && 
                proc[i].remainingTime > 0 && 
                !inQueue[i] && i != idx) {
                queue[rear++] = i;
                inQueue[i] = 1;
            }
        }
        
        if (proc[idx].remainingTime > 0) {
            queue[rear++] = idx;
            inQueue[idx] = 1;
        } else {
            proc[idx].completionTime = currentTime;
            proc[idx].turnaroundTime = proc[idx].completionTime - 
                                       proc[idx].arrivalTime;
            proc[idx].waitingTime = proc[idx].turnaroundTime - 
                                    proc[idx].burstTime;
            completed++;
        }
    }
}

int main() {
    struct Process proc[] = {
        {1, 0, 5, 5}, {2, 1, 3, 3}, 
        {3, 2, 8, 8}, {4, 3, 6, 6}
    };
    int n = sizeof(proc) / sizeof(proc[0]);
    
    roundRobinScheduling(proc, n);
    
    printf("Process\\tAT\\tBT\\tCT\\tTAT\\tWT\\n");
    float totalWT = 0, totalTAT = 0;
    
    for (int i = 0; i < n; i++) {
        printf("P%d\\t%d\\t%d\\t%d\\t%d\\t%d\\n",
               proc[i].id, proc[i].arrivalTime, proc[i].burstTime,
               proc[i].completionTime, proc[i].turnaroundTime,
               proc[i].waitingTime);
        totalWT += proc[i].waitingTime;
        totalTAT += proc[i].turnaroundTime;
    }
    
    printf("\\nAverage Waiting Time: %.2f\\n", totalWT / n);
    printf("Average Turnaround Time: %.2f\\n", totalTAT / n);
    
    return 0;
}`;

export const priorityCode = `// Priority Scheduling in C

#include <stdio.h>
#include <limits.h>

struct Process {
    int id;
    int arrivalTime;
    int burstTime;
    int priority;
    int completionTime;
    int turnaroundTime;
    int waitingTime;
    int isCompleted;
};

void priorityScheduling(struct Process proc[], int n) {
    int currentTime = 0;
    int completed = 0;
    
    while (completed < n) {
        int highest = -1;
        int highestPriority = INT_MAX;
        
        // Find process with highest priority (lowest number)
        for (int i = 0; i < n; i++) {
            if (proc[i].arrivalTime <= currentTime && 
                !proc[i].isCompleted &&
                proc[i].priority < highestPriority) {
                highestPriority = proc[i].priority;
                highest = i;
            }
        }
        
        if (highest == -1) {
            currentTime++;
            continue;
        }
        
        // Execute the highest priority process
        proc[highest].completionTime = currentTime + proc[highest].burstTime;
        proc[highest].turnaroundTime = proc[highest].completionTime - 
                                       proc[highest].arrivalTime;
        proc[highest].waitingTime = proc[highest].turnaroundTime - 
                                    proc[highest].burstTime;
        proc[highest].isCompleted = 1;
        
        currentTime = proc[highest].completionTime;
        completed++;
    }
}

int main() {
    struct Process proc[] = {
        {1, 0, 4, 2, 0, 0, 0, 0},
        {2, 1, 3, 1, 0, 0, 0, 0},
        {3, 2, 5, 4, 0, 0, 0, 0},
        {4, 3, 2, 3, 0, 0, 0, 0}
    };
    int n = sizeof(proc) / sizeof(proc[0]);
    
    priorityScheduling(proc, n);
    
    printf("Process\\tAT\\tBT\\tPriority\\tCT\\tTAT\\tWT\\n");
    float totalWT = 0, totalTAT = 0;
    
    for (int i = 0; i < n; i++) {
        printf("P%d\\t%d\\t%d\\t%d\\t\\t%d\\t%d\\t%d\\n",
               proc[i].id, proc[i].arrivalTime, proc[i].burstTime,
               proc[i].priority, proc[i].completionTime,
               proc[i].turnaroundTime, proc[i].waitingTime);
        totalWT += proc[i].waitingTime;
        totalTAT += proc[i].turnaroundTime;
    }
    
    printf("\\nAverage Waiting Time: %.2f\\n", totalWT / n);
    printf("Average Turnaround Time: %.2f\\n", totalTAT / n);
    
    return 0;
}`;
