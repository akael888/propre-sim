"use client";

// import { convertInnerHTMLToText, insertDataBlock } from "@/app/lib/utils";
import { useState, RefObject } from "react";
import TextBlock from "./text-block";
import { TextAreaProps, TextAreaSectionProps, TextObject } from "@/app/lib/type";

const TextArea: React.FC<TextAreaProps> = ({
  textData,
  handleTextDataChanges,
  textAreaRef,
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
          className="p-2 w-full h-full border-1 bg-gray-400"
          value={textValue}
          onChange={handleTextValueChanges}
          placeholder="Type here.."
          ref={textAreaRef}
        />
      </div>
    </>
  );
};
export default TextArea;
