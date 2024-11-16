import { useRouter } from 'next/navigation';

type ErrorPageProps = {
  params: {
    errorCode: string;
  };
};

const ErrorPage = ({ params }: ErrorPageProps) => {
  const { errorCode } = params;
  const router = useRouter();

  const errorMessages: { [key: string]: string } = {
    404: 'Page Not Found',
    500: 'Internal Server Error',
    default: 'An unexpected error has occurred',
  };

  const errorMessage = errorMessages[errorCode] || errorMessages.default;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">{errorCode}</h1>
      <p className="text-lg">{errorMessage}</p>
      <button
        onClick={() => router.push('/')}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
