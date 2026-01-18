import DisplayPanel from "../display/display-panel";

interface DisplayAreaSectionProps {
  textData: string;
}

const DisplayAreaSection: React.FC<DisplayAreaSectionProps> = ({
  textData,
}) => {
  return (
    <>
      <div className="border-1 w-full max-h-screen bg-gray-500 justify-center  flex overflow-y-auto">
        <DisplayPanel textData={textData} />
      </div>
    </>
  );
};
export default DisplayAreaSection;
