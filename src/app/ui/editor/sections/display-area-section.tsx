import DisplayPanel from "../display-panel";

interface DisplayAreaSectionProps {
  textData: string;
}

const DisplayAreaSection: React.FC<DisplayAreaSectionProps> = ({
  textData,
}) => {
  return (
    <>
      <div className="w-full h-full">
        <DisplayPanel textData={textData} />
      </div>
    </>
  );
};
export default DisplayAreaSection;
