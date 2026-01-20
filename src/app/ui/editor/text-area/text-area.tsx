"use client";

// import { convertInnerHTMLToText, insertDataBlock } from "@/app/lib/utils";
import { useState } from "react";
import TextBlock from "./text-block";
import { TextObject } from "@/app/lib/type";

interface TextAreaProps {
  textData: string;
  handleTextDataChanges: (textData: string) => void;
  handleSlideObjectChanges: <K extends keyof TextObject>(
    index: number,
    objectKey: K,
    objectValue: TextObject[K],
  ) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  textData,
  handleTextDataChanges,
  handleSlideObjectChanges,
}) => {
  const [textValue, setTextValue] = useState(textData);

  const handleTextValueChanges = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextValue(e.target.value);
    handleTextDataChanges(e.target.value);
    localStorage.setItem("TEXT_AREA_DATA", e.target.value);
  };

  return (
    <>
      <div className="w-full h-full overflow-hidden">
        {/* <div
          className=" w-full h-[50%] bg-black top-100 text-white [&>div]:bg-pink-300 overflow-y-hidden"
          contentEditable
          onInput={(e) => convertInnerHTMLToText(e.currentTarget.innerHTML)}
          onBeforeInput={(e) => {
            insertDataBlock(e);
          }}
        ></div> */}
        <textarea
          className="p-2 w-full h-[50%] border-1 bg-gray-400"
          value={textValue}
          onInput={handleTextValueChanges}
          placeholder="Type here.."
        />
      </div>
    </>
  );
};
export default TextArea;
