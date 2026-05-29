import { useEffect, useRef, useState } from "react";
import Slide from "./slide";
import { DisplayPanelProps } from "@/app/lib/type";

const DisplayPanel: React.FC<DisplayPanelProps> = ({
  slideObject,
  textAreaRef,
  parentSlideSize,
}) => {
  const slideMaxNum = slideObject ? slideObject.length : undefined;
  const [slideSize, setSlideSize] = useState({ width: 1920, height: 1080 });
  const paddingSize = 10; //in Px

  return (
    <>
      {" "}
      <div
        className={`flex-1 overflow-y-auto flex flex-row h-full w-full justify-center relative `}
      >
        {" "}
        <div className="bg-white h-fit w-fit p-1 gap-2 fixed top-0 z-100 rounded-sm">
          <div className="flex flex-col">
            {" "}
            {/* <div>
            Parent Slide Size {parentSlideSize.width} x {parentSlideSize.height}
          </div>{" "}
          <div>
            Slide Size {slideSize.width} x {slideSize.height}
          </div> */}
            <div className="flex flex-row gap-2 p-2">
              <div className="relative">
                <input
                  defaultValue={slideSize.width}
                  onInput={(e) =>
                    setSlideSize((prev) => ({
                      ...prev,
                      width: Math.max(
                        800,
                        Math.min(1920, Number(e.target.value)),
                      ),
                    }))
                  }
                  placeholder="Width"
                  className="w-20 border-1 p-1 truncate"
                  type="number"
                  max={1920}
                  min={800}
                />
                <div className="absolute right-1 top-1 p-0.5 bg-background/10">
                  pt
                </div>
              </div>{" "}
              <div className="relative">
                {" "}
                <input
                  defaultValue={slideSize.height}
                  onInput={(e) =>
                    setSlideSize((prev) => ({
                      ...prev,
                      height: Math.max(
                        600,
                        Math.min(1080, Number(e.target.value)),
                      ),
                    }))
                  }
                  placeholder="Height"
                  className="w-20 border-1 p-1 truncate"
                  type="number"
                  max={1080}
                  min={600}
                />{" "}
                <div className="absolute right-1 top-1 p-0.5 bg-background/10">
                  pt
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="border-1  gap-1 h-fit w-full flex flex-col gap-1 justify-center items-center overflow-hidden"
          style={{ padding: `${paddingSize}px`, scrollBehavior: "smooth" }}
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
              parentSlideSize={{
                width: parentSlideSize.width - paddingSize * 2,
                height: parentSlideSize.height - paddingSize * 2,
              }}
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
