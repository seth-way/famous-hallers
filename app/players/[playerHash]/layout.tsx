export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gunmetal flex h-full w-full flex-grow flex-col items-center justify-start gap-8 px-8 pt-8">
      {children}
    </div>
  );
}
