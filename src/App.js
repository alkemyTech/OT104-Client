import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import ActivitiesForm from "./Components/Activities/ActivitiesForm";
import Home from "./Components/Home/Home";
import CategoriesForm from "./Components/Categories/CategoriesForm";
import NewsForm from "./Components/News/NewsForm";
import NewsDetail from "./Components/News/Detail/NewsDetail";
import TestimonialForm from "./Components/Testimonials/TestimonialsForm";
import UserForm from "./Components/Users/UsersForm";
import SchoolCampaign from "./Campaigns/School/SchoolCampaign";
import ToysCampaign from "./Campaigns/Toys/ToysCampaign";
import MembersForm from "./Components/Members/MembersForm";
import ProjectsForm from "./Components/Projects/ProjectsForm";
import About from "./Components/About/About";
import ContactForm from "./Components/Contact/ContactForm";
import LoginForm from "./Components/Auth/LoginForm";
import RegisterForm from "./Components/Auth/RegisterForm";
import EditForm from "./Components/Organization/EditForm";
import Footer from "./Components/Footer/Footer";
import ActivityDetail from "./Components/Activities/Detail/ActivityDetail";
import Activities from "./Components/Activities/Activities";
import Donation from "./Components/Donations/Donation";
import Thanks from "./Components/Donations/Thanks";
import "bootstrap/dist/css/bootstrap.min.css";
import News from "./Components/News/NewsSection";
import { backofficeRoutes } from "./Components/Backoffice/BackofficeRoutes";
import NavBar from "./Components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "./Services/privateApiService";
import { authSuccess } from "./features/auth/authReducer";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.user?.role_id);

  useEffect(() => {
    const authenticate = async () => {
      const res = await checkToken();
      if (res.success) {
        dispatch(authSuccess(res.data.user));
      }
    };
    authenticate();
  }, []);

  return (
    <BrowserRouter>
      <NavBar isAuth={isAuth} userRole={userRole} />
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path="/" exact component={Home} />
        <Route path="/login" component={LoginForm} />
        <Route path="/toys-campaign" component={ToysCampaign} />
        <Route path="/create-activity" component={ActivitiesForm} />
        <Route path="/create-category" component={CategoriesForm} />
        <Route path="/create-news" component={NewsForm} />
        <Route path="/create-testimonials" component={TestimonialForm} />
        <Route path="/create-user" component={UserForm} />
        <Route path="/create-project" component={ProjectsForm} />
        <Route path="/create-contact" component={ContactForm} />
        <Route path="/school-campaign" component={SchoolCampaign} />
        <Route path="/contact" component={ContactForm} />
        <Route path="/about" component={About} />
        <Route path="/Novedades/:id" component={NewsDetail} />
        <Route path="/Actividades" component={Activities} />
        <Route path="/donar">
          <Donation text={"!Hacé tu donación ya mismo :)"} />
        </Route>
        <Route path="/gracias" component={Thanks} />
        <Route path="/Novedades" component={News} />
        <Route path="/backoffice" component={backofficeRoutes} />
        {!isAuth ? (
          <Route path="/registerform" component={RegisterForm} />
        ) : (
          <Redirect to="/" />
        )}
      </AnimatedSwitch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
