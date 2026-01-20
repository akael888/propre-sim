import { TextAttribute, TextObject } from "@/app/lib/type";
interface SlideProps {
  slideNum: number;
  slideMaxNum: number;
  slideContent: string;
  textAttribute: TextAttribute;
  handleSlideObjectChanges: <K extends keyof TextObject>(
    index: number,
    objectKey: K,
    objectValue: TextObject[K],
  ) => void;
}

const Slide: React.FC<SlideProps> = ({
  slideNum,
  slideMaxNum,
  slideContent,
  textAttribute,
  handleSlideObjectChanges,
}) => {
  // convertTextAlignEnumToCSS(textAttribute.textAlign);
  return (
    <>
      <div
        className="aspect-video border-1 bg-pink-200 flex justify-center items-center relative overflow-hidden hover:bg-pink-100"
        style={{ containerType: "inline-size" }}
        onClick={() => handleSlideObjectChanges(slideNum, "clicked", true)}
        onKeyUp={() => handleSlideObjectChanges(slideNum, "clicked", false)}
      >
        <pre
          className={`border-1`}
          style={{
            fontSize: `${textAttribute.textSize}cqw`,
            textAlign: textAttribute.textAlign,
          }}
        >
          {slideContent}
        </pre>
        <div className="absolute bottom-10 left-10 bg-gray-200 p-1">
          Slide : {slideNum + 1} / {slideMaxNum}
        </div>
      </div>
    </>
  );
};

export default Slide;
