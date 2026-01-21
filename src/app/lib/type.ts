import { RefObject } from "react";
import { textAlignTypes } from "./data";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

export interface TextAttribute {
  textSize: number;
  textFont: NextFontWithVariable;
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
  textObject: TextObject[];
  handleTextDataChanges: (textData: string) => void;
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
}

export interface TextAreaProps {
  textData: string;
  textObject: TextObject[];
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

export interface TextFontsSelectionProp {
  textFontOpt: NextFontWithVariable;
  handleTextFontOptChanges: (textFontName: NextFontWithVariable) => void;
}
