"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SlideAttribute } from "../lib/type";
import { defaultSlideAttributeData } from "../lib/data";

type SlideAttributeContextType = {
  slideAttribute: SlideAttribute;
  handleSlideAttributeChanges: <K extends keyof SlideAttribute>(
    attribute: K,
    value: SlideAttribute[K],
  ) => void;
  handleSlideAttributeObjectChanges: (newObject: SlideAttribute) => void;
};

const SlideAttributeContext = createContext<SlideAttributeContextType | null>(
  null,
);

export function SlideAttributeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [slideAttribute, setSlideAttribute] = useState(
    defaultSlideAttributeData,
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem("SLIDE_ATTRIBUTE_DATA");
      if (stored) {
        const parsed = JSON.parse(stored);
        setSlideAttribute(parsed);
      }
    } catch (err) {
      console.log(err);
      setSlideAttribute(defaultSlideAttributeData);
    }
  }, []);

  const handleSlideAttributeChanges = <K extends keyof SlideAttribute>(
    attribute: K,
    value: SlideAttribute[K],
  ) => {
    const updated = { ...slideAttribute, [attribute]: value };
    setSlideAttribute(updated);
    localStorage.setItem("SLIDE_ATTRIBUTE_DATA", JSON.stringify(updated));
  };

  const handleSlideAttributeObjectChanges = (newObject: SlideAttribute) => {
    setSlideAttribute(newObject);
    localStorage.setItem("SLIDE_ATTRIBUTE_DATA", JSON.stringify(newObject));
  };

  return (
    <>
      <SlideAttributeContext.Provider
        value={{
          slideAttribute,
          handleSlideAttributeChanges,
          handleSlideAttributeObjectChanges,
        }}
      >
        {children}
      </SlideAttributeContext.Provider>
    </>
  );
}

export function useSlideAttribute() {
  const ctx = useContext(SlideAttributeContext);
  if (!ctx)
    throw new Error(
      "useSlideAttribute must be used inside SlideAttributeProvider",
    );
  return ctx;
}
