"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { decryptHash } from "@/lib/api";
import {
  getRevealOrder,
  getRevealTracker,
  revealElement,
  IRevealTracker,
} from "@/lib/utils/reveal-order";
import useTimer from "@/lib/hooks/user-timer";
import { IPlayerInfo } from "@/lib/types";
import Loading from "@/app/components/ui/loading";
import Profile from "@/app/components/sections/Profile";
import Score, { ScoreRef } from "@/app/components/ui/score";
import Draft from "@/app/components/sections/Draft";
import Teams from "@/app/components/sections/Teams";
import Awards from "@/app/components/sections/Awards";

const NEXT_CLUE_DELAY = 2;

export default function Page() {
  const [playerInfo, setPlayerInfo] = useState<IPlayerInfo | null>(null);
  const [revealOrder, setRevealOrder] = useState<string[]>([]);
  const [revealTracker, setRevealTracker] = useState<IRevealTracker | null>(
    null,
  );
  const [revealNext, setRevealNext] = useState<number>(0);
  const [revealPlayer, setRevealPlayer] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const scoreRef = useRef<ScoreRef>(null);
  const playerHash = useParams().playerHash as string;
  const router = useRouter();
  const timer = useTimer();
  const { time } = timer;
  //{ college, awards, draft, teams, }
  useEffect(() => {
    if (revealTracker && !time) {
      const nextElement = revealOrder[revealNext];
      if (nextElement) {
        revealElement(nextElement, setRevealTracker);
        timer.reset();
        timer.start(NEXT_CLUE_DELAY);
        setRevealNext((prev) => prev + 1);
      } else {
        setRevealPlayer(true); // No  more clues... you lose
      }
    }
  }, [time]);

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const playerId = await decryptHash(playerHash);
        const res = await fetch(`/dummyData/players/${playerId}.json`);
        const player = await res.json();
        if (!player.last_name) throw new Error("error fetching player info");
        setPlayerInfo(player);
        const order = getRevealOrder(player);
        setRevealOrder(order);
        const tracker = getRevealTracker(player);
        setRevealTracker(tracker);
        timer.start(2);
      } catch (err) {
        const errorCode =
          err instanceof Error && err.message.includes("404") ? "404" : "500";
        setError(err instanceof Error ? err.message : "unknown error");
        router.push(`/error/${errorCode}`);
      }
    };

    if (playerHash) fetchPlayerInfo();
  }, [playerHash]);

  if (error || !playerInfo || !revealTracker) return <Loading />;

  const {
    awards,
    college,
    draft,
    first_name: firstName,
    img,
    last_name: lastName,
    league,
    position,
    teams,
  } = playerInfo;

  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 overflow-hidden px-2 pb-12 pt-[70px] md:gap-4 md:px-8 md:pb-16 md:pt-20">
      <div
        className="flex w-full items-stretch justify-center gap-2 md:gap-4"
        onClick={() => setRevealPlayer(true)}
      >
        <Profile
          firstName={firstName}
          lastName={lastName}
          position={position}
          img={img}
          reveal={revealPlayer}
        />
        <Score ref={scoreRef} runScoreTimer={true} guessCount={0} />
      </div>
      <div className="flex max-h-full w-auto items-start justify-center gap-2 md:flex-row md:gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <Draft
            draft={draft}
            revealTracker={revealTracker.draft}
            setError={setError}
          />
          <Awards awards={awards} revealTracker={revealTracker.awards} />
        </div>
        <Teams
          teams={teams}
          college={college}
          revealTracker={{
            college: revealTracker.college,
            teams: revealTracker.teams,
          }}
          setError={setError}
        />
      </div>
    </div>
  );
}
