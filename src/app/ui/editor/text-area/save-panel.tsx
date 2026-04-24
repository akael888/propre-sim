import { submitSlideData, updateSlideData } from "@/app/lib/action";
import Link from "next/link";
import { useState } from "react";

function SavePanel({
  slideID,
  textAreaData,
  slideData,
  slideDataStatic,
  handleSlideDataObjectChanges,
  isTextAreaNotChanged,
}: {
  slideID?: string;
  textAreaData: string;
  slideData: {
    title: string;
    description: string;
  };
  slideDataStatic: {
    title: string;
    description: string;
  };
  handleSlideDataObjectChanges: (data: {
    title: string;
    description: string;
  }) => void;
  isTextAreaNotChanged: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="absolute md:top-0 md:left-50  z-1000 p-1 flex flex-row gap-5 max-w-screen ">
        <div className="flex flex-col">
          {isOpen ? (
            <>
              <div className="bg-foreground p-1">
                <form
                  // action={slideID ? updateSlideData : submitSlideData}
                  className="gap-2 flex max-w-screen"
                >
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Enter Slide Title"
                    className="w-full"
                    defaultValue={slideID ? slideDataStatic.title : ""}
                    onChange={
                      slideID
                        ? (e) =>
                            handleSlideDataObjectChanges({
                              ...slideData,
                              title: e.target.value,
                            })
                        : undefined
                    }
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Enter Slide Description"
                    required
                    className="w-full"
                    defaultValue={slideID ? slideDataStatic.description : ""}
                    onChange={
                      slideID
                        ? (e) =>
                            handleSlideDataObjectChanges({
                              ...slideData,
                              description: e.target.value,
                            })
                        : undefined
                    }
                  />
                  <input
                    type="hidden"
                    name="textdata"
                    value={textAreaData}
                    readOnly
                  />
                  {slideID ? (
                    <input
                      type="hidden"
                      name="slideID"
                      value={slideID}
                      readOnly
                    />
                  ) : null}
                  <button
                    className="border-1 p-1 bg-green-500 hover:bg-green-600 disabled:bg-background disabled:text-foreground w-full"
                    type="submit"
                    disabled={slideID ? isTextAreaNotChanged : false}
                  >
                    {slideID
                      ? `Save ${isTextAreaNotChanged ? "" : "*"}`
                      : "Save Data"}
                  </button>
                  {slideID ? (
                    <Link
                      href={`/slide/${slideID}/preview`}
                      className="border-1 bg-blue-200 p-1 w-fit items-center flex justify-center"
                    >
                      Preview
                    </Link>
                  ) : null}
                  <Link
                    href="/slide"
                    className="border-1 p-1 bg-foreground text-background hover:bg-blue-700 w-full text-center"
                  >
                    Slide Collections
                  </Link>
                </form>
              </div>
            </>
          ) : null}
          <button
            onClick={(e) => {
              setIsOpen(!isOpen);
            }}
            className="w-fit bg-green-500 p-1"
          >
            Save Panel
          </button>
        </div>
      </div>
    </>
  );
}

export default SavePanel;
