export default function LoadingScreen({}) {
  return (
    <div className="flex flex-row justify-center items-center bg-foreground w-screen h-screen">
      <p className="text-center text-background font-black animate-pulse">
        {" "}
        Loading...
      </p>
    </div>
  );
}
