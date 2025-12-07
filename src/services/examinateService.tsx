import type { Quiz, QuizResult, QuizResultsData } from '../pages/Examinate/types';
import { demoQuiz, demoQuizResultList } from '../mock-data/data';

class ExamService {
  // In-memory storage for quiz results (replaces localStorage)
  private quizResults: Map<string, QuizResult[]> = new Map();
  private quizCache: Map<string, Quiz> = new Map();

  async getQuiz(quizId: string): Promise<Quiz> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check cache first
    if (this.quizCache.has(quizId)) {
      return this.quizCache.get(quizId)!;
    }

    // In production: return fetch(`/api/quizzes/${quizId}`).then(res => res.json())
    const quiz = demoQuiz as Quiz;
    this.quizCache.set(quizId, quiz);
    return quiz;
  }

  async submitQuiz(
    quizId: string, 
    studentId: number, 
    answers: Record<string, string>
  ): Promise<QuizResult> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // In production: 
    // return fetch(`/api/quizzes/${quizId}/submit`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ studentId, answers })
    // }).then(res => res.json())

    const quiz = await this.getQuiz(quizId);
    let correctCount = 0;
    
    quiz.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const result: QuizResult = {
      score: (correctCount / quiz.questions.length) * 100,
      correctCount,
      totalQuestions: quiz.questions.length,
      answers,
      timeSubmitted: new Date().toISOString(),
      quizId,
      studentId: studentId.toString()
    };

    // Store result in memory
    const results = this.quizResults.get(quizId) || [];
    results.push(result);
    this.quizResults.set(quizId, results);

    return result;
  }

  async getQuizResults(quizId: string): Promise<QuizResultsData> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // In production: return fetch(`/api/quizzes/${quizId}/results`).then(res => res.json())
    return demoQuizResultList;
  }

  async getStudentResults(quizId: string, studentId: string): Promise<QuizResult[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Get results from in-memory storage
    const allResults = this.quizResults.get(quizId) || [];
    return allResults.filter(result => result.studentId === studentId);
  }

  clearCache(): void {
    this.quizCache.clear();
  }

  clearResults(quizId?: string): void {
    if (quizId) {
      this.quizResults.delete(quizId);
    } else {
      this.quizResults.clear();
    }
  }

  // Get all stored results (useful for testing/debugging)
  getAllResults(): Map<string, QuizResult[]> {
    return new Map(this.quizResults);
  }
}

export const examService = new ExamService();

export default ExamService;