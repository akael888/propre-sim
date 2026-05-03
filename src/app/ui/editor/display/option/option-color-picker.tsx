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
    <div className="flex 2xl:flex-row flex-col items-center  text-start justify-center h-full p-1 gap-2">
      <div className="flex flex-col">
        <h2 className="font-bold text-sm">
          {attributeKey} {keyValue ? `(${keyValue})` : "  "}
        </h2>
        <p>{getCurrentValue()}</p>
      </div>

      <label className="relative w-10 h-10 cursor-pointer group">
        <input
          type="color"
          value={getCurrentValue()}
          onChange={(e) => handleColorChange(e.currentTarget.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
        <span
          className="block w-10 h-10 rounded-sm border-1 border-background shadow-sm group-focus-within:ring-2 group-focus-within:ring-blue-400"
          style={{ backgroundColor: getCurrentValue() }}
        />
      </label>
    </div>
  );
}
