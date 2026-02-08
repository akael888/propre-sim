"use client";

import { TextAttribute, TextObject } from "@/app/lib/type";
import { useEffect, useRef, useState } from "react";
import DisplayPanel from "../editor/display/display-panel";

export default function PreviewPanel({
  slideObject,
  textAttribute,
}: {
  slideObject: TextObject[];
  textAttribute: TextAttribute;
}) {
  const mainPanelRef = useRef<HTMLDivElement>(null);
  const sidePanelRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (
    scrollingDiv: HTMLDivElement,
    otherDiv: HTMLDivElement | null,
  ) => {
    if (otherDiv) {
      const maxScrollingTop =
        scrollingDiv.scrollHeight - scrollingDiv.clientHeight;
      const maxOtherTop = otherDiv.scrollHeight - otherDiv.clientHeight;
      const percentageOfScrollingDiv =
        (scrollingDiv.scrollTop / maxScrollingTop) * 100;
      const otherDivPosition = (percentageOfScrollingDiv / 100) * maxOtherTop;
      otherDiv.scrollTop = otherDivPosition;
    }
  };

  useEffect(() => {
    const divOne = mainPanelRef.current;
    const divTwo = sidePanelRef.current;

    if (divOne && divTwo) {
      // Event listener for the first div
      const handleScrollOne = () => handleScroll(divOne, divTwo);
      divOne.addEventListener("scroll", handleScrollOne);

      // Event listener for the second div
      const handleScrollTwo = () => handleScroll(divTwo, divOne);
      divTwo.addEventListener("scroll", handleScrollTwo);

      // Cleanup function to remove event listeners on component unmount
      return () => {
        divOne.removeEventListener("scroll", handleScrollOne);
        divTwo.removeEventListener("scroll", handleScrollTwo);
      };
    }
  }, []);

  return (
    <>
      <div
        className={`col-span-3 flex w-full justify-center h-screen overflow-y-auto p-10`}
        // style={{ gridColumn: `${isOpen ? "span 3" : "span 3"}` }}
        ref={mainPanelRef}
      >
        <DisplayPanel slideObject={slideObject} textAttribute={textAttribute} />
      </div>

      <div
        className="h-screen col-span-1 w-full overflow-y-auto flex justify-center"
        ref={sidePanelRef}
        // style={{ display: `${isOpen ? "flex" : "none"}` }}
      >
        <DisplayPanel slideObject={slideObject} textAttribute={textAttribute} />
      </div>
    </>
  );
}
