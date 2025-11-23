import type { Quiz, QuizResult, QuizResultsData } from '../types/types';
import { demoQuiz, demoQuizResultList } from '../mock-data/data';

const examApi = {
  getQuiz: async (quizId: string): Promise<Quiz> => {
    // Replace with: return fetch(`/api/quizzes/${quizId}`).then(res => res.json())
    return demoQuiz as Quiz
  },

  submitQuiz: async (quizId: string, studentId: number, answers: Record<string, string>): Promise<QuizResult> => {
    // Replace with: return fetch(`/api/quizzes/${quizId}/submit`, { method: 'POST', body: JSON.stringify({ studentId, answers }) })
    const quiz = await examApi.getQuiz(quizId);
    let correctCount = 0;
    
    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    return {
      score: (correctCount / quiz.questions.length) * 100,
      correctCount,
      totalQuestions: quiz.questions.length,
      answers,
      timeSubmitted: new Date().toISOString(),
      quizId,
      studentId: studentId.toString()
    };
  },

  getQuizResults: async (quizId: string): Promise<QuizResultsData> => {
    // Replace with: return fetch(`/api/quizzes/${quizId}/results`).then(res => res.json())
    return demoQuizResultList
  }
};

export default examApi;