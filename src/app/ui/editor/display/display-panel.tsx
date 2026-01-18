import { parseTextDataToObjects } from "@/app/lib/data";
import Slide from "./slide";
import { useEffect, useState } from "react";

interface DisplayPanelProps {
  textData: string;
}

const DisplayPanel: React.FC<DisplayPanelProps> = ({ textData }) => {
  const [slideObject, setSlideObject] = useState(parseTextDataToObjects(""));

  useEffect(() => {
    setSlideObject(parseTextDataToObjects(textData));
  }, [textData]);

  const slideMaxNum = slideObject.length;

  return (
    <>
      <div className="border-1 p-2 gap-1 h-fit w-[80%] flex flex-col gap-1 ">
        {slideObject?.map((slideData) => (
          <Slide
            key={slideData.id}
            slideNum={slideData.id}
            slideMaxNum={slideMaxNum}
            slideContent={slideData.content}
          />
        ))}
      </div>
    </>
  );
};
export default DisplayPanel;
