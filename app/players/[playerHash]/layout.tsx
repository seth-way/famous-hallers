export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gunmetal flex w-full flex-grow flex-col items-center justify-start px-8 pt-8">
      {children}
    </div>
  );
}
