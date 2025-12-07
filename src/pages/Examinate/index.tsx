import React, { useState } from 'react';
import QuizViewPage from './QuizViewPage';
import QuizResultPage from './QuizResultPage';
import Header from '@/components/HeaderPage';
import Footer from '@/components/FooterPage';
import type { QuizResult, Student } from '../../types/examinate';
import {demoStudent, demoQuizResult} from '../../mock-data/data';


const ExaminatePage: React.FC = (course) => {
  const [quizResult] = useState<QuizResult>(demoQuizResult);

  const [student] = useState<Student>(demoStudent);

  return (
    <div className="min-h-screen w-full">
      <Header />
        <QuizViewPage quizId="bbc3bc8e-b264-40c5-a080-5f487a31e2fe" />
        {/* <QuizResultPage quizId="quiz-1" result={quizResult} student={student} /> */}
      <Footer />
    </div>
  );
};

export default ExaminatePage;