import { combineReducers } from "@reduxjs/toolkit";
import profileDataSlice from "./userProfileData/reducer";

const rootReducer = combineReducers({
  profileDataSlice,
});

export default rootReducer;
