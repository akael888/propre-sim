"use client";

import { useEffect, useState } from "react";
import DisplayAreaSection from "../ui/editor/sections/display-area-section";
import TextAreaSection from "../ui/editor/sections/text-area-section";
import { TextObject } from "../lib/type";
import { parseTextDataToObjects } from "../lib/utils";

export default function Editor() {
  const [textAreaData, setTextAreaData] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const [slideObject, setSlideObject] = useState([
    { id: 0, content: "", clicked: false },
  ]);

  const handleSlideObjectChanges = <K extends keyof TextObject>(
    index: number,
    objectKey: K,
    objectValue: TextObject[K],
  ) => {
    setSlideObject((prev) =>
      prev.map((object, i) =>
        i === index ? { ...object, [objectKey]: objectValue } : object,
      ),
    );
    alert(objectKey);
    alert(objectValue);
    console.log("HandleSlide");
    console.log(slideObject);
  };

  const handleTextAreaDataChanges = (textAreaData: string) => {
    setTextAreaData(textAreaData);
    setSlideObject(parseTextDataToObjects(textAreaData));
    localStorage.setItem("TEXT_AREA_DATA", textAreaData);
  };

  useEffect(() => {
    const stored = localStorage.getItem("TEXT_AREA_DATA");
    if (stored) {
      handleTextAreaDataChanges(stored);
      setSlideObject(parseTextDataToObjects(stored));
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
          handleTextDataChanges={handleTextAreaDataChanges}
          handleSlideObjectChanges={handleSlideObjectChanges}
        />
        <DisplayAreaSection
          slideObject={slideObject}
          handleSlideObjectChanges={handleSlideObjectChanges}
        />
      </div>
    </>
  );
}
