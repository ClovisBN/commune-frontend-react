import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "../Pages/User/UserLayout";
import AdminLayout from "../Pages/Admin/AdminLayout";
import PrivateRoute from "../components/PrivateRoute";
import Templates from "../Pages/Templates";
import QuestionUI from "../components/QuestionUI";

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          <Route path="/documents" element={<Templates />} />
          <Route path="/documents/:id" element={<QuestionUI />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>{/* Admin-specific routes */}</Route>
      </Route>
      <Route path="/unauthorized" element={<div>Unauthorized</div>} />
    </Routes>
  );
};

export default AuthenticatedApp;
