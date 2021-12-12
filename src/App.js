import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ActivitiesForm from "./Components/Activities/ActivitiesForm";
import Home from "./Components/Home/Home";
import CategoriesForm from "./Components/Categories/CategoriesForm";
import NewsForm from "./Components/News/NewsForm";
import NewsDetail from "./Components/News/Detail/NewsDetail";
import SlidesForm from "./Components/Slides/SlidesForm";
import TestimonialForm from "./Components/Testimonials/TestimonialsForm";
import UserForm from "./Components/Users/UsersForm";
import SchoolCampaign from "./Campaigns/School/SchoolCampaign";
import ToysCampaign from "./Campaigns/Toys/ToysCampaign";
import MembersForm from "./Components/Members/MembersForm";
import ProjectsForm from "./Components/Projects/ProjectsForm";
import About from "./Components/About/About";
import BackofficeUserList from "./Components/Backoffice/BackofficeUserList";
import Contact from "./Components/Contact/Contact";
import Categories from "./Components/Categories/Categories";
import LoginForm from "./Components/Auth/LoginForm";
import RegisterForm from "./Components/Auth/RegisterForm";
import NewsList from "./Components/News/NewsList";
import EditForm from "./Components/Organization/EditForm";
import Footer from "./Components/Footer";
import ActivityDetail from "./Components/Activities/Detail/ActivityDetail";
import SlidesList from "./Components/Slides/SlidesList";
import Activities from "./Components/Activities/Activities";
import ActivitiesList from "./Components/Activities/backofficce/ActivitiesList.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./app/store";
import OrganizationInfo from "./Components/Organization/OrganizationInfo";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={LoginForm} />
        <Route path="/create-activity" component={ActivitiesForm} />
        <Route path="/create-category" component={CategoriesForm} />
        <Route path="/create-news" component={NewsForm} />
        <Route path="/backoffice/create-slide" component={SlidesForm} />
        <Route path="/create-testimonials" component={TestimonialForm} />
        <Route path="/create-user" component={UserForm} />
        <Route path="/create-member" component={MembersForm} />
        <Route path="/create-project" component={ProjectsForm} />
        <Route path="/school-campaign" component={SchoolCampaign} />
        <Route path="/toys-campaign" component={ToysCampaign} />
        <Route path="/contacto" component={Contact} />
        <Route path="/registerform" component={RegisterForm} />
        <Route path="/backoffice/categories" component={Categories} />
        <Route path="/backoffice/activities" component={ActivitiesList} />
        <Route path="/Nosotros" component={About} />
        <Route path="/backoffice/news" component={NewsList} />
        <Route path="/backoffice/organization/edit" component={EditForm} />
        <Route path="/Novedades/:id" component={NewsDetail} />
        <Route path="/Actividades" component={Activities} />
        <Route path="/backoffice/activities" component={ActivitiesList} />
        <Route path="/backoffice/slides" component={SlidesList} />
        <Route path="./Components/Organization/OrganizationInfo"component={OrganizationInfo} />
      </Switch>
      <OrganizationInfo/>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
