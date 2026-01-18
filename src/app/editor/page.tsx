"use client";

import { useState } from "react";
import DisplayAreaSection from "../ui/editor/sections/display-area-section";
import TextAreaSection from "../ui/editor/sections/text-area-section";


export default function Editor() {
  const [textAreaData, setTextAreaData] = useState("");

  const handleTextAreaDataChanges = (textAreaData: string) => {
    setTextAreaData(textAreaData);
  };

  return (
    <>
      <div className="min-w-screen min-h-screen bg-foreground grid grid-cols-2 gap-2 text-background">
        <TextAreaSection handleTextDataChanges={handleTextAreaDataChanges} />
        <DisplayAreaSection textData={textAreaData} />
      </div>
    </>
  );
}
