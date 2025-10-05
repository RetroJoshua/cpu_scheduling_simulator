
'use client';

import { useState } from 'react';
import { QuizQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  algorithmName: string;
}

export function Quiz({ questions, algorithmName }: QuizProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId: number, answer: string) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionId]: answer });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Please answer all questions before submitting');
      return;
    }
    setSubmitted(true);
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setSubmitted(false);
  };

  const score = questions.reduce((acc, q) => {
    return acc + (answers[q.id] === q.correctAnswer ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Quiz: {algorithmName}</h3>
        {submitted && (
          <div className="text-lg font-semibold">
            Score: <span className="text-primary">{score}/{questions.length}</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer = answers[question.id];
          const isCorrect = userAnswer === question.correctAnswer;
          const showFeedback = submitted && showResults;

          return (
            <div
              key={question.id}
              className={`p-4 rounded-lg border-2 ${
                showFeedback
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-950/20'
                  : 'border-border bg-card'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="font-bold text-lg">{index + 1}.</div>
                <div className="flex-1 space-y-3">
                  <p className="font-medium">{question.question}</p>

                  {question.type === 'mcq' && question.options ? (
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => {
                        const isSelected = userAnswer === option;
                        const isCorrectOption = option === question.correctAnswer;

                        return (
                          <label
                            key={optIndex}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                              submitted
                                ? isCorrectOption
                                  ? 'bg-green-100 dark:bg-green-900/30'
                                  : isSelected
                                  ? 'bg-red-100 dark:bg-red-900/30'
                                  : 'bg-muted/50'
                                : isSelected
                                ? 'bg-primary/10 border-2 border-primary'
                                : 'bg-muted/50 hover:bg-muted'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              checked={isSelected}
                              onChange={(e) => handleAnswer(question.id, e.target.value)}
                              disabled={submitted}
                              className="w-4 h-4"
                            />
                            <span className="flex-1">{option}</span>
                            {showFeedback && isCorrectOption && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                            {showFeedback && isSelected && !isCorrectOption && (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        value={userAnswer || ''}
                        onChange={(e) => handleAnswer(question.id, e.target.value)}
                        disabled={submitted}
                        placeholder="Enter your answer"
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                      {showFeedback && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Correct Answer: </span>
                          {question.correctAnswer}
                        </div>
                      )}
                    </div>
                  )}

                  {showFeedback && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg text-sm">
                      <div className="font-medium mb-1">Explanation:</div>
                      <div>{question.explanation}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit} size="lg">
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Quiz
          </Button>
        )}
      </div>
    </div>
  );
}
