import { RefObject } from "react";
import { textAlignTypes } from "./data";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { User } from "next-auth";

export interface TextAttribute {
  textSize: number;
  textColor: string;
  textSlideColor: string;
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
  offset: number;
  angle: number;
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

export interface Theme {
  themeID: number;
  themeName: string;
  textAttribute: TextAttribute;
}

// Text Area -----------------------------
export interface TextAreaSectionProps {
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
  slideID?: string;
  user?: User;
}

export interface TextAreaProps {
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
}

// Display Area----------------
export interface DisplayAreaSectionProps {
  textAreaRef: RefObject<HTMLTextAreaElement | null>;
}

export interface DisplayPanelProps {
  slideObject?: TextObject[];
  textAreaRef?: RefObject<HTMLTextAreaElement | null>;
}

export interface SlideProps {
  slideNum: number;
  slideMaxNum?: number | undefined;
  slideContent: string;
  slideTextCharIndex: number;
  slideSize: { width: number; height: number };
  textAreaRef?: RefObject<HTMLTextAreaElement | null>;
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
  showText?: boolean;
  max?: number;
  min?: number;
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

export interface OptionThemeMenuProp {
  textAttribute: TextAttribute;
  handleTextAttributeObjectChanges: (newObject: TextAttribute) => void;
  menuType: "Preview" | "Edit";
}

export interface SlideButtonsProp {
  slideID: string;
}

export interface SlideCardProp {
  index: number;
  userSlideOBject: {
    id?: string;
    title?: string;
    description?: string;
    textdata?: string;
    created_at?: string;
  };
}
