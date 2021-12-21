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
import Categories from "./Components/Backoffice/Categories";
import LoginForm from "./Components/Auth/LoginForm";
import RegisterForm from "./Components/Auth/RegisterForm";
import NewsList from "./Components/News/NewsSection";
import EditForm from "./Components/Organization/EditForm";
import Footer from "./Components/Footer";
import ActivityDetail from "./Components/Activities/Detail/ActivityDetail";
import SlidesList from "./Components/Backoffice/SlidesList";
import Activities from "./Components/Activities/Activities";
import ActivitiesList from "./Components/Backoffice/ActivitiesList";
import Donation from "./Components/Donations/Donation";
import Thanks from "./Components/Donations/Thanks";
import BackOfficeMembersList from "./Components/Backoffice/BackOfficeMembersList";
import News from "./Components/News/NewsSection";
import NavBar from "./Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={LoginForm} />
          <Route path="/toys-campaign" component={ToysCampaign} />
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
          <Route path="/Nosotros" component={About} />
          <Route path="/backoffice/news" component={NewsList} />
          <Route path="/backoffice/organization/edit" component={EditForm} />
          <Route path="/Novedades/:id" component={NewsDetail} />
          <Route path="/Actividades" component={Activities} />
          <Route path="/backoffice/activities" component={ActivitiesList} />
          <Route path="/backoffice/slides" component={SlidesList} />
          <Route path="/donar">
            <Donation text={"!Hacé tu donación ya mismo :)"} />
          </Route>
          <Route path="/gracias" component={Thanks} />
          <Route path="/backoffice/members" component={BackOfficeMembersList} />
          <Route path="/Novedades" component={News} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
