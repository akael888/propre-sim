import { RefObject } from "react";
import { textAlignTypes } from "./data";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";

export interface TextAttribute {
  textSize: number;
  textColor: string;
  textFont: NextFontWithVariable;
  textAlign: textAlignTypes;
  textStroke: TextStroke;
  textStyle: TextStyle;
  textShadow: TextShadow;
  textContainer: TextContainer;
}

export type TextShadow = {
  isOn: boolean;
  x: number;
  y: number;
  shadowBlur: number;
  shadowColor: string;
};

export type TextStroke = {
  isOn: boolean;
  strokeSize: number;
  strokeColor: string;
};

export type TextStyle = {
  bold: boolean;
  italic: boolean;
  underlined: boolean;
  strikethrough: boolean;
};
export interface TextObject {
  id: number;
  content: string;
  charIndex: number;
}

export type TextContainer = {
  width: number;
  height: number;
};

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
  handleTextAttributeObjectChanges: (newObject: TextAttribute) => void;
}

export interface TextFontsSelectionProp {
  textAttribute: TextAttribute;
  handleTextAttributeChanges: <K extends keyof TextAttribute>(
    attribute: K,
    attributeValue: TextAttribute[K],
  ) => void;
}

export interface OptionInputStepperProp {
  textAttribute: TextAttribute;
  handleTextAttributeChanges: <K extends keyof TextAttribute>(
    attribute: K,
    attributeValue: TextAttribute[K],
  ) => void;
  attributeKey: keyof TextAttribute;
  keyValue?: string;
  intervalPerStep: number;
}
export interface OptionColorPickerProp {
  textAttribute: TextAttribute;
  handleTextAttributeChanges: <K extends keyof TextAttribute>(
    attribute: K,
    attributeValue: TextAttribute[K],
  ) => void;
  attributeKey: keyof TextAttribute;
  keyValue?: string;
}
