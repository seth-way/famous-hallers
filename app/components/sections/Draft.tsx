"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import Section from "@/app/components/layout/section";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { IPlayerInfo, ILeague } from "@/lib/types";

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
  league: ILeague;
  revealTracker: ITracker | boolean;
  setError: Dispatch<SetStateAction<string | null>>;
};

export default function Draft({
  draft,
  league,
  revealTracker,
  setError,
}: DraftProps) {
  const [draftTeam, setDraftTeam] = useState<ITeam | null>(null);
  const [highlight, setHighlight] = useState<boolean>(false);
  const { team, year, round, overall } = draft;
  const drafted =
    Object.values(draft).filter((value) => value !== null).length > 0;
  const router = useRouter();

  useEffect(() => {
    const getTeamInfo = async () => {
      try {
        const res = await fetch(`/dummyData/teams/${league}/${team}.json`);
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

  useEffect(() => {
    const tracker = JSON.stringify(revealTracker);
    if (tracker.length && tracker.includes("true")) {
      setHighlight(true);
      setTimeout(() => {
        setHighlight(false);
      }, 3000);
    }
  }, [JSON.stringify(revealTracker)]);

  return (
    <Section
      heading="Draft Info"
      highlightKey="draft-section"
      highlight={highlight}
    >
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
              {typeof revealTracker === "boolean" ? (
                <DummyLogo />
              ) : draftTeam && draftTeam.logo ? (
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
              {typeof revealTracker === "boolean" ? (
                <HiddenInfo text="Was" reveal={revealTracker} width="md" />
              ) : drafted && year ? (
                <HiddenInfo
                  text={year}
                  reveal={revealTracker.year}
                  width="md"
                />
              ) : (
                <DummyLogo />
              )}
            </TableCell>
          </TableRow>
          <TableRow key="draft-info-3">
            <TableCell>Round:</TableCell>
            <TableCell>
              {typeof revealTracker === "boolean" ? (
                <HiddenInfo text="Not" reveal={revealTracker} width="md" />
              ) : drafted && round ? (
                <HiddenInfo
                  text={round}
                  reveal={revealTracker.round}
                  width="md"
                />
              ) : (
                <DummyLogo />
              )}
            </TableCell>
          </TableRow>
          <TableRow key="draft-info-4">
            <TableCell>Overall:</TableCell>
            <TableCell>
              {typeof revealTracker === "boolean" ? (
                <HiddenInfo text="Drafted" reveal={revealTracker} width="md" />
              ) : drafted && overall ? (
                <HiddenInfo
                  text={overall}
                  reveal={revealTracker.overall}
                  width="md"
                />
              ) : (
                <DummyLogo />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Section>
  );
}
