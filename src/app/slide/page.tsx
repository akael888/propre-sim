import Link from "next/link";
// import { tempSlideData, tempUserData } from "../lib/data";
import { Suspense } from "react";
import Loading from "../ui/loading";

import SlideCollectionHeader from "../ui/slide/slide-collection-header";
import SlideCollectionWrapper from "../ui/slide/slide-collection-wrapper";
import LoadingSlide from "../ui/loading-slide";

export default async function SlideManagerPage() {

  return (
    <div className="bg-foreground min-h-screen flex flex-col">
      <div className="flex justify-between p-1 border sticky top-0 text-background bg-white z-100">
        <div className="flex justify-center items-center font-bold w-full">
          <Suspense fallback={<Loading />}>
            <SlideCollectionHeader />
          </Suspense>
        </div>
        <div className="w-fit flex flex-row justify-end gap-1 flex text-center">
          <Link
            href="/"
            className="border-1 p-1 hover:bg-gray-300 bg-blue-500/50 shadow-xl hover:-translate-y-0.5 w-15 rounded-sm"
          >
            Home
          </Link>
          <Link
            href="/editor"
            className="border-1 p-1 hover:bg-gray-300 bg-green-500/50 shadow-xl hover:-translate-y-0.5 w-15 rounded-sm"
          >
            + New
          </Link>
        </div>
      </div>
      <div className="bg-foreground gap-5  h-full md:grid-cols-3 md:auto-rows-max md:grid flex flex-col bg-gray-200 p-2">
        <Suspense fallback={<LoadingSlide />}>
          <SlideCollectionWrapper />
        </Suspense>
      </div>
    </div>
  );
}
