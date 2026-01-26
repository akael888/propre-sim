import Link from "next/link";

export default function MainPage() {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-foreground text-background gap-3">
        <p className="text-2xl text-start font-bold">Welcome to ProPre Sim</p>
        <p className="text-sm">
          a ProPresenter Slide Simulator using Text Based Editor
        </p>
        <p>
          Click <strong> [To Editor]</strong> button on the Header ↑
        </p>
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
