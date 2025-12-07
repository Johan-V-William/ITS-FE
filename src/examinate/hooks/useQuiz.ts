import { useState, useEffect } from 'react';
import examApi from '../api/examApi';
import type { Quiz } from '../types/types';

interface UseQuizReturn {
  quiz: Quiz | null;
  loading: boolean;
  error: string | null;
}

export const useQuiz = (quizId: string): UseQuizReturn => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await examApi.getQuiz(quizId);
        setQuiz(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  return { quiz, loading, error };
};