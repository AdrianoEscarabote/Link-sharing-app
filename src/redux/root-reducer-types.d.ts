interface profileDataSliceTypes {
  email: string;
  profileImageUrl: string;
  firstName: string;
  lastName: string;
  previewEmail: string;
  id: string;
}

interface rootState {
  profileDataSlice: profileDataSliceTypes;
}

export { rootState };
