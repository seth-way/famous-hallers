"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { decryptHash } from "@/lib/api";
import {
  getRevealOrder,
  getRevealTracker,
  IRevealTracker,
} from "@/lib/utils/reveal-order";
import { IPlayerInfo } from "@/lib/types";
import Loading from "@/app/components/ui/loading";
import Profile from "@/app/components/sections/Profile";
import Score, { ScoreRef } from "@/app/components/ui/score";
import Draft from "@/app/components/sections/Draft";
import Teams from "@/app/components/sections/Teams";
import Awards from "@/app/components/sections/Awards";

export default function Page() {
  const [playerInfo, setPlayerInfo] = useState<IPlayerInfo | null>(null);
  const [revealOrder, setRevealOrder] = useState<string[]>([]);
  const [revealTracker, setRevealTracker] = useState<IRevealTracker | null>(
    null,
  );
  const [revealPlayer, setRevealPlayer] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const scoreRef = useRef<ScoreRef>(null);
  const playerHash = useParams().playerHash as string;
  const router = useRouter();

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const playerId = await decryptHash(playerHash);
        const res = await fetch(`/dummyData/players/${playerId}.json`);
        const player = await res.json();
        if (!player.last_name) throw new Error("error fetching player info");
        setPlayerInfo(player);
        setRevealOrder(getRevealOrder(player));
        setRevealTracker(getRevealTracker(player));
      } catch (err) {
        const errorCode =
          err instanceof Error && err.message.includes("404") ? "404" : "500";
        setError(err instanceof Error ? err.message : "unknown error");
        router.push(`/error/${errorCode}`);
      }
    };

    if (playerHash) fetchPlayerInfo();
  }, [playerHash]);

  if (error || !playerInfo) return <Loading />;
  console.log(playerInfo);
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
  console.log("TRACKER <>", revealTracker);
  console.log("ORDER <>", revealOrder);
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 overflow-hidden md:gap-4">
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
      <div className="flex max-h-full w-auto items-start justify-center gap-2 overflow-y-scroll md:flex-row md:gap-4">
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <Draft draft={draft} setError={setError} />
          <Awards awards={awards} />
        </div>
        <Teams teams={teams} college={college} setError={setError} />
      </div>
    </div>
  );
}
4;
