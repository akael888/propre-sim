import Link from "next/link";

export default function PreviewHeader({
  slideID,
  slideData,
}: {
  slideID: string;
  slideData?: { title: string; description: string } | null;
}) {
  return (
    <>
      <div className=" top-0 bg-foreground text-background w-full z-100 p-1 inline-flex gap-2 items-center h-[10vwh]">
        <div className="flex flex-col w-full justify-center items-center h-full">
          <p className="font-bold">{slideData?.title}</p>
          <p className="italic">
            {slideData?.description ? slideData.description : null}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <Link
            href={`/slide/${slideID}/edit`}
            className="w-[20%] border-1 bg-yellow-500 hover:bg-yellow-300 p-1 text-background rounded-sm justify-center items-center flex"
          >
            Edit
          </Link>{" "}
          <Link
            href="/slide"
            className="w-[20%] border-1 p-1 bg-foreground text-background hover:bg-blue-700 rounded-sm justify-center items-center flex"
          >
            Slide Collections
          </Link>
        </div>
      </div>
    </>
  );
}
