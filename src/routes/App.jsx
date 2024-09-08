import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import AuthenticatedApp from "../routes/AuthenticatedApp";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<AuthenticatedApp />} />
    </Routes>
  </Router>
);

export default App;
