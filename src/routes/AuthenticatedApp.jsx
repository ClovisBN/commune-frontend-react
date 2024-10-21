// src/routes/AuthenticatedApp.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import PrivateRoute from "../shared/components/PrivateRoute";
import Templates from "../Pages/Templates";
import UserTemplateListSurvey from "../Pages/UserTemplateListSurvey";
import SurveyAnswer from "../Pages/SurveyAnswer";
import QuestionUI from "../dynamicForm/components/QuestionUI";
import ProfileDetails from "../profile/components/ProfileDetails";
import EditProfileForm from "../profile/components/EditProfileForm";

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          <Route path="/documents" element={<Templates />} />
          <Route path="/News" element={<UserTemplateListSurvey />} />
          <Route path="/documents/:id/answer" element={<SurveyAnswer />} />
          <Route path="/documents/:id" element={<QuestionUI />} />
          <Route path="/profile" element={<ProfileDetails />} />
          <Route path="/profile/edit" element={<EditProfileForm />} />
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
