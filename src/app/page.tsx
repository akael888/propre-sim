import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-foreground text-background gap-2">
        <p>Welcome to ProPre Sim</p>
        <Link href="/editor" className="border-1 p-1">To Editor</Link>
      </div>
    </>
  );
}
