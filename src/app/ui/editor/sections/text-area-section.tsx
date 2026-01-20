import { TextAreaSectionProps, TextObject } from "@/app/lib/type";
import TextArea from "../text-area/text-area";
import { RefObject } from "react";

const TextAreaSection: React.FC<TextAreaSectionProps> = ({
  textData,
  textObject,
  handleTextDataChanges,
  textAreaRef,
}) => {



  return (
    <>
      <div className="w-full h-full flex justify-center items-center border-1 p-1 overflow-y-auto md:order-none order-2">
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
