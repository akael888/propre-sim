// context/text-attribute-context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { TextAttribute } from "../lib/type";
import { defaultTextAttributeData } from "../lib/data";

type TextAttributeContextType = {
  textAttribute: TextAttribute;
  handleTextAttributeChanges: <K extends keyof TextAttribute>(
    attribute: K,
    value: TextAttribute[K],
  ) => void;
  handleTextAttributeObjectChanges: (newObject: TextAttribute) => void;
};

const TextAttributeContext = createContext<TextAttributeContextType | null>(
  null,
);

export function TextAttributeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [textAttribute, setTextAttribute] = useState<TextAttribute>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("TEXT_ATTRIBUTE_DATA");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (err) {
          console.error("Malformed storage data:", err);
        }
      }
    }
    return defaultTextAttributeData;
  });

  // useEffect(() => {
  //   try {
  //     const stored = localStorage.getItem("TEXT_ATTRIBUTE_DATA");
  //     if (stored) {
  //       const parsed = JSON.parse(stored);
  //       setTextAttribute(parsed);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setTextAttribute(defaultTextAttributeData);
  //   }
  // }, []);

  const handleTextAttributeChanges = <K extends keyof TextAttribute>(
    attribute: K,
    value: TextAttribute[K],
  ) => {
    const updated = { ...textAttribute, [attribute]: value };
    setTextAttribute(updated);
    localStorage.setItem("TEXT_ATTRIBUTE_DATA", JSON.stringify(updated));
  };

  const handleTextAttributeObjectChanges = (newObject: TextAttribute) => {
    setTextAttribute(newObject);
    localStorage.setItem("TEXT_ATTRIBUTE_DATA", JSON.stringify(newObject));
  };

  return (
    <TextAttributeContext.Provider
      value={{
        textAttribute,
        handleTextAttributeChanges,
        handleTextAttributeObjectChanges,
      }}
    >
      {children}
    </TextAttributeContext.Provider>
  );
}

export function useTextAttribute() {
  const ctx = useContext(TextAttributeContext);
  if (!ctx)
    throw new Error(
      "useTextAttribute must be used inside TextAttributeProvider",
    );
  return ctx;
}
