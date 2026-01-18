
import TextArea from "../text-area";

interface TextAreaSectionProps {
  handleTextDataChanges: (textData: string) => void;
}

const TextAreaSection: React.FC<TextAreaSectionProps> = ({
  handleTextDataChanges,
}) => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center border-1 p-1">
        <TextArea handleTextDataChanges={handleTextDataChanges} />
      </div>
    </>
  );
};

export default TextAreaSection;
