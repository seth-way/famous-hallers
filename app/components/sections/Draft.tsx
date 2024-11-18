"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import TeamLogo from "@/app/components/ui/team-logo";
import HiddenInfo from "@/app/components/ui/hidden-info";
import DummyLogo from "@/app/components/ui/dummy-logo";
import DummyInfo from "@/app/components/ui/dummy-info";
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

type ITeam = {
  abbr: string;
  league: string;
  location: string;
  mascot: string;
  logo: string;
};

type DraftProps = {
  draft: {
    team: IAnyTeam | null;
    year: number | null;
    round: number | null;
    overall: number | null;
  };
};

export default function Draft({ draft }: DraftProps) {
  const [draftTeam, setDraftTeam] = useState<ITeam | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { team, year, round, overall } = draft;
  const drafted =
    Object.values(draft).filter((value) => value !== null).length > 0;
  const router = useRouter();

  useEffect(() => {
    const getTeamInfo = async () => {
      try {
        const res = await fetch(`/dummyData/teams/${team}.json`);
        const teamInfo = await res.json();
        if (!teamInfo.logo) throw new Error("Error fetching draft team info.");
        setDraftTeam(teamInfo);
      } catch (err) {
        const errorCode =
          err instanceof Error && err.message.includes("404") ? "404" : "500";
        setError(err instanceof Error ? err.message : "unknown error");
        router.push(`/error/${errorCode}`);
      }
    };
    if (draft && drafted) getTeamInfo();
  }, [draft]);

  return (
    <div>
      <h2>Draft Info</h2>
      <Table hideHeader removeWrapper aria-label="Player draft info">
        <TableHeader>
          <TableColumn>LABEL</TableColumn>
          <TableColumn>INFO</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Team:</TableCell>
            <TableCell>
              {draftTeam && draftTeam.logo ? (
                <TeamLogo
                  src={draftTeam.logo}
                  alt="Draft Team Logo"
                  reveal={false}
                />
              ) : (
                <DummyLogo />
              )}
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Year:</TableCell>
            <TableCell>
              {drafted && year ? (
                <HiddenInfo text={year} reveal={false} width="sm" />
              ) : (
                <DummyInfo width="sm" />
              )}
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Round:</TableCell>
            <TableCell>
              {" "}
              {drafted && round ? (
                <HiddenInfo text={round} reveal={false} width="sm" />
              ) : (
                <DummyInfo width="sm" />
              )}
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Overall:</TableCell>
            <TableCell>
              {" "}
              {drafted && overall ? (
                <HiddenInfo text={overall} reveal={false} width="sm" />
              ) : (
                <DummyInfo width="sm" />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
