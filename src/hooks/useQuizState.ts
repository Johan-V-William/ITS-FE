import { useState, useCallback } from 'react';
import type { Question } from '../types/student';

export const useQuizState = (questions: Question[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentQuestionIndex];

  const setAnswer = useCallback((questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  }, []);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  }, [questions.length]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const getProgress = useCallback(() => {
    const answeredCount = Object.keys(answers).length;
    return {
      answeredCount,
      totalCount: questions.length,
      percentage: Math.round((answeredCount / questions.length) * 100),
    };
  }, [answers, questions.length]);

  const isQuestionAnswered = useCallback((questionId: string) => {
    return questionId in answers;
  }, [answers]);

  return {
    currentQuestion,
    currentQuestionIndex,
    answers,
    setAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    getProgress,
    isQuestionAnswered,
  };
};