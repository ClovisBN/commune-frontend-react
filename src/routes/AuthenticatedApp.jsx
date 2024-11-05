// AuthenticatedApp.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import PrivateRoute from "../shared/components/PrivateRoute";
import Documents from "../Pages/PageDocuments";
import PageSurveyPreview from "../Pages/PageSurvey/PageSurveyPreview";
import PageSurveyEdit from "../Pages/PageSurvey/PageSurveyEdit";
import ProfileDetails from "../profile/components/ProfileDetails";
import EditProfileForm from "../profile/components/EditProfileForm";
import PageArticleEdit from "../Pages/PageArticle/PageArticleEdit";
import PageArticlePreview from "../Pages/PageArticle/PageArticlePreview"; // Importer le composant de prévisualisation

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          {/* Survey */}
          <Route path="/survey/:id/preview" element={<PageSurveyPreview />} />
          <Route path="/survey/:id/edit" element={<PageSurveyEdit />} />
          {/* Article */}
          <Route path="/article/:id/edit" element={<PageArticleEdit />} />
          <Route path="/article/:id/preview" element={<PageArticlePreview />} />
          {/* Documents */}
          <Route path="/documents" element={<Documents />} />
          {/* Profil */}
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
