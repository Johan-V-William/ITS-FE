import { useState, useEffect } from 'react';
import { QuizIntro } from './QuizIntro';
import { QuizTaking } from './QuizTaking';
import { QuizResult } from './QuizResult';
import { useQuizState } from '../../hooks/useQuizState';
import { useQuizTimer } from '../../hooks/useTimer';
import { mockQuiz, mockQuestions, mockUser } from '../../mock-data/student_quizzes';
import type { QuizResult as QuizResultType } from '../../types/student';

type QuizStage = 'intro' | 'taking' | 'result';

export const QuizController = () => {
  const [stage, setStage] = useState<QuizStage>('intro');
  const [quizResult, setQuizResult] = useState<QuizResultType | null>(null);

  const {
    currentQuestion,
    currentQuestionIndex,
    answers,
    setAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    getProgress,
  } = useQuizState(mockQuestions);

  const handleTimeUp = () => {
    handleSubmitQuiz();
  };

  const { formattedTime, pause } = useQuizTimer(mockQuiz.duration, handleTimeUp);

  const handleStartQuiz = () => {
    setStage('taking');
  };

  const handleSubmitQuiz = () => {
    pause();

    let correctCount = 0;
    mockQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / mockQuestions.length) * 100);
    const timeSpent = mockQuiz.duration - Math.floor(parseInt(formattedTime.split(':')[0]));

    const mcqQuestions = mockQuestions.filter((q) => q.type === 'MCQ');
    const mcqCorrect = mcqQuestions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;

    const tfQuestions = mockQuestions.filter((q) => q.type === 'TRUE_FALSE');
    const tfCorrect = tfQuestions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;

    const saQuestions = mockQuestions.filter((q) => q.type === 'SHORT_ANSWER');
    const saCorrect = saQuestions.filter(
      (q) => answers[q.id] === q.correctAnswer
    ).length;

    const result: QuizResultType = {
      attempt: {
        id: 'attempt-1',
        quizId: mockQuiz.id,
        userId: mockUser.id,
        startTime: new Date().toISOString(),
        endTime: '15/10/2024, 15:23',
        answers,
        score: percentage,
        percentage,
        timeSpent,
      },
      quiz: mockQuiz,
      questions: mockQuestions,
      correctCount,
      incorrectCount: mockQuestions.length - correctCount,
      timeSpent,
      percentage,
      feedback: {
        strengths: [
          'Nắm vững khái niệm về lớp và đối tượng',
          'Hiểu rõ về tính đóng gói',
          'Áp dụng tốt các access modifier',
        ],
        weaknesses: [
          'Cần xem lại phần kế thừa',
          'Chưa hiểu rõ về bộ nhớ JVM',
          'Cần ôn lại về constructor',
        ],
      },
      questionStats: [
        {
          type: 'Trắc nghiệm (MCQ)',
          total: mcqQuestions.length,
          correct: mcqCorrect,
          percentage: Math.round((mcqCorrect / mcqQuestions.length) * 100),
        },
        {
          type: 'Đúng/Sai',
          total: tfQuestions.length,
          correct: tfCorrect,
          percentage: Math.round((tfCorrect / tfQuestions.length) * 100),
        },
        {
          type: 'Tự luận ngắn',
          total: saQuestions.length,
          correct: saCorrect,
          percentage: saQuestions.length > 0 ? Math.round((saCorrect / saQuestions.length) * 100) : 0,
        },
      ],
    };

    setQuizResult(result);
    setStage('result');
  };

  const handleBackToCourse = () => {
    console.log('Navigate back to course');
  };

  const handleViewDetails = () => {
    console.log('View quiz details');
  };

  if (stage === 'intro') {
    return (
      <QuizIntro
        quiz={mockQuiz}
        student={mockUser}
        onStartQuiz={handleStartQuiz}
        onBackToCourse={handleBackToCourse}
      />
    );
  }

  if (stage === 'taking') {
    return (
      <QuizTaking
        quiz={mockQuiz}
        questions={mockQuestions}
        student={mockUser}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        timeRemaining={formattedTime}
        onAnswerSelect={setAnswer}
        onGoToQuestion={goToQuestion}
        onNext={nextQuestion}
        onPrevious={previousQuestion}
        onSubmit={handleSubmitQuiz}
      />
    );
  }

  if (stage === 'result' && quizResult) {
    return (
      <QuizResult
        result={quizResult}
        student={mockUser}
        onBackToCourse={handleBackToCourse}
        onViewDetails={handleViewDetails}
      />
    );
  }

  return null;
};
