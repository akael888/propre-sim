function LoadingSlide() {
  const elements = [];
  for (let i = 0; i < 9; i++) {
    elements.push(
      <div
        className="bg-background/20 h-full w-full text-background text-center overflow-y-hidden p-2 flex flex-col rounded-xl animate-pulse"
        key={i}
      >
        <div className="flex flex-col h-full">
          <div className="2xl:grid 2xl:grid-cols-1 flex flex-col h-full">
            <div className="flex flex-col p-2 h-fit">
              <h3 className="text-2xl font-bold truncate h-10"></h3>
              <p className="h-5"></p>
            </div>
          </div>

          <div className="flex p-1 p-2 h-full flex-col">
            <div className="text-left w-full p-2 h-40 overflow-y-auto whitespace-pre-wrap  inset-shadow-sm bg-gray-300 ">
            </div>
            <div className="flex flex-row justify-between p-1">
              <p className="h-5"></p>

              <p className="h-5"></p>
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-row p-2 justify-end items-center gap-2 h-full">
          <div className=" p-1 bg-white/50 w-20 rounded-sm h-8"></div>
          <div className=" p-1 bg-white/50 w-20 rounded-sm h-8"></div>
          <div className="p-1  bg-white/50 w-20 rounded-sm h-8"></div>
        </div>
      </div>,
    );
  }
  return <>{elements}</>;
}

export default LoadingSlide;
