import Slide from "./slide";
import { DisplayPanelProps } from "@/app/lib/type";

const DisplayPanel: React.FC<DisplayPanelProps> = ({
  slideObject,
  textAttribute,
  textAreaRef,
}) => {
  const slideMaxNum = slideObject.length;

  return (
    <>
      <div
        className="border-1 p-2 gap-1 h-fit w-[80%] flex flex-col gap-1 "
        style={{ scrollBehavior: "smooth" }}
      >
        {slideObject?.map((slideData) => (
          <Slide
            key={slideData.id}
            slideNum={slideData.id}
            slideMaxNum={slideMaxNum}
            slideContent={slideData.content}
            slideTextCharIndex={slideData.charIndex}
            textAttribute={textAttribute}
            textAreaRef={textAreaRef}
          />
        ))}
      </div>
    </>
  );
};
export default DisplayPanel;
