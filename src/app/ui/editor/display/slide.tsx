import { TextAttribute } from "@/app/lib/type";
interface SlideProps {
  slideNum: number;
  slideMaxNum: number;
  slideContent: string;
  textAttribute: TextAttribute;
}

const Slide: React.FC<SlideProps> = ({
  slideNum,
  slideMaxNum,
  slideContent,
  textAttribute,
}) => {
  // convertTextAlignEnumToCSS(textAttribute.textAlign);
  return (
    <>
      <div
        className="aspect-video border-1 bg-pink-200 flex justify-center items-center relative overflow-hidden"
        style={{ containerType: "inline-size" }}
      >
        <pre
          className={`text-wrap`}
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
