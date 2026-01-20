import { DisplayOptionsProp, TextAttribute } from "@/app/lib/type";
import { useState } from "react";
import { textAlignTypes } from "../../../lib/data";

const DisplayOptions: React.FC<DisplayOptionsProp> = ({
  textAttribute,
  handleTextAttributeChanges,
}) => {
  const [textSizeOpt, setTextSizeOpt] = useState(textAttribute.textSize);
  const [textAlignOpt, setAlignOpt] = useState(textAttribute.textAlign);
  const [isOpen, setIsOpen] = useState(false);

  const handleTextSizeOptChanges = (textSizeData: number) => {
    setTextSizeOpt(textSizeData);
    handleTextAttributeChanges("textSize", textSizeData);
  };

  const handleTextAlignOptChanges = (textAlignData: textAlignTypes) => {
    setAlignOpt(textAlignData);
    handleTextAttributeChanges("textAlign", textAlignData);
  };

  return (
    <>
      <div
        className={`w-full bottom-0 md:h-fit h-${isOpen ? "20%" : "0"} absolute flex flex-col justify-end items-start`}
      >
        <button
          className="bg-black w-fit border-1 text-white p-1 "
          onClick={() => setIsOpen(!isOpen)}
        >
          Options
        </button>
        {isOpen ? (
          <div className=" w-full border-1 bottom-0 h-full  bg-gray-300">
            <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
              <div className="flex justify-center w-fit h-full">
                <div className="flex md:flex-row flex-col p-3 w-fit">
                  <div className="w-fit p-2 h-full flex items-center text-center">
                    Text Size:
                  </div>
                  <div className="flex flex-row w-full">
                    <button
                      className="w-[20%] bg-red-400"
                      onClick={() => handleTextSizeOptChanges(textSizeOpt - 1)}
                    >
                      -
                    </button>
                    <input
                      value={textSizeOpt}
                      onInput={(e) =>
                        handleTextSizeOptChanges(Number(e.currentTarget.value))
                      }
                      type="number"
                      className="border-1 p-1 max-w-[20%] text-center bg-white"
                      placeholder="Text Size"
                    />
                    <button
                      className="w-[20%] bg-green-400"
                      onClick={() => handleTextSizeOptChanges(textSizeOpt + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="">
                <div>
                  <div>Text Alignment:</div>
                  <select
                    value={textAlignOpt}
                    onChange={(e) => {
                      const value = e.target.value as textAlignTypes;
                      handleTextAlignOptChanges(value);
                    }}
                  >
                    <option value={"left"}>left</option>
                    <option value={"center"}>center</option>
                    <option value={"right"}>right</option>
                    <option value={"justify"}>justify</option>
                  </select>
                </div>
              </div>
              <div className="">
                {/* <a href="#DOA SYUKUR">
                  <button type="button">scroll</button>
                </a> */}
              </div>
              <div className="">1</div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DisplayOptions;
