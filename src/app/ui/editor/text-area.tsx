"use client";

import { useState } from "react";

interface TextAreaProps {
  handleTextDataChanges: (textData: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ handleTextDataChanges }) => {
  const [textValue, setTextValue] = useState("");

  const handleTextValueChanges = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    handleTextDataChanges(e.target.value);
  };

  return (
    <>
      <textarea
        className="p-2 w-full h-full border-1 bg-gray-400"
        value={textValue}
        onInput={handleTextValueChanges}
      />
    </>
  );
};
export default TextArea;
