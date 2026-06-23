import { getData, getSession, getXAmountOfData } from "@/app/lib/action";
import SlideCard from "./slide-card";

export default async function SlideCollectionWrapper({
  numberOfData,
}: {
  numberOfData?: number;
}) {
  const session = await getSession();
  const user = session?.user;
  const slideData = numberOfData
    ? await getXAmountOfData(user?.id, numberOfData)
    : await getData(user?.id);

  return (
    <>
      {slideData ? (
        slideData?.map((value, index) => {
          return (
            <SlideCard
              index={index}
              userSlideOBject={value}
              key={index}
              userID={user?.id}
            />
          );
        })
      ) : (
        <>
          <div className="w-full text-center p-2 text-background col-span-3">
            Empty Data
          </div>
        </>
      )}
    </>
  );
}
