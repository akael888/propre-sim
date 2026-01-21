"use client";
import { useState, RefObject } from "react";
import { TextAreaProps } from "@/app/lib/type";

const TextArea: React.FC<TextAreaProps> = ({
  textData,
  textObject,
  handleTextDataChanges,
  textAreaRef,
}) => {
  const [textValue, setTextValue] = useState(textData);
  const slidePositionList = textObject?.map((object) => object.charIndex);

  const handleTextValueChanges = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextValue(e.target.value);
    handleTextDataChanges(e.target.value);
    localStorage.setItem("TEXT_AREA_DATA", e.target.value);
  };

  const clickToScrollSlides = () => {
    const refClicked = textAreaRef.current;
    if (!refClicked) {
      return;
    }

    const indexClicked = refClicked.selectionStart;

    const indexIdToScroll = slidePositionList.findIndex(
      (pos) => indexClicked < pos,
    );

    let idToScroll = null;
    if (indexIdToScroll != -1) {
      idToScroll = slidePositionList[indexIdToScroll - 1];
    } else {
      idToScroll = slidePositionList[slidePositionList.length-1];
    }
    // console.log("indexClicked");
    // console.log(indexClicked);
    // console.log(slidePositionList);

    // console.log("indexIdToScroll");
    // console.log(indexIdToScroll);
    // console.log("idToScroll");
    // console.log(idToScroll);

    document.getElementById(`${idToScroll}`)?.scrollIntoView({
      behavior: "smooth",
    });
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
          onClick={clickToScrollSlides}
          ref={textAreaRef}
        />
      </div>
    </>
  );
};
export default TextArea;
