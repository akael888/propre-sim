"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { TextObject } from "../lib/type";
import { parseTextDataToObjects } from "../lib/utils";

type TextDataContextType = {
  textData: string; //previously I wanted it to be textString, but unfortunately I've already setup the DB and all of its dependencies using TextData
  textObject: TextObject[] | undefined;
  slideData: { title: string; description: string };
  staticSlideData: { title: string; description: string; textdata: string };
  isTextStringChanged: boolean;
  handleTextStringChanges: (newString: string) => void;
  handleSlideDataObjectChanges: (newObject: {
    title: string;
    description: string;
  }) => void;
  handleStaticSlideDataObjectChanges: (newObject: {
    title: string;
    description: string;
    textdata: string;
  }) => void;
};

const TextDataContext = createContext<TextDataContextType | null>(null);

export function TextDataProvider({ children }: { children: ReactNode }) {
  //Main Text String in the Text Area
  const [textData, setTextData] = useState("");

  //Static Slide Data for Comparison
  const [staticSlideData, setStaticSlideData] = useState({
    title: "",
    description: "",
    textdata: "",
  });

  //Original Slide Data
  const [slideData, setSlideData] = useState({
    title: "",
    description: "",
  });

  const isTextStringChanged = useMemo(
    () =>
      staticSlideData.textdata === textData &&
      slideData.title === staticSlideData.title &&
      slideData.description === staticSlideData.description,
    [textData, slideData, staticSlideData],
  );

  const textObject = parseTextDataToObjects(textData);

  const handleTextStringChanges = (textAreaData: string, slideID?: boolean) => {
    setTextData(textAreaData);

    if (!slideID) {
      localStorage.setItem("TEXT_AREA_DATA", textAreaData);
    }
  };

  const handleSlideDataObjectChanges = (data: {
    title: string;
    description: string;
  }) => {
    setSlideData(data);
  };

  const handleStaticSlideDataObjectChanges = (data: {
    title: string;
    description: string;
    textdata: string;
  }) => {
    setStaticSlideData(data);
  };

  return (
    <TextDataContext.Provider
      value={{
        textData,
        textObject,
        slideData,
        staticSlideData,
        isTextStringChanged,
        handleTextStringChanges,
        handleSlideDataObjectChanges,
        handleStaticSlideDataObjectChanges,
      }}
    >
      {children}
    </TextDataContext.Provider>
  );
}

export function useTextData() {
  const ctx = useContext(TextDataContext);
  if (!ctx) throw new Error("useTextData must be used inside TextDataProvider");
  return ctx;
}
