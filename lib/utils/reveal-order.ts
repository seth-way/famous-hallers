import { Dispatch, SetStateAction } from "react";
import { IPlayerInfo } from "@/lib/types";
import next from "next";

const shuffleArray = (array: string[]): string[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
};

type IDraft = {
  logo: boolean;
  year: boolean;
  round: boolean;
  overall: boolean;
};

type ITeam = { years: boolean; logo: boolean };

export type IRevealTracker = {
  awards: boolean[];
  draft: IDraft | boolean;
  college: boolean;
  teams: ITeam[];
};

export const getRevealTracker = (playerInfo: IPlayerInfo): IRevealTracker => {
  const { awards, draft, teams } = playerInfo;

  const draftTracker = {
    logo: false,
    year: false,
    round: false,
    overall: false,
  } as IDraft;

  const tracker = {
    awards: awards.map(() => false),
    draft: draft.year ? draftTracker : false,
    college: false,
    teams: teams.map(() => ({ years: false, logo: false })),
  } as IRevealTracker;

  return tracker;
};

export const getRevealOrder = (playerInfo: IPlayerInfo): string[] => {
  const { awards, draft, teams } = playerInfo;
  const awardsElements = Array.from(
    { length: awards.length },
    (_, i) => `awards-${i}`,
  );

  const collegeElements = ["college"];
  const draftElements = draft.year
    ? ["draft-logo", "draft-year", "draft-round", "draft-overall"]
    : ["draft-all"];

  const teamsElements = Array.from({ length: teams.length }, (_, i) => [
    `teams-${i}-years`,
    `teams-${i}-logo`,
  ]).flat();

  const allElements = [
    ...awardsElements,
    ...collegeElements,
    ...draftElements,
    ...teamsElements,
  ];

  return shuffleArray(allElements);
};

export const revealElement = (
  key: string,
  trackerSetter: Dispatch<SetStateAction<IRevealTracker | null>>,
): void => {
  const trackerKey = key.split("-")[0];

  switch (trackerKey) {
    case "awards":
      const idx = Number(key.split("-")[1]);

      trackerSetter((prev) => {
        if (prev) prev.awards[idx] = true;
        return prev;
      });

      break;

    case "college":
      trackerSetter((prev) => {
        if (prev) prev.college = true;
        return prev;
      });
      break;

    case "draft":
      const draftKey = key.split("-")[1] as
        | "logo"
        | "overall"
        | "round"
        | "year";

      trackerSetter((prev) => {
        if (prev) {
          if (typeof prev.draft === "boolean") {
            prev.draft = true;
          } else {
            prev.draft[draftKey] = true;
          }
        }
        return prev;
      });
      break;

    case "teams":
      const teamsIdx = Number(key.split("-")[1]);
      const teamsKey = key.split("-")[2] as "logo" | "years";

      trackerSetter((prev) => {
        if (prev) prev.teams[teamsIdx][teamsKey] = true;
        return prev;
      });
      break;

    default:
      console.error('Unknown "Reveal Element" tracker key');
      break;
  }
};
