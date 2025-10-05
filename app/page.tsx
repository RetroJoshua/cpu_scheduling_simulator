
'use client';

import Link from 'next/link';
import { Clock, Zap, RotateCw, Star, BookOpen, Code, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const algorithms = [
    {
      title: 'First Come First Serve (FCFS)',
      description: 'The simplest scheduling algorithm where processes are executed in arrival order',
      icon: Clock,
      href: '/fcfs',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Shortest Job First (SJF)',
      description: 'Optimal algorithm that selects processes with the shortest burst time',
      icon: Zap,
      href: '/sjf',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Round Robin (RR)',
      description: 'Preemptive algorithm with fixed time quantum for fair CPU allocation',
      icon: RotateCw,
      href: '/round-robin',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Priority Scheduling',
      description: 'Processes are scheduled based on their priority values',
      icon: Star,
      href: '/priority',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Theory',
      description: 'Detailed explanations with time complexity analysis and real-world applications',
    },
    {
      icon: Code,
      title: 'C Code Examples',
      description: 'Complete C implementations with comments for each scheduling algorithm',
    },
    {
      icon: PlayCircle,
      title: 'Interactive Simulations',
      description: 'Step-through visualizations with custom process input and Gantt charts',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          CPU Scheduling Algorithms
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          An interactive educational platform for undergraduate computer science students to learn and 
          visualize CPU scheduling algorithms through theory, code, and hands-on simulations.
        </p>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg hover:shadow-lg transition-shadow"
          >
            <feature.icon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Algorithm Cards */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Explore Scheduling Algorithms</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {algorithms.map((algo, index) => (
            <Link
              key={index}
              href={algo.href}
              className="group block p-6 rounded-xl bg-gradient-to-br from-background to-muted/20 border-2 border-muted hover:border-primary/50 transition-all hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${algo.color} text-white`}>
                  <algo.icon className="w-8 h-8" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {algo.title}
                  </h3>
                  <p className="text-muted-foreground">{algo.description}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Learn More →
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl space-y-6">
        <h2 className="text-3xl font-bold text-center">What You'll Learn</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <p>How each algorithm selects and schedules processes</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <p>Time complexity and performance analysis</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <p>Advantages and disadvantages of each approach</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <p>Implementation in C programming language</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <p>Real-time visualization with Gantt charts</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <p>Hands-on practice with custom process inputs</p>
          </div>
        </div>
      </section>

      {/* Terminology Callout */}
      <section className="text-center space-y-4 py-8 bg-gradient-to-br from-muted/30 to-background rounded-xl p-8">
        <BookOpen className="w-16 h-16 text-primary mx-auto" />
        <h2 className="text-2xl font-semibold">New to CPU Scheduling?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start with our comprehensive terminology guide to understand key concepts like 
          Waiting Time, Turnaround Time, Burst Time, and more.
        </p>
        <Link href="/terminology">
          <Button size="lg" className="mt-4">
            Explore Terminology
          </Button>
        </Link>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4 py-8">
        <h2 className="text-2xl font-semibold">Ready to Start Learning?</h2>
        <p className="text-muted-foreground">Choose any algorithm above to begin your interactive learning journey</p>
      </section>
    </div>
  );
}
