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
  textSize: 6,
  textColor: "#FFFFFF",
  textSlideColor: "#edadff",
  textFont: defaultFontCollection[0].fontData,
  textAlign: "center",
  textStroke: { isOn: true, strokeSize: 0.89, strokeColor: "#000000" },
  textStyle: {
    bold: true,
    italic: false,
    underlined: false,
    strikethrough: false,
  },
  textShadow: {
    isOn: true,
    x: 0.2,
    y: -0.02,
    shadowBlur: 0,
    shadowColor: "#000000",
  },
  textContainer: { width: 100, height: 100 },
};

export const defaultThemeCollection = [
  {
    themeID: 0,
    themeName: "Default HIT",
    textAttribute: defaultTextAttributeData,
  },
  {
    themeID: 1,
    themeName: "Tempus Sans Theme",
    textAttribute: <TextAttribute>{
      textSize: 5,
      textColor: "#FFFFFF",
      textSlideColor: "#edadff",
      textFont: defaultFontCollection[1].fontData,
      textAlign: "center",
      textStroke: { isOn: true, strokeSize: 0.89, strokeColor: "#000000" },
      textStyle: {
        bold: true,
        italic: false,
        underlined: false,
        strikethrough: false,
      },
      textShadow: {
        isOn: true,
        x: 0.2,
        y: -0.02,
        shadowBlur: 0,
        shadowColor: "#000000",
      },
      textContainer: { width: 100, height: 100 },
    },
  },
];

export const tempUserData = { userID: 12345, userName: "Elgratio" };
export const tempSlideData = [
  {
    title: "Slide 1",
    id: "123456",
    description: "1232141341",
    textdata: "Najdnjadnjasdnjasda\n\nfasfafa\n\n",
  },
  {
    title: "Slide 2",
    id: "1234543",
    description: "1232141341",
    textdata: "Najdnjadnjasdnjasda\n\nfasfafa\n\n",
  },
];
