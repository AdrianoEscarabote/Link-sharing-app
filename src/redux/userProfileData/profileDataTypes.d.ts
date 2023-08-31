interface setEmailProps {
  email: string;
}

interface setProfileImageUrlTypes {
  url: string;
}

interface setProfileDetailsProps {
  firstName: string;
  lastName: string;
  previewEmail: string;
  uuid: string;
}

interface setUserIdProps {
  id: string;
}

interface LinkTypes {
  platform: string;
  link: string;
}

interface initialStateTypes {
  profileImageUrl: string;
  email: string;
  firstName: string;
  lastName: string;
  previewEmail: string;
  id: string;
  uuid: string;
  links: LinkTypes[];
}

interface setPreviewDataProps {
  firstName: string;
  lastName: string;
  previewEmail: string;
  links: LinkTypes[];
  uuid: string;
  profileImageUrl: string;
}

export {
  setProfileDetailsProps,
  initialStateTypes,
  LinkTypes,
  setEmailProps,
  initialStateTypes,
  setUserIdProps,
  setPreviewDataProps,
  setProfileImageUrlTypes,
};
