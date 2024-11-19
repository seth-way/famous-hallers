export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-radial absolute top-0 box-border flex h-screen w-full flex-grow flex-col items-center justify-start gap-2 px-2 pb-12 pt-[70px] md:gap-4 md:px-8 md:pb-16 md:pt-20">
      {children}
    </div>
  );
}
