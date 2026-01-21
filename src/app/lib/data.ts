import localFont from "next/font/local";

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
