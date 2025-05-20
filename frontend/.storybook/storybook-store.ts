import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../src/redux/root-reducer";
import getMockState from "../src/utils/getMockState";

const initialState = getMockState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
