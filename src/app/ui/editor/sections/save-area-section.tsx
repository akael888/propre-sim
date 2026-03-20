import { submitSlideData, updateSlideData } from "@/app/lib/action";
import Link from "next/link";
import { useState } from "react";

function SaveSection({
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
  return (
    <>
      <div className="flex flex-col gap-5 max-w-screen w-full p-1 ">
        <form
          action={slideID ? updateSlideData : submitSlideData}
          className="gap-2 flex flex-row justify-between max-w-screen w-full"
        >
          <div className="flex flex-col w-full h-full">
            <input
              type="text"
              name="title"
              required
              placeholder="Enter Slide Title"
              maxLength={30}
              minLength={3}
              className="w-full font-bold text-center hover:bg-background/30"
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
              maxLength={50}
              minLength={3}
              required
              className="w-full italic text-center hover:bg-background/30 "
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
              <input type="hidden" name="slideID" value={slideID} readOnly />
            ) : null}
          </div>
          <div className="flex flex-row w-full gap-2">
            <button
              className="border-1 p-1 bg-green-500 hover:bg-green-600 disabled:bg-background disabled:text-foreground w-full rounded-md hover:font-bold"
              type="submit"
              disabled={slideID ? isTextAreaNotChanged : false}
            >
              {slideID
                ? `Save${isTextAreaNotChanged ? "" : "*"}`
                : "Save Data"}
            </button>
            {slideID ? (
              <Link
                href={`/slide/${slideID}/preview`}
                className="border-1 bg-blue-200 p-1 w-full items-center flex justify-center hover:bg-blue-800 rounded-md hover:font-bold"
              >
                Preview
              </Link>
            ) : null}
            <Link
              href="/slide"
              className="border-1 p-1 bg-foreground text-background hover:bg-blue-700 w-full text-center justify-center items-center flex rounded-md hover:font-bold"
            >
              Slide Collections
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default SaveSection;
