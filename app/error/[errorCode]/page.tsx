"use client";
import { useParams, useRouter } from "next/navigation";

const ErrorPage = () => {
  const errorCode = useParams().errorCode as string;
  const router = useRouter();

  const errorMessages: { [key: string]: string } = {
    404: "Page Not Found",
    500: "Internal Server Error",
    default: "An unexpected error has occurred",
  };

  const errorMessage =
    errorCode && errorMessages[errorCode]
      ? errorMessages[errorCode]
      : errorMessages.default;

  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">{errorCode}</h1>
      <p className="text-lg">{errorMessage}</p>
      <button
        onClick={() => router.push("/")}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
