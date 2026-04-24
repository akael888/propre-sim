import { getData, getSession } from "@/app/lib/action";
import SlideCard from "./slide-card";

export default async function SlideCollectionWrapper() {
  const session = await getSession();
  const user = session?.user;
  const slideData = await getData(user?.id);

  return (
    <>
      {slideData ? (
        slideData?.map((value, index) => {
          return (
            <SlideCard index={index} userSlideOBject={value} key={index} />
          );
        })
      ) : (
        <>
          <div className="w-full text-center p-2 text-gray-500 col-span-3">
            Empty Data
          </div>
        </>
      )}
    </>
  );
}
