import { combineReducers } from "@reduxjs/toolkit";
import profileDataSlice from "./userProfileData/reducer";
import userLinksSlice from "./userLinks/reducer";

const rootReducer = combineReducers({
  profileDataSlice,
  userLinksSlice,
});

export default rootReducer;
