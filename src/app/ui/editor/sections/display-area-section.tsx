import { useState } from "react";
import DisplayPanel from "../display/display-panel";
import DisplayOptions from "../display/display-options";
import { DisplayAreaSectionProps, TextAttribute } from "../../../lib/type";
import { defaultTextAttributeData } from "../../../lib/data";

const DisplayAreaSection: React.FC<DisplayAreaSectionProps> = ({
  slideObject,
  textAreaRef,
}) => {
  const [displayedTextAttribute, setDisplayedTextAttribute] =
    useState<TextAttribute>(() => {
      try {
        const stored = localStorage.getItem("TEXT_ATTRIBUTE_DATA");
        if (stored) {
          const parsed = JSON.parse(stored);
          return parsed;
        }
      } catch (err) {
        console.log(err);
      }
      return defaultTextAttributeData; //test
    });

  const handleTextAttributeChanges = <K extends keyof TextAttribute>(
    attribute: K,
    attributeValue: TextAttribute[K],
  ) => {
    setDisplayedTextAttribute((prev) => ({
      ...prev,
      [attribute]: attributeValue,
    }));
    localStorage.setItem(
      "TEXT_ATTRIBUTE_DATA",
      JSON.stringify(displayedTextAttribute),
    );
  };

  return (
    <>
      <div className="border-1 w-full md:max-h-screen bg-gray-500 justify-center flex  md:order-none order-1 max-h-full relative">
        <div className="flex-1 overflow-y-auto flex h-full justify-center">
          <DisplayPanel
            slideObject={slideObject}
            textAttribute={displayedTextAttribute}
            textAreaRef={textAreaRef}
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
