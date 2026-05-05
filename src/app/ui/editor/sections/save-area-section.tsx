import { getSession, submitSlideData, updateSlideData } from "@/app/lib/action";
import { User } from "next-auth";
import Link from "next/link";
import { use, useState } from "react";

function SaveSection({
  slideID,
  textAreaData,
  slideData,
  slideDataStatic,
  handleSlideDataObjectChanges,
  isTextAreaNotChanged,
  user,
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
  user?: User;
}) {
  const submitSlideDatawithID = user?.id && submitSlideData.bind(null, user.id);

  return (
    <>
      <div className="flex flex-col gap-5 max-w-screen w-full p-1 ">
        {user ? (
          <form
            action={slideID ? updateSlideData : submitSlideDatawithID}
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
                className="w-full font-bold text-center hover:bg-background/30 underline"
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
                className="border-1 p-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:shadow-inner disabled:shadow-black/80 disabled:text-gray-800 w-full rounded-md enabled:hover:font-bold box-shadow shadow-sm"
                type="submit"
                disabled={slideID ? isTextAreaNotChanged : false}
              >
                {slideID
                  ? `Save${isTextAreaNotChanged ? "" : "*"}`
                  : "Save Data"}
              </button>
              {slideID && (
                <Link
                  href={`/slide/${slideID}/preview`}
                  className="border-1 bg-blue-200 p-1 w-full items-center flex justify-center hover:bg-blue-800 rounded-md hover:font-bold"
                >
                  Preview
                </Link>
              )}

              <Link
                href="/slide"
                className="border-1 p-1 bg-foreground text-background hover:bg-blue-700 w-full text-center justify-center items-center flex rounded-md hover:font-bold"
              >
                Slide Collections
              </Link>
            </div>
          </form>
        ) : (
          <>
            <div className="flex flex-row gap-2">
              <div className="p-1 font-bold">
                Login or Register to Save Data
              </div>
              <div className="flex flex-row gap-1 justify-end items-center w-full">
                <Link
                  href="/login"
                  className="border-1 p-1 bg-foreground text-background hover:bg-blue-700 w-full text-center justify-center items-center flex rounded-md hover:font-bold"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="border-1 p-1 bg-foreground text-background hover:bg-blue-700 w-full text-center justify-center items-center flex rounded-md hover:font-bold"
                >
                  Register
                </Link>{" "}
                <Link
                  href="/"
                  className="border-1 p-1 bg-foreground text-background hover:bg-blue-700 w-full text-center justify-center items-center flex rounded-md hover:font-bold"
                >
                  Home
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SaveSection;
