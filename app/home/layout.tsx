export interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return <div className="relative z-10 min-h-screen">{children}</div>;
}
