import { parseTextDataToObjects } from "@/app/lib/utils";
import Slide from "./slide";
import { useEffect, useState } from "react";
import { TextAttribute } from "@/app/lib/type";

interface DisplayPanelProps {
  textData: string;
  textAttribute: TextAttribute;
}

const DisplayPanel: React.FC<DisplayPanelProps> = ({ textData, textAttribute }) => {
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
            textAttribute={textAttribute}
          />
        ))}
      </div>
    </>
  );
};
export default DisplayPanel;
