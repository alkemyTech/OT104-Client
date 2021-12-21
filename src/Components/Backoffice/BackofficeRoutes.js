import React, { useState, useEffect } from "react";
import SlidesForm from "../Slides/SlidesForm";
import Categories from "./Categories";
import NewsList from "../News/NewsSection";
import EditForm from "../Organization/EditForm";
import ActivitiesList from "./ActivitiesList";
import SlidesList from "./SlidesList";
import BackOfficeMembersList from "./BackOfficeMembersList";
import BackofficeUserList from "./BackofficeUserList";
import { Switch, Route } from "react-router-dom";
import LoginForm from "../Auth/LoginForm";
import { checkToken } from "../../Services/privateApiService";

export const backofficeRoutes = () => {
  const [tokenVerification, setTokenVerification] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      const res = await checkToken();
      setTokenVerification(res);
    };
    getInfo();
  }, []);

  return (
    <>
      <Switch>
        <Route
          path="/backoffice/create-slide"
          component={tokenVerification ? SlidesForm : LoginForm}
        />
        <Route
          path="/backoffice/categories"
          component={tokenVerification ? Categories : LoginForm}
        />
        <Route
          path="/backoffice/news"
          component={tokenVerification ? NewsList : LoginForm}
        />
        <Route
          path="/backoffice/organization/edit"
          component={tokenVerification ? EditForm : LoginForm}
        />
        <Route
          path="/backoffice/activities"
          component={tokenVerification ? ActivitiesList : LoginForm}
        />
        <Route
          path="/backoffice/slides"
          component={tokenVerification ? SlidesList : LoginForm}
        />
        <Route
          path="/backoffice/members"
          component={tokenVerification ? BackOfficeMembersList : LoginForm}
        />
        <Route
          path="/backoffice/users"
          component={tokenVerification ? BackofficeUserList : LoginForm}
        />
      </Switch>
    </>
  );
};
