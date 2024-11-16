export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-grow flex-col items-center justify-center">
      {children}
    </div>
  );
}
