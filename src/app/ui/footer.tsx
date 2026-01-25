import Link from "next/link";
export default function Footer() {
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;
  return (
    <>
      <div className="grid grid-cols-2 p-2">
        <div className="p-1 flex flex-row justify-start items-end">© 2026 - Elgratio Latuihamallo - v{appVersion}</div>

        <Link
          href="https://github.com/akael888"
          className="text-start p-1 hover:border-foreground border-1 border-background underline italic flex flex-row justify-end items-end"
        >
          Github
        </Link>
      </div>
    </>
  );
}
