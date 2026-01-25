import Link from "next/link";

export default function MainPage() {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-foreground text-background gap-2">
        <p className="text-2xl text-start">Welcome to ProPre Sim</p>
        <p className="text-sm">
          a ProPresenter Slide Simulator using Text Based Editor
        </p>
        <Link
          href="/editor"
          className="border-1 p-1 hover:bg-background hover:text-foreground"
        >
          To Editor
        </Link>
        <p className="text-sm">In Development..</p>
        <p className="text-sm">
          Contribute here : 
          <Link
            href="https://github.com/akael888/propre-sim"
            className="underline hover:font-bold italic"
          >
            Github
          </Link>
        </p>
      </div>
    </>
  );
}
