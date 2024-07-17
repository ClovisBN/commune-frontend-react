import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Templates from "./components/Templates";
import QuestionUI from "./components/QuestionUI";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Templates />} />
        <Route path="/documents/:id" element={<QuestionUI />} />
      </Routes>
    </Router>
  );
};

export default App;
