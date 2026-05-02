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
import { Session } from "next-auth";

type User = Session["user"];

export default function Editor({
  slideID,
  user,
}: {
  slideID?: string;
  user?: User;
}) {
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

  useEffect(() => {
    document.title =
      slideData.title != ""
        ? `${slideData.title} | ProPresenter Simulator`
        : "ProPresenter Simulator";
  }, [slideData.title]);

  const handleSlideDataObjectChanges = (data: {
    title: string;
    description: string;
  }) => {
    setSlideData(data);
  };

  if (!isLoaded) {
    return (
      <div className="flex flex-row justify-center items-center bg-foreground w-screen h-screen">
        <p className="text-center text-background font-black animate-pulse"> Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-w-screen min-h-screen md:grid-rows-none md:max-h-full max-h-screen bg-foreground grid md:grid-cols-2 gap-2 text-background grid-rows-2">
        <TextAreaSection
          textData={textAreaData}
          textObject={textObject}
          handleTextDataChanges={handleTextAreaDataChanges}
          textAreaRef={textAreaRef}
          slideID={slideID}
          textAreaData={textAreaData}
          slideData={slideData}
          slideDataStatic={slideDataStatic}
          handleSlideDataObjectChanges={handleSlideDataObjectChanges}
          isTextAreaNotChanged={isTextAreaNotChanged}
          user={user}
        />
        <DisplayAreaSection
          slideObject={textObject}
          textAreaRef={textAreaRef}
        />
      </div>
    </>
  );
}
