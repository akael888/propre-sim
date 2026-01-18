"use client";

import { useState } from "react";
import DisplayAreaSection from "../ui/editor/sections/display-area-section";
import TextAreaSection from "../ui/editor/sections/text-area-section";

export default function Editor() {
  const [textAreaData, setTextAreaData] = useState(() => {
    try {
      const stored = localStorage.getItem("TEXT_AREA_DATA");
      if (stored) {
        return stored;
      }
    } catch (err) {
      console.error("Failed to get text from localStorage:", err);
    }
    return "";
  });

  const handleTextAreaDataChanges = (textAreaData: string) => {
    setTextAreaData(textAreaData);
    localStorage.setItem("TEXT_AREA_DATA", textAreaData);
  };

  return (
    <>
      <div className="min-w-screen min-h-screen bg-foreground grid grid-cols-2 gap-2 text-background">
        <TextAreaSection textData={textAreaData} handleTextDataChanges={handleTextAreaDataChanges} />
        <DisplayAreaSection textData={textAreaData} />
      </div>
    </>
  );
}
