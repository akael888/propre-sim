import { TextAreaSectionProps, TextObject } from "@/app/lib/type";
import TextArea from "../text-area/text-area";
import SaveSection from "./save-area-section";

const TextAreaSection: React.FC<TextAreaSectionProps> = ({
  textAreaRef,
  slideID,
  user,
}) => {
  return (
    <>
      <div className="w-full h-full flex-col flex justify-center items-center border-1 p-1 overflow-y-auto md:order-none order-2">
        <SaveSection
          slideID={slideID}
          user={user}
        />
        <TextArea
          textAreaRef={textAreaRef}
        />
      </div>
    </>
  );
};

export default TextAreaSection;
