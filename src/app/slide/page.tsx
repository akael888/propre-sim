import Link from "next/link";
import { getData } from "../lib/action";
import { tempSlideData, tempUserData } from "../lib/data";

export default async function SlideManagerPage() {
  const slideData = await getData();

  return (
    <>
      <div className="flex justify-between p-1 bg-foreground/50 sticky top-0 text-black">
        <div> Slide Menu: Hi {tempUserData.userName}! </div>
        <div>
          <Link
            href="/editor"
            className="border-1 p-1 hover:bg-gray-300 bg-green-500"
          >
            + New
          </Link>
        </div>
      </div>
      <div className="flex flex-row gap-5 ">
        {slideData?.map((value, index) => {
          return (
            <div
              className="border-1 bg-foreground w-[50%] text-background text-center h-[10%] max-h-[10%] overflow-y-hidden p-2"
              key={index}
            >
              <div className="grid grid-cols-3 bg-pink-200 h-[50%]">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold">{value.title}</h3>
                  <p className=""> {value.description}</p>
                </div>
                <div className="p-1 h-fit max-h-[10%] overflow-y-auto">
                  <div className="border-1 text-left w-full p-1 overflow-y-auto">
                    {value.textdata}
                  </div>
                </div>
                <div className="flex flex-col p-1 justify-center items-center gap-2 h-fit">
                  <Link
                    href={`/slide/${value.id}/edit`}
                    className="border-1 p-1 hover:bg-gray-300"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/slide/${value.id}/preview`}
                    className="border-1 p-1 hover:bg-gray-300"
                  >
                    Preview
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
