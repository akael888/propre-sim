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
        setParentSlideSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
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
          <div className="bg-white h-fit w-fit p-1 gap-2 flex">
            {" "}
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
        </div>{" "}
      </div>
    </>
  );
};
export default DisplayPanel;
