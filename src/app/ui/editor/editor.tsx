"use client";

import { getSlideData } from "@/app/lib/action";
import { useEffect, useRef, useState } from "react";
import TextAreaSection from "./sections/text-area-section";
import DisplayAreaSection from "./sections/display-area-section";
import { Session } from "next-auth";
import { useTextData } from "@/app/context/text-data-context";
import LoadingScreen from "../fallback/loading-screen";

type User = Session["user"];

export default function Editor({
  slideID,
  user,
}: {
  slideID?: string;
  user?: User;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleStaticSlideDataObjectChanges =
    useTextData().handleStaticSlideDataObjectChanges;
  const handleSlideDataObjectChanges =
    useTextData().handleSlideDataObjectChanges;
  const handleTextStringChanges = useTextData().handleTextStringChanges;
  const slideData = useTextData().slideData;

  useEffect(() => {
    async function fetchData() {
      let stored = null;
      if (slideID) {
        stored = await getSlideData(slideID);

        if (stored) {
          const data = stored as {
            title: string;
            description: string;
            textdata: string;
          };
          handleStaticSlideDataObjectChanges(data);
          handleSlideDataObjectChanges(data);

          handleTextStringChanges(data.textdata);
        }
      } else {
        stored = localStorage.getItem("TEXT_AREA_DATA");
        if (stored) {
          handleTextStringChanges(stored);
        }
      }

      setIsLoaded(true);
    }
    fetchData();
  }, []);

  useEffect(() => {
    document.title =
      slideData.title != ""
        ? `${slideData.title} | ProPresenter Simulator`
        : "ProPresenter Simulator";
  }, [slideData.title]);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="min-w-screen min-h-screen md:grid-rows-none md:max-h-full max-h-screen bg-foreground grid md:grid-cols-3 gap-2 text-background grid-rows-2">
        <TextAreaSection
          textAreaRef={textAreaRef}
          slideID={slideID}
          user={user}
        />
        <DisplayAreaSection textAreaRef={textAreaRef} />
      </div>
    </>
  );
}
