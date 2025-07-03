import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login | ACM @ CCNY",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AuthGroupLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
