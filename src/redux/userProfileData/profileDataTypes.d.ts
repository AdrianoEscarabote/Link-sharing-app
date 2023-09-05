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
  uuid: string;
  links: LinkTypes[];
}

interface setPreviewDataProps {
  firstName: string;
  lastName: string;
  previewEmail: string;
  links: LinkTypes[];
  profileImageUrl: string;
  uuid: string;
}

interface setUserUuidTypes {
  uuid: string;
}

export {
  setUserUuidTypes,
  setProfileDetailsProps,
  initialStateTypes,
  LinkTypes,
  setEmailProps,
  initialStateTypes,
  setUserIdProps,
  setPreviewDataProps,
  setProfileImageUrlTypes,
};
