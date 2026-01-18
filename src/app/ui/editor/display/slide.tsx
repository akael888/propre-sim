interface SlideProps {
  slideNum: number;
  slideMaxNum: number;
  slideContent: string;
  textSize: number;
}

const Slide: React.FC<SlideProps> = ({
  slideNum,
  slideMaxNum,
  slideContent,
  textSize,
}) => {
  return (
    <>
      <div className="aspect-video border-1 bg-pink-200 flex justify-center items-center relative">
        <pre
          className={`absolute text-center`}
          style={{ fontSize: `${textSize}px` }}
        >
          {slideContent}
        </pre>
        <div className="absolute bottom-10 left-10 bg-gray-200 p-1">
          Slide : {slideNum + 1} / {slideMaxNum}
        </div>
      </div>
    </>
  );
};

export default Slide;
