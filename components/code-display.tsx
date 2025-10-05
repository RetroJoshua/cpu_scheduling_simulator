
'use client';

import { Code } from 'lucide-react';

interface CodeDisplayProps {
  code: string;
  language?: string;
}

export function CodeDisplay({ code, language = 'c' }: CodeDisplayProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Code className="w-4 h-4" />
        <span>{language.toUpperCase()} Implementation</span>
      </div>
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
