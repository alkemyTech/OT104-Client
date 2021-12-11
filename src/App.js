import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ActivitiesForm from './Components/Activities/ActivitiesForm';
import CategoriesForm from './Components/Categories/CategoriesForm';
import NewsForm from './Components/News/NewsForm';
import NewsDetail from './Components/News/Detail/NewsDetail';
import SlidesForm from './Components/Slides/SlidesForm';
import TestimonialForm from './Components/Testimonials/TestimonialsForm';
import UserForm from './Components/Users/UsersForm';
import SchoolCampaign from './Campaigns/School/SchoolCampaign';
import ToysCampaign from './Campaigns/Toys/ToysCampaign';
import MembersForm from './Components/Members/MembersForm';
import ProjectsForm from './Components/Projects/ProjectsForm';
import About from './Components/About/About';
import Categories from './Components/Categories/Categories';
import LoginForm from './Components/Auth/LoginForm';
import RegisterForm from './Components/Auth/RegisterForm';
import NewsList from './Components/News/NewsList';
import EditForm from './Components/Organization/EditForm';
import Footer from './Components/Footer';
import ActivityDetail from './Components/Activities/Detail/ActivityDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import Activities from './Components/Activities/Activities';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={} />           Esta ruta debe ser para el Home */}
        <Route path='/login' component={LoginForm} />
        <Route path='/create-activity' component={ActivitiesForm} />
        <Route path='/create-category' component={CategoriesForm} />
        <Route path='/create-news' component={NewsForm} />
        <Route path='/backoffice/create-slide' component={SlidesForm} />
        <Route path='/create-testimonials' component={TestimonialForm} />
        <Route path='/create-user' component={UserForm} />
        <Route path='/create-member' component={MembersForm} />
        <Route path='/create-project' component={ProjectsForm} />
        <Route path='/school-campaign' component={SchoolCampaign} />
        <Route path='/toys-campaign' component={ToysCampaign} />
        <Route path='/registerform' component={RegisterForm} />
        <Route path='/backoffice/categories' component={Categories} />
        <Route path='/Nosotros' component={About} />
        <Route path='/backoffice/news' component={NewsList} />
        <Route path='/backoffice/organization/edit' component={EditForm} />
        <Route path='/Novedades/:id' component={NewsDetail} />
        <Route path='/Actividades' component={Activities} />
        <Route path='/activities-details' component={ActivityDetail} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
