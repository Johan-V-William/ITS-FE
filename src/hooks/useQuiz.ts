import { useState, useEffect } from 'react';
import { examService } from '@/services/examinateService';
import type { Quiz } from '../types/examinate';

interface UseQuizReturn {
  quiz: Quiz | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useQuiz = (quizId: string): UseQuizReturn => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await examService.getQuiz(quizId);
      setQuiz(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  return { quiz, loading, error, refetch: fetchQuiz };
};