import { useState } from "react";
import DisplayPanel from "../display/display-panel";
import DisplayOptions from "../display/display-options";
import { DisplayAreaSectionProps, TextAttribute } from "../../../lib/type";
import { defaultTextAttributeData } from '../../../lib/data';

const DisplayAreaSection: React.FC<DisplayAreaSectionProps> = ({
  slideObject,
  textAreaRef,
}) => {
  const [displayedTextAttribute, setDisplayedTextAttribute] =
    useState<TextAttribute>(defaultTextAttributeData);

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
