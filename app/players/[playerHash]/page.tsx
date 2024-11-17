"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { decryptHash } from "@/lib/api";
import { IPlayerInfo } from "@/lib/types";
import Loading from "@/app/components/ui/loading";
import Score, { ScoreRef } from "@/app/components/ui/score";

export default function Page() {
  const [playerInfo, setPlayerInfo] = useState<IPlayerInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scoreRef = useRef<ScoreRef>(null);
  const playerHash = useParams().playerHash as string;
  const router = useRouter();

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      try {
        const playerId = await decryptHash(playerHash);
        const playerInfoReq = await fetch(
          `/dummyData/players/${playerId}.json`,
        );
        const player = await playerInfoReq.json();
        if (!player.last_name) throw new Error("error fetching player info");
        setPlayerInfo(player);
      } catch (err) {
        const errorCode =
          err instanceof Error && err.message.includes("404") ? "404" : "500";
        setError(err instanceof Error ? err.message : "unknown error");
        router.push(`/error/${errorCode}`);
      }
    };

    if (playerHash) fetchPlayerInfo();
  }, [playerHash]);
  if (error) return <Loading />;
  return playerInfo ? (
    <>
      <div className="flex">
        <Score ref={scoreRef} runScoreTimer={true} guessCount={0} />
      </div>
      <div className="flex">{playerInfo.first_name}</div>
    </>
  ) : (
    <Loading />
  );
}
4;
