import { SlideProps, TextAttribute, TextObject } from "@/app/lib/type";

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
      const scrollPosition = lines * lineHeight; //-3 to give more context above

      textarea.scrollTop = Math.max(0, scrollPosition);
    }
  };

  return (
    <>
      <div
        id={slideTextCharIndex.toString()}
        className="aspect-video border-1 bg-pink-200 flex justify-center items-center relative overflow-hidden hover:bg-pink-100"
        style={{ containerType: "inline-size" }}
        onClick={() => FocusOnTextArea(slideContent)}
      >
        <div className="border-1 overflow-hidden w-[70%] h-[60%]">
          <pre
            className={`text-wrap w-full h-full flex items-center justify-center ${textAttribute.textFont.className}`}
            style={{
              fontSize: `${textAttribute.textSize}cqw`,
              textAlign: textAttribute.textAlign,
            }}
          >
            {slideContent}
          </pre>
        </div>
        <div className="absolute bottom-10 left-10 bg-gray-200 p-1">
          Slide : {slideNum + 1} / {slideMaxNum}
        </div>
      </div>
    </>
  );
};

export default Slide;
