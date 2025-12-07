import { Routes, Route, Navigate } from "react-router-dom";

const ExaminateRoutes = () => {
  return (
    <Routes>
      <Route path="/quiz-view" element={<Navigate to="quiz-view" />} />
      <Route path="/quiz-result" element={<Navigate to="quiz-result" replace/>} />
    </Routes>
  );
};

export default ExaminateRoutes;
