import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="w-screen h-screen bg-foreground text-background flex flex-col justify-center items-center gap-2">
        <h2 className="font-bold text-2xl">Not Found</h2>
        <div className="flex p-1 gap-2">
          <Link href="/" className="border-1 w-20 p-1 hover:bg-background/20 text-center">
            Home
          </Link>
          <Link href="/editor" className="border-1 w-20  p-1 hover:bg-background/20 text-center">
            Editor
          </Link>
        </div>
      </div>
    </>
  );
}
