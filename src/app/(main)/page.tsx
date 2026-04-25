import Link from "next/link";

export default function MainPage() {
  return (
    <>
      <div className="bg-foreground/80 p-1 xl:w-200 w-full h-100 flex flex-col justify-center items-center text-center gap-2 rounded-sm">
        <p className="text-2xl text-start font-bold">Welcome to ProPre Sim</p>
        <p className="text-sm">
          a ProPresenter Slide Simulator using Text Based Editor
        </p>
        <Link
          href="/editor"
          className="border-1 p-1 bg-foreground text-background hover:bg-yellow-700"
        >
          To Editor
        </Link>
        <div className="border-1 p-1 text-center bg-background text-foreground">
          <p className="text-sm italic">In Development..</p>
          <p className="text-sm">
            Contribute here →
            <Link
              href="https://github.com/akael888/propre-sim"
              className="underline hover:font-bold italic p-1"
            >
              Github
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
