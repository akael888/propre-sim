import { RefObject } from "react";
import { textAlignTypes } from "./data";

export interface TextAttribute {
  textSize: number;
  textFont: string;
  textAlign: textAlignTypes;
}

export interface TextObject {
  id: number;
  content: string;
  charIndex: number;
}

// Text Area -----------------------------
export interface TextAreaSectionProps {
  textData: string;
  handleTextDataChanges: (textData: string) => void;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
}

export interface TextAreaProps {
  textData: string;
  handleTextDataChanges: (textData: string) => void;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
}

// Display Area----------------
export interface DisplayAreaSectionProps {
  slideObject: TextObject[];
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
}

export interface DisplayPanelProps {
  slideObject: TextObject[];
  textAttribute: TextAttribute;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
}

export interface SlideProps {
  slideNum: number;
  slideMaxNum: number;
  slideContent: string;
  slideTextCharIndex: number;
  textAttribute: TextAttribute;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
}

export interface DisplayOptionsProp {
  textAttribute: TextAttribute;
  handleTextAttributeChanges: <K extends keyof TextAttribute>(
    attribute: K,
    attributeValue: TextAttribute[K],
  ) => void;
}
