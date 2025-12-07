import React, { useState } from 'react';
import QuizViewPage from './QuizViewPage';
import QuizResultPage from './QuizResultPage';
import Header from '@/components/HeaderPage';
import Footer from '@/components/FooterPage';
import type { QuizResult, Student } from './types';
import {demoStudent, demoQuizResult} from '../../mock-data/data';


const ExaminatePage: React.FC = () => {
  const [quizResult] = useState<QuizResult>(demoQuizResult);

  const [student] = useState<Student>(demoStudent);

  return (
    <div className="min-h-screen w-full">
      <Header />

        <QuizViewPage quizId="quiz-1" />
      

        {/* <QuizResultPage quizId="quiz-1" result={quizResult} student={student} /> */}

      <Footer />
    </div>
  );
};

export default ExaminatePage;