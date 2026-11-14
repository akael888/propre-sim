import { getData, getSession, getXAmountOfData } from "@/app/lib/action";
import SlideCard from "./slide-card";

export default async function SlideCollectionWrapper({
  numberOfData,
}: {
  numberOfData?: number;
}) {
  const slideData = numberOfData
    ? await getXAmountOfData(numberOfData)
    : await getData();

  return (
    <>
      {slideData ? (
        slideData?.map((value, index) => {
          return (
            <SlideCard
              index={index}
              userSlideOBject={value}
              key={index}
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
