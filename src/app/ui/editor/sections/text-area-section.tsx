import { TextAreaSectionProps, TextObject } from "@/app/lib/type";
import TextArea from "../text-area/text-area";
import { RefObject } from "react";
import SaveSection from "./save-area-section";

const TextAreaSection: React.FC<TextAreaSectionProps> = ({
  textData,
  textObject,
  handleTextDataChanges,
  textAreaRef,
  slideID,
  textAreaData,
  slideData,
  slideDataStatic,
  handleSlideDataObjectChanges,
  isTextAreaNotChanged,
  user,
}) => {
  return (
    <>
      <div className="w-full h-full flex-col flex justify-center items-center border-1 p-1 overflow-y-auto md:order-none order-2">
        <SaveSection
          slideID={slideID}
          textAreaData={textAreaData}
          slideData={slideData}
          slideDataStatic={slideDataStatic}
          handleSlideDataObjectChanges={handleSlideDataObjectChanges}
          isTextAreaNotChanged={isTextAreaNotChanged}
          user={user}
        />
        <TextArea
          textData={textData}
          textObject={textObject}
          handleTextDataChanges={handleTextDataChanges}
          textAreaRef={textAreaRef}
        />
      </div>
    </>
  );
};

export default TextAreaSection;
