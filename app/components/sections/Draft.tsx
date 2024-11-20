"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import Section from "@/app/components/ui/section";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { IPlayerInfo } from "@/lib/types";

import TeamLogo from "@/app/components/ui/team-logo";
import HiddenInfo from "@/app/components/ui/hidden-info";
import DummyLogo from "@/app/components/ui/dummy-logo";
import DummyInfo from "@/app/components/ui/dummy-info";

type ITeam = {
  abbr: string;
  league: string;
  location: string;
  mascot: string;
  logo: string;
};

type ITracker = {
  logo: boolean;
  year: boolean;
  round: boolean;
  overall: boolean;
};

type DraftProps = {
  draft: IPlayerInfo["draft"];
  revealTracker: ITracker | false;
  setError: Dispatch<SetStateAction<string | null>>;
};

export default function Draft({ draft, revealTracker, setError }: DraftProps) {
  const [draftTeam, setDraftTeam] = useState<ITeam | null>(null);
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
    <Section heading="Draft Info">
        <Table
          hideHeader
          removeWrapper
          aria-label="Player draft info"
          className="font-bold"
          classNames={{ td: "p-1 md:p-2" }}
        >
          <TableHeader>
            <TableColumn>LABEL</TableColumn>
            <TableColumn>INFO</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="draft-info-1">
              <TableCell>Team:</TableCell>
              <TableCell>
                {draftTeam && draftTeam.logo && revealTracker ? (
                  <TeamLogo
                    src={draftTeam.logo}
                    alt="Draft Team Logo"
                    reveal={revealTracker.logo}
                  />
                ) : (
                  <DummyLogo />
                )}
              </TableCell>
            </TableRow>
            <TableRow key="draft-info-2">
              <TableCell>Year:</TableCell>
              <TableCell>
                {drafted && year && revealTracker ? (
                  <HiddenInfo text={year} reveal={revealTracker.year} width="sm" />
                ) : (
                  <DummyInfo width="sm" />
                )}
              </TableCell>
            </TableRow>
            <TableRow key="draft-info-3">
              <TableCell>Round:</TableCell>
              <TableCell>
                {drafted && round && revealTracker ? (
                  <HiddenInfo text={round} reveal={revealTracker.round} width="sm" />
                ) : (
                  <DummyInfo width="sm" />
                )}
              </TableCell>
            </TableRow>
            <TableRow key="draft-info-4">
              <TableCell>Overall:</TableCell>
              <TableCell>
                {drafted && overall && revealTracker ? (
                  <HiddenInfo text={overall} reveal={revealTracker.overall} width="sm" />
                ) : (
                  <DummyInfo width="sm" />
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
</Section>
  );
}
