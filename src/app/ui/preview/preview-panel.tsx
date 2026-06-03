"use client";

import { TextAttribute, TextObject } from "@/app/lib/type";
import { useEffect, useRef, useState } from "react";
import DisplayPanel from "../editor/display/display-panel";

export default function PreviewPanel({
  slideObject,
  textAttribute,
}: {
  slideObject?: TextObject[];
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

  const [mainParentSlideSize, setMainParentSlideSize] = useState({
    width: 1920,
    height: 1080,
  });

  const [sideParentSlideSize, setSideParentSlideSize] = useState({
    width: 1920,
    height: 1080,
  });

  // Adjust Parent Div Size Based on the screen

  useEffect(() => {
    //Main Slide
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        setMainParentSlideSize((prev) => {
          if (prev.width === newWidth && prev.height === newHeight) return prev;
          return { ...prev, width: newWidth, height: newHeight };
        });
      }
    });

    if (mainPanelRef.current) {
      observer.observe(mainPanelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    //Side Slide
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;

        setSideParentSlideSize((prev) => {
          if (prev.width === newWidth && prev.height === newHeight) return prev;
          return { ...prev, width: newWidth, height: newHeight };
        });
      }
    });

    if (sidePanelRef.current) {
      observer.observe(sidePanelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => { // Handle Scrolling Sync for Both Slide
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
      <div className="grid grid-cols-4 flex-1 min-h-0 overflow-hidden shadow-inner">
        <div
          className="col-span-full md:col-span-3 min-h-0 flex w-full xl:col-span-3 justify-center overflow-y-auto "
          ref={mainPanelRef}
        >
          <DisplayPanel
            slideObject={slideObject}
            parentSlideSize={mainParentSlideSize}
          />
        </div>
        <div
          className="hidden md:flex md:col-span-1 min-h-0 w-full overflow-y-auto justify-center"
          ref={sidePanelRef}
        >
          <DisplayPanel
            slideObject={slideObject}
            parentSlideSize={sideParentSlideSize}
          />
        </div>
      </div>
    </>
  );
}
