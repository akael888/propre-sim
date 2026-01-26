"use client";

import { useEffect, useRef, useState } from "react";
import DisplayAreaSection from "../ui/editor/sections/display-area-section";
import TextAreaSection from "../ui/editor/sections/text-area-section";
import { parseTextDataToObjects } from "../lib/utils";


export default function Editor() {
  const [textAreaData, setTextAreaData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textObject = parseTextDataToObjects(textAreaData);

  const handleTextAreaDataChanges = (textAreaData: string) => {
    setTextAreaData(textAreaData);
    localStorage.setItem("TEXT_AREA_DATA", textAreaData);
  };

  useEffect(() => {
    const stored = localStorage.getItem("TEXT_AREA_DATA");
    if (stored) {
      handleTextAreaDataChanges(stored);
    }
    setIsLoaded(true);
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
