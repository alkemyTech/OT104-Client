import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ActivitiesForm from "./Components/Activities/ActivitiesForm";
import CategoriesForm from "./Components/Categories/CategoriesForm";
import NewsForm from "./Components/News/NewsForm";
import SlidesForm from "./Components/Slides/SlidesForm";
import TestimonialForm from "./Components/Testimonials/TestimonialsForm";
import UserForm from "./Components/Users/UsersForm";
import SchoolCampaign from "./Campaigns/School/SchoolCampaign";
import ToysCampaign from "./Campaigns/Toys/ToysCampaign";
import MembersForm from "./Components/Members/MembersForm";
import ProjectsForm from "./Components/Projects/ProjectsForm";
import About from "./Components/About/About";
import axios from "axios";

// testing service
import { Get } from "./Services/privateApiService";

function App() {
  // axios
  //   .get("http://ongapi.alkemy.org/api/auth/me", {
  //     headers: {
  //       Authorization:
  //         "Bearer " +
  //         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9vbmdhcGkuYWxrZW15Lm9yZ1wvYXBpXC9sb2dpbiIsImlhdCI6MTYzODYzNDA0NCwiZXhwIjoxNjM4NjM3NjQ0LCJuYmYiOjE2Mzg2MzQwNDQsImp0aSI6ImhtakRPNVVPNkZhMlo2NTIiLCJzdWIiOjEwNTIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.Ep79EFNhX6VjpyURbYvFOt9yJKRftyYDndX2xPb1imM",
  //     },
  //   })
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
  Get("http://ongapi.alkemy.org/api/auth/me");
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
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
          <Route path="/Nosotros" component={About} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
