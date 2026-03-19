"use client";

import {
  getSlideData,
  submitSlideData,
  updateSlideData,
} from "@/app/lib/action";
import { parseTextDataToObjects } from "@/app/lib/utils";
import { useEffect, useRef, useState } from "react";
import TextAreaSection from "./sections/text-area-section";
import DisplayAreaSection from "./sections/display-area-section";
import Link from "next/link";
import SavePanel from "./text-area/save-panel";

export default function Editor({ slideID }: { slideID?: string }) {
  const [textAreaData, setTextAreaData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  //const [copyPressed, setCopyPressed] = useState(false);

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

  const handleSlideDataObjectChanges = (data: {
    title: string;
    description: string;
  }) => {
    setSlideData(data);
  };

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
        <SavePanel
          slideID={slideID}
          textAreaData={textAreaData}
          slideData={slideData}
          slideDataStatic={slideDataStatic}
          handleSlideDataObjectChanges={handleSlideDataObjectChanges}
          isTextAreaNotChanged={isTextAreaNotChanged}
        />
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
