
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/lib/app-context';
import { Moon, Sun, ZoomIn, ZoomOut, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme, increaseFontSize, decreaseFontSize } = useAppContext();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/terminology', label: 'Terminology' },
    { href: '/fcfs', label: 'FCFS' },
    { href: '/sjf', label: 'SJF' },
    { href: '/round-robin', label: 'Round Robin' },
    { href: '/priority', label: 'Priority' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Cpu className="w-6 h-6 text-primary" />
          <span>CPU Scheduler</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-md transition-colors ${
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={decreaseFontSize}
            title="Decrease font size"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={increaseFontSize}
            title="Increase font size"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <nav className="container max-w-7xl mx-auto flex overflow-x-auto px-4 py-2 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1 rounded-md whitespace-nowrap text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
