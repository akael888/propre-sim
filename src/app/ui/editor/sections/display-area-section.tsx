import { useState } from "react";
import DisplayPanel from "../display/display-panel";
import DisplayOptions from "../display/display-options";
import { TextAttribute, TextObject } from "../../../lib/type";
import { textAlignTypes } from "@/app/lib/data";

interface DisplayAreaSectionProps {
  slideObject: TextObject[];
  // handleTextObjectDataChanges: (text: string) => void;
}

const DisplayAreaSection: React.FC<DisplayAreaSectionProps> = ({
  slideObject,
  // handleTextObjectDataChanges,
}) => {
  const [displayedTextAttribute, setDisplayedTextAttribute] =
    useState<TextAttribute>({
      textSize: 6,
      textFont: "string",
      textAlign: "center",
    });

  // const handleTextSizeChanges = (textSizeNumvber: number) => {
  //   setDisplayedTextAttribute({
  //     ...displayedTextAttribute,
  //     textSize: textSizeNumvber,
  //   });
  //   // setTextSize(textSizeNumvber);
  // };

  const handleTextAttributeChanges = <K extends keyof TextAttribute>(
    attribute: K,
    attributeValue: TextAttribute[K],
  ) => {
    setDisplayedTextAttribute((prev) => ({
      ...prev,
      [attribute]: attributeValue,
    }));
  };

  return (
    <>
      <div className="border-1 w-full md:max-h-screen bg-gray-500 justify-center flex  md:order-none order-1 max-h-full relative">
        <div className="flex-1 overflow-y-auto flex h-full justify-center">
          <DisplayPanel
            slideObject={slideObject}
            // handleTextObjectDataChanges={handleTextObjectDataChanges}
            textAttribute={displayedTextAttribute}
          />
        </div>
        <DisplayOptions
          handleTextAttributeChanges={handleTextAttributeChanges}
          textAttribute={displayedTextAttribute}
        />
      </div>
    </>
  );
};
export default DisplayAreaSection;
