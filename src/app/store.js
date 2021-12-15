import { configureStore } from "@reduxjs/toolkit";
import backofficeReducer from "../features/backoffice_members/backofficeMembersReducer";
export default configureStore({
  reducer: {
    getBackofficeMembers: backofficeReducer,
  },
});
