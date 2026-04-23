import Link from "next/link";
import { deleteSlideData, getData, getSession } from "../lib/action";
// import { tempSlideData, tempUserData } from "../lib/data";
import DeleteSlideButton from "../ui/slide/delete-slide-button";
import { Suspense } from "react";
import Loading from "../ui/loading";
import SlideCard from "../ui/slide/slide-card";

export default async function SlideManagerPage() {
  const session = await getSession();
  const user = session?.user;
  const slideData = await getData(user?.id);
  console.log(user);

  return (
    <div className="bg-white md:h-screen h-fit flex flex-col">
      <div className="flex justify-between p-1 border sticky top-0 text-background bg-white z-100">
        <div className="flex justify-center items-center font-bold w-full">
          <span>Hi {user?.name}!</span>
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
      <div className="bg-foreground gap-5 h-full md:grid-cols-3 md:auto-rows-min md:grid flex flex-col bg-gray-200 p-2">
        <Suspense fallback={<Loading />}>
          {slideData ? (
            slideData?.map((value, index) => {
              return (
                <SlideCard index={index} userSlideOBject={value} key={index} />
              );
            })
          ) : (
            <>
              <div className="text-black p-2 text-gray-300">Empty Data</div>
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
}
