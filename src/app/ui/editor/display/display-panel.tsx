import { useEffect, useRef, useState } from "react";
import Slide from "./slide";
import { DisplayPanelProps } from "@/app/lib/type";

const DisplayPanel: React.FC<DisplayPanelProps> = ({
  slideObject,
  textAreaRef,
}) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const [parentSlideSize, setParentSlideSize] = useState({
    width: 1920,
    height: 1080,
  });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        setParentSlideSize((prev) => {
          if (prev.width === newWidth) return prev;
          return { ...prev, width: newWidth };
        });
      }
    });

    if (slideRef.current) {
      observer.observe(slideRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const slideMaxNum = slideObject ? slideObject.length : undefined;
  const [slideSize, setSlideSize] = useState({ width: 1920, height: 1080 });

  return (
    <>
      {" "}
      <div
        className="flex-1 overflow-y-auto flex flex-row h-full w-full justify-center relative"
        ref={slideRef}
      >
        {" "}
        <div className="bg-white h-fit w-fit p-1 gap-2 fixed  top-0 z-100">
          <div>
            Parent Slide Size {parentSlideSize.width} x {parentSlideSize.height}
          </div>{" "}
          <div>
            Slide Size {slideSize.width} x {slideSize.height}
          </div>
          <input
            defaultValue={slideSize.width}
            onInput={(e) =>
              setSlideSize((prev) => ({
                ...prev,
                width: Number(e.target.value),
              }))
            }
          />
          <label>Width</label>
          <input
            defaultValue={slideSize.height}
            onInput={(e) =>
              setSlideSize((prev) => ({
                ...prev,
                height: Number(e.target.value),
              }))
            }
          />
          <label>Height</label>
        </div>
        <div
          className="border-1 p-2 gap-1 h-fit w-full flex flex-col gap-1   justify-center items-center"
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
              parentSlideSize={parentSlideSize}
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
            {/* <input
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
          />
          <label>{slideSize.width}</label> <label>{slideSize.height}</label>
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
          /> */}
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};
export default DisplayPanel;
