import Link from "next/link";

export default function Home() {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-foreground text-background gap-2">
        <p className="text-2xl text-start">Welcome to ProPre Sim (v{appVersion})</p>
        <p>
          by:
          <Link
            href="https://github.com/akael888"
            className="text-start p-1 hover:border-background border-1 border-foreground"
          >
            akael888
          </Link>
        </p>
        <Link
          href="/editor"
          className="border-1 p-1 hover:bg-background hover:text-foreground"
        >
          To Editor
        </Link>
      </div>
    </>
  );
}
