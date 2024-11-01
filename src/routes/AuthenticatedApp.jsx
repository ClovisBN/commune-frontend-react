import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import PrivateRoute from "../shared/components/PrivateRoute";
import Documents from "../Pages/PageDocuments";
import PageSurveyPreview from "../Pages/PageSurveyPreview";
import PageSurveyEdit from "../Pages/PageSurveyEdit";
import ProfileDetails from "../profile/components/ProfileDetails";
import EditProfileForm from "../profile/components/EditProfileForm";
import PageArticleEdit from "../Pages/PageArticleEdit";

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          {/* Survey */}
          <Route path="/survey/:id/preview" element={<PageSurveyPreview />} />
          <Route path="/survey/:id/edit" element={<PageSurveyEdit />} />
          {/* Article */}
          <Route path="/articles/:id/edit" element={<PageArticleEdit />} />{" "}
          {/* Documents */}
          <Route path="/Documents" element={<Documents />} />
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
