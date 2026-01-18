"use client";

import { useState } from "react";

interface TextAreaProps {
  textData: string;
  handleTextDataChanges: (textData: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  textData,
  handleTextDataChanges,
}) => {
  const [textValue, setTextValue] = useState(textData);

  const handleTextValueChanges = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextValue(e.target.value);
    handleTextDataChanges(e.target.value);
    localStorage.setItem("TEXT_AREA_DATA", e.target.value);
  };

  return (
    <>
      <textarea
        className="p-2 w-full h-full border-1 bg-gray-400"
        value={textValue}
        onInput={handleTextValueChanges}
        placeholder="Type here.."
      />
    </>
  );
};
export default TextArea;
