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
import { Modal, useDisclosure } from "@nextui-org/react";
import useTimer from "@/lib/hooks/user-timer";
import { IPlayerInfo } from "@/lib/types";
import Loading from "@/app/components/ui/loading";
import Profile from "@/app/components/sections/Profile";
import Score, { ScoreRef } from "@/app/components/sections/Score";
import Draft from "@/app/components/sections/Draft";
import Teams from "@/app/components/sections/Teams";
import Awards from "@/app/components/sections/Awards";
import GuessForm from "@/app/components/sections/GuessForm";

const NEXT_CLUE_DELAY = 6; // in seconds

export default function Page() {
  const [playerInfo, setPlayerInfo] = useState<IPlayerInfo | null>(null);
  const [revealOrder, setRevealOrder] = useState<string[]>([]);
  const [revealTracker, setRevealTracker] = useState<IRevealTracker | null>(
    null,
  );
  const [revealNext, setRevealNext] = useState<number>(0);
  const [revealPlayer, setRevealPlayer] = useState<boolean>(false);
  const [guessCount, setGuessCount] = useState<number>(0);
  const [winner, setWinner] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const scoreRef = useRef<ScoreRef>(null);
  const playerHash = useParams().playerHash as string;
  const router = useRouter();
  const timer = useTimer();
  const { time } = timer;

  useEffect(() => {
    if (revealTracker && !time) {
      const nextElement = revealOrder[revealNext];
      if (nextElement) {
        revealElement(nextElement, setRevealTracker);
        timer.reset();
        timer.start(NEXT_CLUE_DELAY);
        setRevealNext((prev) => prev + 1);
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

  const handleOpenModal = () => {
    onOpen();
  };

  const handleWinner = () => {
    setCompleted(true);
    setWinner(true);
    setRevealPlayer(true);
    setTimeout(() => {
      revealAllInfo();
    }, 1000);
  };

  const handleLoser = () => {
    setCompleted(true);
    setRevealPlayer(true);
    setTimeout(() => {
      revealAllInfo();
    }, 1000);
  };

  const handleIncorrectGuess = () => {
    setGuessCount((prev) => prev + 1);
  };

  const handleGuess = (guess: string) => {
    if (guess.length) {
      const playerFullName = firstName + " " + lastName;
      return playerFullName.toLocaleLowerCase() === guess.toLocaleLowerCase()
        ? handleWinner()
        : handleIncorrectGuess();
    }
  };

  const revealAllInfo = () => {
    let idx = revealNext;
    const intervalId = setInterval(() => {
      const nextElement = revealOrder[idx];
      if (nextElement) {
        revealElement(nextElement, setRevealTracker);
        idx += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 350);
  };

  return (
    <div className="flex h-full max-h-[1100px] w-full flex-col justify-center gap-2 overflow-hidden px-2 py-2 md:gap-4 md:px-8">
      <div className="flex max-h-[34%] w-full items-stretch justify-center gap-2 md:gap-4">
        <Profile
          firstName={firstName}
          lastName={lastName}
          position={position}
          img={img}
          league={league}
          reveal={revealPlayer}
          handleOpenModal={handleOpenModal}
          completed={completed}
        />
        <Score
          ref={scoreRef}
          runScoreTimer={!completed && !isOpen}
          guessCount={guessCount}
          handleTimesUp={handleLoser}
        />
      </div>
      <div className="flex max-h-[64%] w-auto items-start justify-center gap-2 md:flex-row md:gap-4">
        <div className="flex h-full flex-col gap-2 md:flex-row md:gap-4">
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
      {
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="blur"
          placement="center"
        >
          <GuessForm isOpen={isOpen} handleGuess={handleGuess} />
        </Modal>
      }
    </div>
  );
}
