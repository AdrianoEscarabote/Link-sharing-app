type PlatformsName =
  | "GitHub"
  | "Frontend Mentor"
  | "Twitter"
  | "LinkedIn"
  | "YouTube"
  | "Facebook"
  | "Twitch"
  | "Dev.to"
  | "Codewars"
  | "freeCodeCamp"
  | "GitLab"
  | "Hashnode"
  | "Stack Overflow";

interface profileDataSliceTypes {
  email: string;
  profileImageUrl: string;
  firstName: string;
  lastName: string;
  previewEmail: string;
  id: string;
  uuid: string;
}

interface userLinksSliceTypes {
  id: string;
  link: string;
  platform: PlatformsName;
}

interface rootState {
  profileDataSlice: profileDataSliceTypes;
  userLinksSlice: LinksSliceType;
}

interface LinksSliceType {
  links: userLinksSliceTypes[];
}

export { rootState, PlatformsName };
