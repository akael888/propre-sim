import { OptionColorPickerProp } from "@/app/lib/type";
import { useState } from "react";

export default function OptionColorPicker({
  textAttribute,
  handleTextAttributeChanges,
  attributeKey,
  keyValue,
}: OptionColorPickerProp) {
  const currentObject = textAttribute[attributeKey];

  const getCurrentValue = (): string => {
    if (
      typeof currentObject === "object" &&
      currentObject !== null &&
      keyValue
    ) {
      const obj = currentObject as Record<string, unknown>;
      return typeof obj[keyValue] === "string" ? (obj[keyValue] as string) : "";
    }
    return currentObject.toString() || "";
  };

  const handleColorChange = (newValue: string) => {
    console.log(newValue);
    if (typeof currentObject === "object" && currentObject !== null) {
      if (keyValue) {
        handleTextAttributeChanges(attributeKey, {
          ...currentObject,
          [keyValue]: newValue,
        });
      }
    } else {
      handleTextAttributeChanges(attributeKey, newValue);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2>
        {attributeKey} {keyValue ? `(${keyValue})` : "  "}
      </h2>
      <input
        type="color"
        value={getCurrentValue()}
        onChange={(e) => handleColorChange(e.currentTarget.value)}
      />
      <p>{getCurrentValue()}</p>
    </div>
  );
}
