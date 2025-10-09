import { ComponentPropsWithoutRef } from "react";

interface LinkTypes extends ComponentPropsWithoutRef<"a"> {
  link: string;
  label: PlatformsName;
  size: "small" | "large";
}

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

type PlatformClass =
  | ""
  | "GitHub"
  | "FrontendMentor"
  | "Twitter"
  | "LinkedIn"
  | "YouTube"
  | "Facebook"
  | "Twitch"
  | "Devto"
  | "Codewars"
  | "freeCodeCamp"
  | "GitLab"
  | "Hashnode"
  | "StackOverflow";

export { LinkTypes, PlatformClass,PlatformsName };
