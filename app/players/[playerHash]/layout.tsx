export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-box absolute top-0 box-border flex h-screen w-full flex-grow flex-col items-center justify-start gap-2 bg-radial px-2 pb-12 pt-[70px] md:gap-4">
      {children}
    </div>
  );
}
