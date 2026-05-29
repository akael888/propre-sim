import { useEffect, useRef, useState } from "react";
import DisplayPanel from "../display/display-panel";
import DisplayOptions from "../display/display-options";
import { DisplayAreaSectionProps, TextAttribute } from "../../../lib/type";
import OptionModal from "../display/display-option-modal";
import HelpModal from "../display/help-modal";
import { useTextAttribute } from "@/app/context/text-attribute-context";
import { useTextData } from "@/app/context/text-data-context";

const DisplayAreaSection: React.FC<DisplayAreaSectionProps> = ({
  textAreaRef,
}) => {
  const slideObject = useTextData().textObject;

  // Modal States
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const slideRef = useRef<HTMLDivElement>(null);
  const [parentSlideSize, setParentSlideSize] = useState({
    width: 1920,
    height: 1080,
  });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        setParentSlideSize((prev) => {
          if (prev.width === newWidth && prev.height === newHeight) return prev;
          return { ...prev, width: newWidth, height: newHeight };
        });
      }
    });

    if (slideRef.current) {
      observer.observe(slideRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {isOptionOpen && (
        <>
          <OptionModal />
          <div
            className="bg-background/50 w-screen h-screen fixed z-1000 md:hidden"
            onClick={() => setIsOptionOpen(!isOptionOpen)}
          />
        </>
      )}{" "}
      {isHelpOpen && (
        <>
          <HelpModal />
          <div
            className="bg-background/50 w-screen h-screen fixed z-1000 md:hidden"
            onClick={() => setIsHelpOpen(!isHelpOpen)}
          />
        </>
      )}
      <div className="border-1 w-full h-dvh bg-gray-500 justify-center flex flex-row  md:order-none order-1 max-h-full relative overflow-hidden">
        <div ref={slideRef} className="absolute inset-0 pointer-events-none" />
        <div className="md:hidden flex absolute bottom-0 z-100 p-1 bg-foreground/10 w-full justify-evenly gap-2">
          <button
            className="border-1 p-1 w-20 rounded-sm bg-foreground"
            onClick={() => setIsOptionOpen(!isOptionOpen)}
          >
            Option
          </button>
          <button
            className="border-1 p-1 w-20 rounded-sm bg-foreground"
            onClick={() => setIsHelpOpen(!isHelpOpen)}
          >
            Help
          </button>
        </div>{" "}
        <div
          className={`flex-1 overflow-y-auto flex flex-row h-full w-full justify-center relative `}
        >
          <DisplayPanel
            slideObject={slideObject}
            textAreaRef={textAreaRef}
            parentSlideSize={parentSlideSize}
          />{" "}
        </div>
        {/* <Help /> */}
      </div>
      <DisplayOptions />
    </>
  );
};
export default DisplayAreaSection;
