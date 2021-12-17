import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "../features/categories/categoriesSlice";
import authReducer from "../features/auth/authReducer";
import newsReducer from "../features/news/newsReducer";
import activitiesReducer from "../features/activities/activitiesSlice";
import backofficeReducer from "../features/backoffice_members/backofficeMembersReducer";
import aboutReducer from "../features/about/aboutReducer";
import backOfficeUsersSlice from "../features/backOfficeUsers/backOfficeUsersSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesSlice,
    news: newsReducer,
    activities: activitiesReducer,
    members: backofficeReducer,
    about: aboutReducer,
    users: backOfficeUsersSlice,
  },
});
