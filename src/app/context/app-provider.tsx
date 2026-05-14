import { ReactNode } from "react";
import { TextAttributeProvider } from "./text-attribute-context";
import { TextDataProvider } from "./text-data-context";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <TextAttributeProvider>
        <TextDataProvider>{children}</TextDataProvider>
      </TextAttributeProvider>
    </>
  );
}
