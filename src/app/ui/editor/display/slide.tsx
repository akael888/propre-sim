import { SlideProps, TextAttribute, TextObject } from "@/app/lib/type";
import { useState } from "react";

const Slide: React.FC<SlideProps> = ({
  slideNum,
  slideMaxNum,
  slideContent,
  slideTextCharIndex,
  textAttribute,
  textAreaRef,
}) => {
  // convertTextAlignEnumToCSS(textAttribute.textAlign);

  const FocusOnTextArea = (textSearch: string) => {
    const textarea = textAreaRef.current;
    if (!textarea) {
      return;
    }

    const text = textarea.value; //All Text Area Values

    // Spliced Text from the Latest Char Index, to Make sure it wont highlight duplicated ones
    const splicedTextFromCurrentCharIndex = text.substring(
      slideTextCharIndex,
      slideTextCharIndex + textSearch.length,
    );

    // Set the target index
    const targetIndex =
      splicedTextFromCurrentCharIndex.indexOf(textSearch) + slideTextCharIndex;

    if (targetIndex !== 1) {
      textarea.focus();
      textarea.setSelectionRange(targetIndex, targetIndex + textSearch.length);

      const lines = text.substring(0, targetIndex).split("\n").length; //Calculcate how many enter/lines in the text
      const lineHeight = 24; //approx each line height
      const scrollPosition = (lines - 2) * lineHeight; //-3 to give more context above

      textarea.scrollTop = Math.max(0, scrollPosition);
    }
  };

  return (
    <>
      <div
        id={slideTextCharIndex.toString()}
        className={`aspect-video border-1 flex justify-center items-center relative overflow-hidden group`}
        style={{
          containerType: "inline-size",
          backgroundColor: `${textAttribute.textSlideColor}`,
        }}
        onDoubleClick={() => FocusOnTextArea(slideContent)}
      >
        <div
          className="border-1 border-dashed overflow-hidden"
          style={{
            width: `${textAttribute.textContainer.width}%`,
            height: `${textAttribute.textContainer.height}%`,
          }}
        >
          <div className="w-full absolute h-full bg-white/10 group-hover:block hidden"></div>
          <pre
            className={`text-wrap w-full h-full flex items-center justify-center border-black ${textAttribute.textFont.className}`}
            style={{
              fontSize: `${textAttribute.textSize}cqw`,
              fontWeight: `${textAttribute.textStyle.bold ? "bolder" : "normal"}`,
              textShadow: textAttribute.textShadow.isOn
                ? `${textAttribute.textShadow.x}em ${textAttribute.textShadow.y}em ${textAttribute.textShadow.shadowBlur}px ${textAttribute.textShadow.shadowColor}`
                : "", //0.2 -0.02
              textAlign: textAttribute.textAlign,
              paintOrder: textAttribute.textStroke.isOn ? "stroke fill" : "",
              WebkitTextStroke: textAttribute.textStroke.isOn
                ? `${textAttribute.textStroke.strokeSize > 0 ? textAttribute.textStroke.strokeSize : "0"}cqw ${textAttribute.textStroke.strokeColor}`
                : "",
              color: textAttribute.textColor,
            }}
          >
            {slideContent}
          </pre>
        </div>
        <div className="absolute bottom-1 left-1 bg-gray-200/80 p-1 font-bold">
          Slide : {slideNum + 1} / {slideMaxNum}
        </div>
      </div>
    </>
  );
};

export default Slide;
