// AuthenticatedApp.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import PrivateRoute from "../shared/components/PrivateRoute";

import Documents from "../Pages/PageDocuments";
import TimeLine from "../Pages/PageTimeLine";

import PageSurveyPreview from "../Pages/PageSurvey/PageSurveyPreview";
import PageSurveyEdit from "../Pages/PageSurvey/PageSurveyEdit";

import ProfileDetails from "../profile/components/ProfileDetails";
import EditProfileForm from "../profile/components/EditProfileForm";

import PageArticleEdit from "../Pages/PageArticle/PageArticleEdit";
import PageArticlePreview from "../Pages/PageArticle/PageArticlePreview";

import UsersPreview from "../Pages/PageUser/PageUsersPreview";
import UserForm from "../core/user/UserForm";

import GrievanceList from "../Pages/PageGrievance/PageGrievancesPreview";
import GrievanceDetail from "../core/Grievance/GrievanceDetail";
import AllGrievanceList from "../core/Grievance/AllGrievancesList";

const AuthenticatedApp = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute allowedRoles={["user"]} />}>
        <Route element={<UserLayout />}>
          {/* Profil */}
          <Route path="/user/profile" element={<ProfileDetails />} />
          <Route path="/user/profile/edit" element={<EditProfileForm />} />
          {/* grievances */}
          <Route path="/user/grievances" element={<GrievanceList />} />
          <Route path="/user/grievances/:id" element={<GrievanceDetail />} />
        </Route>
      </Route>

      {/* toutes admin */}

      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route element={<AdminLayout />}>
          {/* Documents */}
          <Route path="/admin/documents" element={<Documents />} />
          <Route path="/admin/time-line" element={<TimeLine />} />

          {/* Survey */}
          <Route
            path="/admin/survey/:id/preview"
            element={<PageSurveyPreview />}
          />
          <Route path="/admin/survey/:id/edit" element={<PageSurveyEdit />} />

          {/* Articles */}
          <Route path="/admin/article/:id/edit" element={<PageArticleEdit />} />
          <Route
            path="/admin/article/:id/preview"
            element={<PageArticlePreview />}
          />

          {/* Users */}
          <Route path="/admin/users" element={<UsersPreview />} />
          <Route path="/admin/users/new" element={<UserForm />} />
          <Route path="/admin/users/:id/edit" element={<UserForm />} />

          {/* grievances */}
          <Route path="/admin/grievances" element={<AllGrievanceList />} />
          <Route path="/admin/grievances/:id" element={<GrievanceDetail />} />
        </Route>
      </Route>
      <Route path="/unauthorized" element={<div>Unauthorized</div>} />
    </Routes>
  );
};

export default AuthenticatedApp;
