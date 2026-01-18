interface SlideProps {
  slideNum: number;
  slideMaxNum: number;
  slideContent: string;
}

const Slide: React.FC<SlideProps> = ({
  slideNum,
  slideMaxNum,
  slideContent,
}) => {
  return (
    <>
      <div className="aspect-video border-1 bg-pink-200 flex justify-center items-center relative">
        <pre>{slideContent}</pre>
        <div className="absolute bottom-10 left-10 bg-gray-200 p-1">
          Slide : {slideNum + 1} / {slideMaxNum}
        </div>
      </div>
    </>
  );
};

export default Slide;
