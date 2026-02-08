"use client";

import { getSlideData, submitSlideData } from "@/app/lib/action";
import { parseTextDataToObjects } from "@/app/lib/utils";
import { useEffect, useRef, useState } from "react";
import TextAreaSection from "./sections/text-area-section";
import DisplayAreaSection from "./sections/display-area-section";

export default function Editor({ slideID }: { slideID?: string }) {
  const [textAreaData, setTextAreaData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textObject = parseTextDataToObjects(textAreaData);

  const handleTextAreaDataChanges = (textAreaData: string) => {
    setTextAreaData(textAreaData);
    localStorage.setItem("TEXT_AREA_DATA", textAreaData);
  };

  useEffect(() => {
    async function fetchData() {
      alert(slideID);
      let stored = null;
      if (slideID) {
        stored = await getSlideData(slideID);
        if (stored) handleTextAreaDataChanges(stored.textdata);
      } else {
        stored = localStorage.getItem("TEXT_AREA_DATA");
        if (stored) {
          handleTextAreaDataChanges(stored);
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
        {" "}
        <div className="absolute top-0 bg-white  p-1">
          <form action={submitSlideData} className="gap-2 flex">
            <input
              type="text"
              name="title"
              required
              placeholder="Enter Slide Title"
            />
            <input
              type="text"
              name="description"
              placeholder="Enter Slide Title"
            />
            <input
              type="hidden"
              name="textdata"
              placeholder="Enter Text Data"
              value={textAreaData}
              readOnly
            />
            <button className="border-1 p-1" type="submit">
              Submit Data
            </button>
          </form>
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
