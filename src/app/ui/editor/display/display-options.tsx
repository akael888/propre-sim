import { TextAttribute } from "@/app/lib/type";
import { useState } from "react";
import { textAlignTypes } from "../../../lib/data";

interface DisplayOptionsProp {
  textAttribute: TextAttribute;
  handleTextAttributeChanges: <K extends keyof TextAttribute>(
    attribute: K,
    attributeValue: TextAttribute[K],
  ) => void;
}

const DisplayOptions: React.FC<DisplayOptionsProp> = ({
  textAttribute,
  handleTextAttributeChanges,
}) => {
  const [textSizeOpt, setTextSizeOpt] = useState(textAttribute.textSize);
  const [textAlignOpt, setAlignOpt] = useState(textAttribute.textAlign);

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
      <div className=" w-full border-1 bottom-0 h-[10%] absolute bg-gray-400">
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
          <div className="flex justify-center w-full h-full">
            <p>Text Size:</p>
            <button
              className="w-full"
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
              className="border-1 p-1"
              placeholder="Text Size.."
            />
            <button
              className="w-full"
              onClick={() => handleTextSizeOptChanges(textSizeOpt + 1)}
            >
              +
            </button>
          </div>
          <div className="">
            <div>
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
          <div className="">1</div>
          <div className="">1</div>
        </div>
      </div>
    </>
  );
};

export default DisplayOptions;
