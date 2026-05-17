import LoadingScreen from "@/app/ui/fallback/loading-screen";
import { Suspense } from "react";

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full h-full flex-row justify-center text-black bg-gray-600 relative">
        <Suspense fallback={<LoadingScreen />}> {children}</Suspense>
      </div>
    </>
  );
}
