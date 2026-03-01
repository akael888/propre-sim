"use client";

import {
  getSlideData,
  submitSlideData,
  updateSlideData,
} from "@/app/lib/action";
import { copyToClipboard, parseTextDataToObjects } from "@/app/lib/utils";
import { useEffect, useRef, useState } from "react";
import TextAreaSection from "./sections/text-area-section";
import DisplayAreaSection from "./sections/display-area-section";
import Link from "next/link";

export default function Editor({ slideID }: { slideID?: string }) {
  const [textAreaData, setTextAreaData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [copyPressed, setCopyPressed] = useState(false);

  const [slideDataStatic, setSlideDataStatic] = useState({
    title: "",
    description: "",
    textdata: "",
  });

  const [slideData, setSlideData] = useState({
    title: "",
    description: "",
  });

  const isTextAreaNotChanged =
    slideDataStatic.textdata === textAreaData &&
    slideData.title === slideDataStatic.title &&
    slideData.description === slideDataStatic.description;

  const textObject = parseTextDataToObjects(textAreaData);

  const handleTextAreaDataChanges = (textAreaData: string) => {
    setTextAreaData(textAreaData);

    if (!slideID) {
      localStorage.setItem("TEXT_AREA_DATA", textAreaData);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // alert(slideID);
      let stored = null;
      if (slideID) {
        stored = await getSlideData(slideID);

        if (stored) {
          const data = stored as {
            title: string;
            description: string;
            textdata: string;
          };
          setSlideDataStatic(data);
          setSlideData(data);
          setTextAreaData(data.textdata);
        }
      } else {
        stored = localStorage.getItem("TEXT_AREA_DATA");
        if (stored) {
          setTextAreaData(stored);
        }
      }

      setIsLoaded(true);
    }
    fetchData();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex flex-row justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="min-w-screen min-h-screen md:grid-rows-none md:max-h-full max-h-screen bg-foreground grid md:grid-cols-2 gap-2 text-background grid-rows-2">
        <div className="absolute md:top-0 md:left-50 bg-foreground/50 z-1000 p-1 flex flex-row gap-5 max-w-screen ">
          {!slideID ? (
            <>
              <form
                action={submitSlideData}
                className="gap-2 flex max-w-screen"
              >
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Enter Slide Title"
                  className="w-full"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Enter Slide Description"
                  className="w-full"
                />
                <input
                  type="hidden"
                  name="textdata"
                  placeholder="Enter Text Data"
                  value={textAreaData}
                  readOnly
                />
                <button
                  className="border-1 p-1 hover:bg-gray-500 bg-gray-300 w-full"
                  type="submit"
                >
                  Save Data
                </button>
                <Link
                  href="/slide"
                  className="border-1 p-1 bg-foreground text-background hover:bg-blue-700 w-full text-center"
                >
                  Slide Collections
                </Link>
              </form>
            </>
          ) : (
            <>
              <form action={updateSlideData} className="gap-2 flex w-full [&>*]:w-full ">
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Enter Slide Title"
                  defaultValue={slideDataStatic.title}
                  onChange={(e) =>
                    setSlideData({ ...slideData, title: e.target.value })
                  }
                  className="w-[20%]"
                />
                <input
                  type="text"
                  name="description"
                  defaultValue={slideDataStatic.description}
                  placeholder="Enter Slide Description"
                  className="w-[0%]"
                  onChange={(e) =>
                    setSlideData({ ...slideData, description: e.target.value })
                  }
                />
                <input
                  type="hidden"
                  name="textdata"
                  value={textAreaData}
                  readOnly
                />
                <input type="hidden" name="slideID" value={slideID} readOnly />
                <button
                  className="border-1 p-1 bg-green-500 hover:bg-green-600 disabled:bg-background disabled:text-foreground w-fit"
                  type="submit"
                  disabled={isTextAreaNotChanged}
                
                >
                  Save {isTextAreaNotChanged ? null : "*"}
                </button>
              </form>
              <Link
                href={`/slide/${slideID}/preview`}
                className="border-1 bg-blue-200 p-1 w-fit items-center flex justify-center"
              >
                Preview
              </Link>{" "}
              <Link
                href="/slide"
                className="border-1 p-1 bg-foreground text-background hover:bg-blue-700 text-center"
              >
                Slide Collections
              </Link>
              {/* <button
                onClick={() => {
                  setCopyPressed(copyToClipboard());
                }}
                className="p-1 border-1 bg-white"
              >
                Share
              </button> */}
            </>
          )}
        </div>
        <TextAreaSection
          textData={textAreaData}
          textObject={textObject}
          handleTextDataChanges={handleTextAreaDataChanges}
          textAreaRef={textAreaRef}
        />
        <DisplayAreaSection
          slideObject={textObject}
          textAreaRef={textAreaRef}
        />
      </div>
    </>
  );
}
