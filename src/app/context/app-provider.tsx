import { ReactNode } from "react";
import { TextAttributeProvider } from "./text-attribute-context";
import { TextDataProvider } from "./text-data-context";
import { SlideAttributeProvider } from "./slide-attribute-context";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <TextAttributeProvider>
        <SlideAttributeProvider>
          <TextDataProvider>{children}</TextDataProvider>
        </SlideAttributeProvider>
      </TextAttributeProvider>
    </>
  );
}
