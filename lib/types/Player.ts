import { ILeague } from "@/lib/types";
import {
  MLB_TEAMS,
  NBA_TEAMS,
  NFL_TEAMS,
  NHL_TEAMS,
} from "@/db/constants/teams";

type IAnyTeam =
  | typeof MLB_TEAMS
  | typeof NBA_TEAMS
  | typeof NFL_TEAMS
  | typeof NHL_TEAMS;

type IDraft = {
  team: IAnyTeam | null;
  year: number | null;
  round: number | null;
  overall: number | null;
};

type ITeam = {
  start: number;
  end: number;
  team: IAnyTeam;
};

type IAward = {
  award: string;
  count: number;
};

export type IPlayerInfo = {
  id: string;
  first_name: string;
  last_name: string;
  img: string;
  college: string;
  league: ILeague;
  draft: IDraft;
  position: string;
  teams: ITeam[];
  awards: IAward[];
};
