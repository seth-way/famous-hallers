import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-[85vh] w-screen flex-col items-center justify-center p-4">
      <h1>Famous Hallers</h1>
      <div className="flex space-x-3">
        <Link
          href="/players/53616c7465645f5fc6178eeacea21ce59842924a0a124b0cce33551d6076f174"
          className="text-stone-400 underline transition-all hover:text-stone-200"
        >
          Initial Puzzle
        </Link>
      </div>
    </div>
  );
}
