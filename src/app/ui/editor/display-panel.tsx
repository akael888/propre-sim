interface DisplayPanelProps {
  textData: string;
}

const DisplayPanel: React.FC<DisplayPanelProps> = ({ textData }) => {
  return (
    <>
      <div className="aspect-video border-1">{textData}</div>
    </>
  );
};
export default DisplayPanel;
