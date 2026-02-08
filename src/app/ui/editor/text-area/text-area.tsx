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

  const [waitingClick, setWaitingClick] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [lastClick, setLastClick] = useState(0);

  const handleTextValueChanges = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextValue(e.target.value);
    handleTextDataChanges(e.target.value);
    // localStorage.setItem("TEXT_AREA_DATA", e.target.value);
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
      idToScroll = slidePositionList[slidePositionList.length - 1];
    }
    document.getElementById(`${idToScroll}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const processDoubleClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (lastClick && e.timeStamp - lastClick < 250 && waitingClick) {
      setLastClick(0);
      clearTimeout(waitingClick);
      setWaitingClick(null);
      clickToScrollSlides();
    } else {
      setLastClick(e.timeStamp);
      setWaitingClick(
        setTimeout(() => {
          setWaitingClick(null);
        }, 251),
      );
    }
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
          className="p-2 w-full h-full border-1 bg-gray-400 resize-none"
          value={textValue}
          onChange={handleTextValueChanges}
          placeholder="Type here.."
          onClick={processDoubleClick}
          ref={textAreaRef}
        />
      </div>
    </>
  );
};
export default TextArea;
