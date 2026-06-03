"use client";
import Link from "next/link";
import OptionThemeMenu from "../editor/display/option/option-theme-menu";
import { useTextAttribute } from "@/app/context/text-attribute-context";
import OptionColorPicker from "../editor/display/option/option-color-picker";
import { useSlideAttribute } from "@/app/context/slide-attribute-context";

export default function PreviewHeader({
  slideID,
  slideData,
}: {
  slideID: string;
  slideData?: { title: string; description: string } | null;
}) {
  return (
    <>
      <div className=" top-0 bg-foreground text-background w-full z-100 p-1 flex flex-col md:flex-row gap-2 items-center h-[10vwh] justify-evenly border-b-1">
        <div className="flex flex-col w-full justify-center items-center h-full p-2 md:border-b-0 border-b-1">
          <p className="font-bold w-full flex items-center justify-center truncate">
            {slideData?.title}
          </p>
          <p className="italic w-full flex items-center justify-center truncate">
            {slideData?.description ? slideData.description : null}
          </p>
        </div>
        <div className="flex md:flex-row flex-col gap-2 items-center justify-end p-1 w-full">
          <div className="flex flex-row gap-2 h-full w-full items-center md:justify-end justify-center">
            <Link
              href={`/slide/${slideID}/edit`}
              className="2xl:w-20 h-full w-10 2xl:h-10 border-1 bg-yellow-500 hover:bg-yellow-300 p-1 text-background rounded-sm justify-center items-center flex"
            >
              Edit
            </Link>
            <Link
              href="/slide"
              className="md:w-40 w-50 h-10 border-1 p-2 bg-foreground text-background hover:bg-blue-700 rounded-sm justify-center items-center flex text-center"
            >
              Slide Collections
            </Link>
          </div>
          <OptionThemeMenu
            textAttribute={useTextAttribute().textAttribute}
            slideAttribute={useSlideAttribute().slideAttribute}
            handleSlideAttributeObjectChanges={
              useSlideAttribute().handleSlideAttributeObjectChanges
            }
            handleTextAttributeObjectChanges={
              useTextAttribute().handleTextAttributeObjectChanges
            }
            menuType="Preview"
          />
        </div>
      </div>
    </>
  );
}
