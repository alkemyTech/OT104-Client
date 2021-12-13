import { configureStore } from "@reduxjs/toolkit";
import backofficeMembersSlice from "../features/slices/backoffice_members/membersSlice";
export default configureStore({
  reducer: {
    getBackofficeMembers: backofficeMembersSlice,
  },
});
