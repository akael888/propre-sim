import { useState } from "react";
import Slide from "./slide";
import { DisplayPanelProps } from "@/app/lib/type";

const DisplayPanel: React.FC<DisplayPanelProps> = ({
  slideObject,
  textAreaRef,
}) => {
  const slideMaxNum = slideObject ? slideObject.length : undefined;
  const [slideSize, setSlideSize] = useState({ width: 1920, height: 1080 });

  return (
    <>
      <div
        className="border-1 p-2 gap-1 h-fit w-[80%] flex flex-col gap-1  relative"
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
            slideSize={slideSize}
          />
        ))}
        {!slideObject && (
          <>
            <div className="aspect-video text-center flex items-center justify-center bg-white italic">
              Write some text in the Text Editor
            </div>
          </>
        )}
        <div className="absolute top-0">
          <input
            type="range"
            min={0}
            max={2000}
            defaultValue={slideSize.width}
            onInput={(e) =>
              setSlideSize((prev) => ({
                ...prev,
                width: Number(e.target.value),
              }))
            }
          />{" "}
          <input
            type="range"
            min={0}
            max={2000}
            defaultValue={slideSize.height}
            onInput={(e) =>
              setSlideSize((prev) => ({
                ...prev,
                height: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>
    </>
  );
};
export default DisplayPanel;
