import Link from "next/link";
import DeleteSlideButton from "./delete-slide-button";
import { SlideCardProp } from "@/app/lib/type";

const SlideCard: React.FC<SlideCardProp> = ({ index, userSlideOBject }) => {
  return (
    <>
      <div
        className="border-1 border-gray-500 bg-foreground h-full w-full text-background text-center overflow-y-hidden p-2 flex flex-col hover:bg-gray-100 shadow-xl hover:-translate-y-1 hover:border-white rounded-xl"
      >
        <div className="flex flex-col h-full">
          <div className="2xl:grid 2xl:grid-cols-1 flex flex-col h-full">
            <div className="flex flex-col p-2 h-fit">
              <h3 className="text-2xl font-bold truncate h-10">
                {userSlideOBject.title}
              </h3>
              <p className="h-5">
                {userSlideOBject.description != ""
                  ? userSlideOBject.description
                  : "..."}
              </p>
            </div>
          </div>

          <div className="flex p-1 p-2 h-full flex-col">
            <div className="text-left w-full p-2 h-full max-h-40 overflow-y-auto whitespace-pre-wrap inset-shadow-black/50 inset-shadow-sm bg-gray-300 ">
              {userSlideOBject.textdata
                ? userSlideOBject.textdata
                : "Empty Data"}
            </div>
            <div className="flex flex-row justify-between p-1">
              <p>
                {userSlideOBject.textdata
                  ? userSlideOBject.textdata.length + " Letters"
                  : "Empty Data"}
              </p>
              {userSlideOBject.created_at && (
                <p>Created on {userSlideOBject.created_at.toDateString()}</p>
              )}
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-row p-2 justify-end items-center gap-2 h-full">
          <Link
            href={`/slide/${userSlideOBject.id}/edit`}
            className="border-1 p-1 hover:bg-gray-300 bg-yellow-300/50 w-20 rounded-sm"
          >
            Edit
          </Link>
          <Link
            href={`/slide/${userSlideOBject.id}/preview`}
            className="border-1 p-1 hover:bg-gray-300 bg-blue-300/50 w-20 rounded-sm"
          >
            Preview
          </Link>
          <DeleteSlideButton slideID={userSlideOBject.id} />
        </div>
      </div>
    </>
  );
};

export default SlideCard;
