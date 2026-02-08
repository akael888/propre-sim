import { getSlideData } from "@/app/lib/action";
import { parseTextDataToObjects } from "@/app/lib/utils";
import { defaultTextAttributeData } from "@/app/lib/data";
import PreviewPanel from "./preview-panel";

export default async function Preview({ slideID }: { slideID: string }) {
  const stored = await getSlideData(slideID);

  const slideObject = stored
    ? parseTextDataToObjects(stored.textdata.toString())
    : [];

  const slideData = stored
    ? { title: stored.title, description: stored.description }
    : null;

  console.log(slideObject.length);

  const textAttribute = defaultTextAttributeData;

  return (
    <>
      <div className="w-full grid grid-cols-4 justify-center text-black bg-gray-600 relative">
        <div className="absolute top-0 bg-background/50 text-foreground w-full z-100 p-1">
          {" "}
          <p className="font-bold">{slideData?.title}</p>
          {slideData?.description ? <p> - </p> : null}
          <p>{slideData?.description}</p>
        </div>
        <PreviewPanel slideObject={slideObject} textAttribute={textAttribute} />
      </div>
    </>
  );
}
