import { useEffect, useState } from "react";
import DisplayPanel from "../display/display-panel";
import DisplayOptions from "../display/display-options";
import { DisplayAreaSectionProps, TextAttribute } from "../../../lib/type";
import { defaultTextAttributeData } from "../../../lib/data";
import Help from "../display/help";
import OptionModal from "../display/display-option-modal";

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

  useEffect(() => {
    localStorage.setItem(
      "TEXT_ATTRIBUTE_DATA",
      JSON.stringify(displayedTextAttribute),
    );
  }, [displayedTextAttribute]);

  const handleTextAttributeChanges = <K extends keyof TextAttribute>(
    attribute: K,
    attributeValue: TextAttribute[K],
  ) => {
    setDisplayedTextAttribute((prev) => ({
      ...prev,
      [attribute]: attributeValue,
    }));
  };

  const handleTextAttributeObjectChanges = (newObject: TextAttribute) => {
    setDisplayedTextAttribute(newObject);
  };

  const [isOptionOpen, setIsOptionOpen] = useState(false);

  return (
    <>
      {isOptionOpen && (
        <>
          <OptionModal
            handleTextAttributeChanges={handleTextAttributeChanges}
            handleTextAttributeObjectChanges={handleTextAttributeObjectChanges}
            textAttribute={displayedTextAttribute}
          />{" "}
          <div
            className="bg-background/50 w-screen h-screen fixed z-1000 md:hidden"
            onClick={() => setIsOptionOpen(!isOptionOpen)}
          />
        </>
      )}
      <div className="border-1 w-full md:max-h-screen bg-gray-500 justify-center flex flex-row  md:order-none order-1 max-h-full relative">
        <div className="md:hidden flex absolute bottom-0 z-100 p-1 bg-foreground/10 w-full justify-evenly gap-2">
          <button
            className="border-1 p-1 w-20 rounded-sm bg-foreground"
            onClick={() => setIsOptionOpen(!isOptionOpen)}
          >
            Option
          </button>
          <button className="border-1 p-1 w-20 rounded-sm bg-foreground">
            Help
          </button>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-row h-full justify-center ">
          <DisplayPanel
            slideObject={slideObject}
            textAttribute={displayedTextAttribute}
            textAreaRef={textAreaRef}
          />{" "}
        </div>

        {/* <Help /> */}
      </div>
      <DisplayOptions
        handleTextAttributeChanges={handleTextAttributeChanges}
        handleTextAttributeObjectChanges={handleTextAttributeObjectChanges}
        textAttribute={displayedTextAttribute}
      />
    </>
  );
};
export default DisplayAreaSection;
