interface TextBlockProps {
  textId: number;
}

const TextBlock: React.FC<TextBlockProps> = ({ textId }) => {
  return (
    <>
      <div>{textId}</div>
    </>
  );
};

export default TextBlock;
