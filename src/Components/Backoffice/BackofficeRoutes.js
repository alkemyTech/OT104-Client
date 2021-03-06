import React, { useState, useEffect } from "react";
import SlidesForm from "../Slides/SlidesForm";
import Categories from "./Categories";
import NewsList from "./NewsList";
import CategoriesForm from "./../Categories/CategoriesForm";
import UserForm from "../Users/UsersForm";
import EditForm from "../Organization/EditForm";
import ActivitiesList from "./ActivitiesList";
import SlidesList from "./SlidesList";
import BackOfficeMembersList from "./BackOfficeMembersList";
import BackofficeUserList from "./BackofficeUserList";
import OrganizationInfoList from "./OrganizationInfo";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "../Auth/LoginForm";
import { checkToken } from "../../Services/privateApiService";
import BackofficeLayout from "./BackofficeLayout";
import MembersForm from "../Members/MembersForm";
import Spinner from "../Spinner/Spinner";
import Title from "../Title/Title";
import { Container } from "react-bootstrap";
import NewsDetail from "../News/Detail/NewsDetail";

export const backofficeRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const USER_ROLES = { admin: 1, regular: 2 };

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      const res = await checkToken();
      setIsAuth(res.success);
      setUserRole(res.data?.user?.role_id || null);
      setLoading(false);
    };
    getInfo();
  }, []);

  return (
    <>
      <Container className="mb-4 mt-5 w-100">
        {loading ? (
          <Spinner />
        ) : userRole == USER_ROLES.admin && isAuth ? (
          <BackofficeLayout />
        ) : (
          <Redirect to="/login" />
        )}
      </Container>

      <Switch>
        <Route
          path="/backoffice/create-slide"
          component={isAuth ? SlidesForm : LoginForm}
        />
        <Route
          path="/backoffice/categories/form"
          component={isAuth ? CategoriesForm : LoginForm}
        />
        <Route
          path="/backoffice/categories"
          component={isAuth ? Categories : LoginForm}
        />
        <Route
          path="/backoffice/news"
          component={isAuth ? NewsList : LoginForm}
        />
        <Route
          path="/novedades/:id"
          component={isAuth ? NewsDetail : LoginForm}
        />
        <Route
          exact
          path="/backoffice/organization"
          component={isAuth ? OrganizationInfoList : LoginForm}
        />
        <Route
          path="/backoffice/organization/edit"
          component={isAuth ? EditForm : LoginForm}
        />
        <Route
          path="/backoffice/activities"
          component={isAuth ? ActivitiesList : LoginForm}
        />
        <Route
          path="/backoffice/slides"
          component={isAuth ? SlidesList : LoginForm}
        />
        <Route
          path="/backoffice/members/create"
          component={isAuth ? MembersForm : LoginForm}
        />
        <Route
          path="/backoffice/members"
          component={isAuth ? BackOfficeMembersList : LoginForm}
        />
        <Route
          exact
          path="/backoffice/users"
          component={isAuth ? BackofficeUserList : LoginForm}
        />
        <Route
          path="/backoffice/users/create"
          component={isAuth ? UserForm : LoginForm}
        />
        <Route
          path="/backoffice/users/edit/:id"
          component={isAuth ? UserForm : LoginForm}
        />
      </Switch>
    </>
  );
};
