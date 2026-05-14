import Slide from "./slide";
import { DisplayPanelProps } from "@/app/lib/type";

const DisplayPanel: React.FC<DisplayPanelProps> = ({
  slideObject,
  textAreaRef,
}) => {
  const slideMaxNum = slideObject ? slideObject.length : undefined;

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
            textAreaRef={textAreaRef}
          />
        ))}
        {!slideObject && (
          <>
            <div className="aspect-video text-center flex items-center justify-center bg-white italic">
              Write some text in the Text Editor
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default DisplayPanel;
