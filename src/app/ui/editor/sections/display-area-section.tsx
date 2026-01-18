import { useState } from "react";
import DisplayPanel from "../display/display-panel";
import DisplayOptions from "../display/display-options";

interface DisplayAreaSectionProps {
  textData: string;
}

const DisplayAreaSection: React.FC<DisplayAreaSectionProps> = ({
  textData,
}) => {
  const [textSize, setTextSize] = useState(16);

  const handleTextSizeChanges = (textSizeNumvber: number) => {
    setTextSize(textSizeNumvber);
  };

  return (
    <>
      <div className="border-1 w-full md:max-h-screen bg-gray-500 justify-center flex  md:order-none order-1 max-h-full relative">
        <div className="flex-1 overflow-y-auto flex h-full justify-center">
          <DisplayPanel textData={textData} textSize={textSize} />
        </div>
        <DisplayOptions handleTextSizeChanges={handleTextSizeChanges} textSize={textSize} />
      </div>
    </>
  );
};
export default DisplayAreaSection;
