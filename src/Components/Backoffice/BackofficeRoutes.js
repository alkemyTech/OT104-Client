import SlidesForm from "../Slides/SlidesForm";
import BackOfficeMembersList from "./BackOfficeMembersList";
import ActivitiesList from "./ActivitiesList";
import SlidesList from "./SlidesList";
import Categories from "./Categories";
import NewsList from "../News/NewsSection";
import EditForm from "../Organization/EditForm";
import BackofficeUserList from "./BackofficeUserList";
import { Switch, Route } from "react-router-dom";

export const backofficeRoutes = () => {
  return (
    <Switch>
      <Route path="/backoffice/create-slide" component={SlidesForm} />
      <Route path="/backoffice/categories" component={Categories} />
      <Route path="/backoffice/news" component={NewsList} />
      <Route path="/backoffice/organization/edit" component={EditForm} />
      <Route path="/backoffice/activities" component={ActivitiesList} />
      <Route path="/backoffice/slides" component={SlidesList} />
      <Route path="/backoffice/members" component={BackOfficeMembersList} />
    </Switch>
  );
};
