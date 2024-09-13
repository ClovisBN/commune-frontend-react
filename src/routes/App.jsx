import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../auth/components/Register";
import Login from "../auth/components/Login";
import AuthenticatedApp from "../routes/AuthenticatedApp";
import AppProvider from "./AppProvider"; // Import du AppProvider

const App = () => (
  <AppProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<AuthenticatedApp />} />
      </Routes>
    </Router>
  </AppProvider>
);

export default App;
