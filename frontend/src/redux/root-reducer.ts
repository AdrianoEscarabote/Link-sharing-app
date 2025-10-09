import { combineReducers } from "@reduxjs/toolkit";

import userLinksSlice from "./userLinks/reducer";
import profileDataSlice from "./userProfileData/reducer";

const rootReducer = combineReducers({
  profileDataSlice,
  userLinksSlice,
});

export default rootReducer;
