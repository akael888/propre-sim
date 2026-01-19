import { textAlignTypes } from "./data";

export interface TextAttribute {
  textSize: number;
  textFont: string;
  textAlign: textAlignTypes;
}

export interface TextObject {
  id: number;
  content: string;
}
