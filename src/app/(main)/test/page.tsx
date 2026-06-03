export default function TestPage({}) {
  return (
    <>
      <div className="w-full h-full">
        <input type="range" id="volume" name="volume" min="0" max="100"></input>
        Input
        <input className="" type="range" min={0} max={100} />
      </div>
      {/* Parent */}
      <div className="w-screen h-screen bg-blue-200 flex flex-col items-center justify-center">
        {/* Slide */}
        <div
          className="bg-pink-800 border-3 border-blue-800"
          style={{ width: 1920, height: 1080 }}
        >
          Slide
        </div>
      </div>
    </>
  );
}
