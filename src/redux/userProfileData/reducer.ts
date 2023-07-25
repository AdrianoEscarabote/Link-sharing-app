import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  initialStateTypes,
  setEmailProps,
  setProfileDetailsProps,
  setProfileImageUrlTypes,
  setUserIdProps,
} from "./profileDataTypes";

const initialState: initialStateTypes = {
  email: "",
  profileImageUrl: "",
  firstName: "",
  lastName: "",
  previewEmail: "",
  id: "",
  links: [],
};

const profileDataSlice = createSlice({
  name: "Profile Data",
  initialState,
  reducers: {
    setProfileImageUrl: (
      state,
      action: PayloadAction<setProfileImageUrlTypes>
    ) => {
      if (action.payload.url) {
        state.profileImageUrl = action.payload.url;
      }
    },

    setEmail: (state, action: PayloadAction<setEmailProps>) => {
      if (action.payload.email) {
        state.email = action.payload.email;
      }
    },

    setUserId: (state, action: PayloadAction<setUserIdProps>) => {
      if (action.payload.id) {
        state.id = action.payload.id;
      }
    },

    setProfileDetails: (
      state,
      action: PayloadAction<setProfileDetailsProps>
    ) => {
      const { firstName, lastName, previewEmail } = action.payload;
      if (firstName && lastName && previewEmail) {
        state.firstName = firstName;
        state.lastName = lastName;
        state.previewEmail = previewEmail;
      }
    },
  },
});

export const { setProfileDetails, setEmail, setUserId, setProfileImageUrl } =
  profileDataSlice.actions;

export default profileDataSlice.reducer;
