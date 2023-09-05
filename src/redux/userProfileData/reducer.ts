import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  initialStateTypes,
  setEmailProps,
  setProfileDetailsProps,
  setProfileImageUrlTypes,
  setUserIdProps,
  setPreviewDataProps,
  setUserUuidTypes,
} from "./profileDataTypes";
import { act } from "react-dom/test-utils";

const initialState: initialStateTypes = {
  email: "",
  profileImageUrl: "",
  firstName: "",
  lastName: "",
  previewEmail: "",
  id: "",
  links: [],
  uuid: "",
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

    handleResetData: (state, action: PayloadAction) => {
      return initialState;
    },

    setUserUuid: (state, action: PayloadAction<setUserUuidTypes>) => {
      const { uuid } = action.payload;
      if (uuid) {
        state.uuid = uuid;
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

    setPreviewData: (state, action: PayloadAction<setPreviewDataProps>) => {
      const { firstName, lastName, links, previewEmail, profileImageUrl } =
        action.payload;

      if (firstName && lastName && links && previewEmail && profileImageUrl) {
        state.firstName = firstName;
        state.lastName = lastName;
        state.links = links;
        state.previewEmail = previewEmail;
        state.profileImageUrl = profileImageUrl;
      }
    },
  },
});

export const {
  setUserUuid,
  setProfileDetails,
  handleResetData,
  setEmail,
  setUserId,
  setProfileImageUrl,
  setPreviewData,
} = profileDataSlice.actions;

export default profileDataSlice.reducer;
