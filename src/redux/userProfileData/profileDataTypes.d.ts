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
  links: LinkTypes[];
}

export {
  setProfileDetailsProps,
  initialStateTypes,
  LinkTypes,
  setEmailProps,
  initialStateTypes,
  setUserIdProps,
  setProfileImageUrlTypes,
};
