import type { QuizOption, Question, Quiz, QuizResult, QuizResultsData, ApiChoice, ApiQuestion, ApiQuiz } from '../types/examinate';
import { demoQuizResultList } from '../mock-data/data';
import {courseService} from './courseService';



class ExamService {
  // In-memory storage for quiz results (replaces localStorage)
   private quizResults: Map<string, QuizResult[]> = new Map();
  private quizCache: Map<string, Quiz> = new Map();
  private apiBaseUrl: string = 'http://localhost:8080/api';

  // Map API question type to frontend question type
  private mapQuestionType(apiType: string): 'MCQ' | 'Short Answer' | 'True/False' {
    const normalizedType = apiType.toUpperCase();
    
    if (normalizedType === 'MCQ' || normalizedType === 'MULTIPLE_CHOICE') {
      return 'MCQ';
    } else if (normalizedType === 'TRUE_FALSE' || normalizedType === 'TRUEFALSE') {
      return 'True/False';
    } else if (normalizedType === 'SHORT_ANSWER' || normalizedType === 'SHORTANSWER') {
      return 'Short Answer';
    }
    
    return 'MCQ';
  }

  // Transform API choices to QuizOption
  private transformChoicesToOptions(choices: ApiChoice[]): QuizOption[] {
    return choices.map(choice => ({
      id: choice.id,
      text: choice.content
    }));
  }

  // Get correct answer from choices
  private getCorrectAnswer(choices: ApiChoice[]): string {
    const correctChoice = choices.find(c => c.correct);
    return correctChoice ? correctChoice.content : '';
  }

  // Transform API question to Question type
  private transformApiQuestion(apiQuestion: ApiQuestion): Question {
    const questionType = this.mapQuestionType(apiQuestion.questionType);
    
    return {
      id: apiQuestion.id,
      question: apiQuestion.content,
      type: questionType,
      options: apiQuestion.choices.length > 0 
        ? this.transformChoicesToOptions(apiQuestion.choices) 
        : undefined,
      correctAnswer: this.getCorrectAnswer(apiQuestion.choices),
      explanation: undefined // No explanation provided in API
    };
  }

  // Transform API response to Quiz type
  private async transformApiQuizToQuiz(apiQuiz: ApiQuiz): Promise<Quiz> {
    const transformedQuestions = apiQuiz.questions.map(q => this.transformApiQuestion(q));
    
    // Fetch course name using CourseService
    const course = await courseService.getCourseByID(apiQuiz.courseId);
    
    return {
      id: apiQuiz.id,
      title: apiQuiz.name,
      courseId: apiQuiz.courseId,
      course: course.name, // Use course name from CourseService
      totalQuestions: apiQuiz.questions.length,
      duration: 30, // Default duration in minutes - adjust or get from API if available
      createdDate: apiQuiz.createdAt,
      questions: transformedQuestions
    };
  }

  async getQuiz(quizId: string): Promise<Quiz> {
    // Check cache first
    if (this.quizCache.has(quizId)) {
      return this.quizCache.get(quizId)!;
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}/content/topics/${quizId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch quiz: ${response.status} ${response.statusText}`);
      }

      const apiQuiz: ApiQuiz = await response.json();
      const quiz = await this.transformApiQuizToQuiz(apiQuiz);
      
      // Cache the transformed quiz
      this.quizCache.set(quizId, quiz);
      
      return quiz;
    } catch (error) {
      console.error('Error fetching quiz:', error);
      throw new Error(`Unable to load quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async submitAssignment(
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