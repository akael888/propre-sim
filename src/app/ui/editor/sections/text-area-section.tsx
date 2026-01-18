import TextArea from "../text-area/text-area";

interface TextAreaSectionProps {
  textData: string;
  handleTextDataChanges: (textData: string) => void;
}

const TextAreaSection: React.FC<TextAreaSectionProps> = ({
  textData,
  handleTextDataChanges,
}) => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center border-1 p-1 overflow-y-auto md:order-none order-2">
        <TextArea
          textData={textData}
          handleTextDataChanges={handleTextDataChanges}
        />
      </div>
    </>
  );
};

export default TextAreaSection;
