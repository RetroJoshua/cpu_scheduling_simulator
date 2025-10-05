
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/app-context';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CPU Scheduling Algorithms Simulator',
  description: 'Interactive educational tool for learning CPU scheduling algorithms: FCFS, SJF, Round Robin, and Priority Scheduling',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="container max-w-7xl mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
