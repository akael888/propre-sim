import { useState } from "react";

interface DisplayOptionsProp {
  textSize: number;
  handleTextSizeChanges: (textSizeNumvber: number) => void;
}

const DisplayOptions: React.FC<DisplayOptionsProp> = ({
  textSize,
  handleTextSizeChanges,
}) => {
  const [textSizeOpt, setTextSizeOpt] = useState(textSize);

  const handleTextSizeOptChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSizeOpt(Number(e.target.value));
    handleTextSizeChanges(Number(e.target.value));
  };

  return (
    <>
      <div className=" w-full border-1 bottom-0 h-[10%] absolute bg-gray-400">
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
          <div className="flex justify-center w-full h-full">
            <p>Text Size:</p>
            <input
              value={textSizeOpt}
              onInput={handleTextSizeOptChanges}
              type="number"
              className="border-1 p-1"
              placeholder="Text Size.."
            />
          </div>
          <div className="">1</div>
          <div className="">1</div>
          <div className="">1</div>
        </div>
      </div>
    </>
  );
};

export default DisplayOptions;
