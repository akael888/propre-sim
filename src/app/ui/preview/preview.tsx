import { getSlideData } from "@/app/lib/action";
import { parseTextDataToObjects } from "@/app/lib/utils";
import { defaultTextAttributeData } from "@/app/lib/data";
import PreviewPanel from "./preview-panel";
import Link from "next/link";

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
        <div className="absolute top-0 bg-background/50 text-foreground w-full z-100 p-1 inline-flex gap-2 items-center">
          {" "}
          <p className="font-bold">{slideData?.title}</p>
          {slideData?.description ? <p> - </p> : null}
          <p>{slideData?.description}</p>
          <Link
            href={`/slide/${slideID}/edit`}
            className="border-1 bg-yellow-500 hover:bg-yellow-300 p-1 text-background"
          >
            Edit
          </Link>{" "}
          <Link
            href="/slide"
            className="border-1 p-1 bg-foreground text-background hover:bg-blue-700"
          >
            Slide Collections
          </Link>
        </div>
        <PreviewPanel slideObject={slideObject} textAttribute={textAttribute} />
      </div>
    </>
  );
}
