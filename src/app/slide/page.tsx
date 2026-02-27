import Link from "next/link";
import { deleteSlideData, getData } from "../lib/action";
import { tempSlideData, tempUserData } from "../lib/data";
import DeleteSlideButton from "../ui/slide/delete-slide-button";

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
      <div className="grid grid-cols-3 gap-5 h-fit md:flex-row">
        {slideData?.map((value, index) => {
          return (
            <div
              className="border-1 bg-foreground w-full text-background text-center overflow-y-hidden p-2 h-fit"
              key={index}
            >
              <div className="flex flex-col bg-pink-200">
                <div className="grid grid-cols-2">
                  <div className="flex flex-col p-2 h-fit">
                    <h3 className="text-2xl font-bold truncate">
                      {value.title}
                    </h3>
                    <p className=""> {value.description}</p>
                  </div>
                  <div className="flex flex-row p-2 justify-center items-center gap-2 h-full">
                    <Link
                      href={`/slide/${value.id}/edit`}
                      className="border-1 p-1 hover:bg-gray-300 bg-yellow-300"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/slide/${value.id}/preview`}
                      className="border-1 p-1 hover:bg-gray-300 bg-blue-300"
                    >
                      Preview
                    </Link>
                    <DeleteSlideButton slideID={value.id} />
                  </div>
                </div>

                <div className="flex p-1 p-2 h-full flex-col">
                  <div className="border-1 text-left w-full p-1 max-h-1/2 overflow-y-auto truncate">
                    {value.textdata ? value.textdata : "Empty Data"}
                  </div>
                  <div className="flex flex-row justify-between p-1">
                    <p>
                      {value.textdata
                        ? value.textdata.length + " Letters"
                        : "Empty Data"}
                    </p>
                    <p>Last Edited : 12 Jan 2026</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
