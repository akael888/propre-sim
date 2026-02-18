import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="w-full grid grid-cols-2 sticky top-0 bg-black h-[50%]">
        <div className="flex flex-row justify-start items-center w-full">
          <div className="p-2">ProPresenter Sim</div>
        </div>

        <div className="flex flex-row justify-end items-center w-full gap-2">
          <Link
            href="/slide"
            className="border-1 p-1 bg-foreground text-background hover:bg-blue-700"
          >
            Slide Collections
          </Link>
          <Link
            href="/editor"
            className="border-1 p-1 bg-foreground text-background hover:bg-yellow-700"
          >
            To Editor
          </Link>
        </div>
      </div>
    </>
  );
}
