import localFont from "next/font/local";
import { TextAttribute } from "./type";

export type textAlignTypes = "left" | "center" | "right" | "justify";

//fonts

const tempusSans = localFont({
  src: [
    {
      path: "../fonts/TRTempusSansITC.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-tempus",
});

const yuGothic = localFont({
  src: [
    {
      path: "../fonts/yu-gothic-regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-yu-gothic",
});

const tahoma = localFont({
  src: [
    {
      path: "../fonts/tahoma.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/tahomabold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-tahoma",
});

export const defaultFontCollection = [
  { fontName: "Tahoma", fontData: tahoma },
  { fontName: "Tempus Sans ITC", fontData: tempusSans },
  { fontName: "Yu Gothic", fontData: yuGothic },
];

export const defaultTextAttributeData = <TextAttribute>{
  textSize: 5,
  textFont: defaultFontCollection[0].fontData,
  textAlign: "center",
  textStroke: { isOn: true, strokeSize: 0.89, strokeColor: "" },
  textStyle: {
    bold: true,
    italic: false,
    underlined: false,
    strikethrough: false,
  },
  textShadow: { isOn: true, x: 0.2, y: -0.02, shadowBlur: 0, shadowColor: "" },
};
