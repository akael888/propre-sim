// context/text-attribute-context.tsx
"use client";

import { createContext, useContext, useState } from "react";
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
    try {
      const stored = localStorage.getItem("TEXT_ATTRIBUTE_DATA");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (err) {
      console.log(err);
    }
    return defaultTextAttributeData;
  });

  const handleTextAttributeChanges = <K extends keyof TextAttribute>(
    attribute: K,
    value: TextAttribute[K],
  ) => {
    setTextAttribute((prev) => ({ ...prev, [attribute]: value }));
  };

  const handleTextAttributeObjectChanges = (newObject: TextAttribute) => {
    setTextAttribute(newObject);
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
