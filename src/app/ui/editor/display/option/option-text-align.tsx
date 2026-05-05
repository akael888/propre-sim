import { textAlignTypes } from "@/app/lib/data";
import { DisplayOptionsProp, TextAttribute } from "@/app/lib/type";
import Image from "next/image";

function TextAlign({
  textAttribute,
  handleTextAttributeChanges,
  direction,
}: {
  textAttribute: TextAttribute;
  handleTextAttributeChanges: <K extends keyof TextAttribute>(
    attribute: K,
    attributeValue: TextAttribute[K],
  ) => void;
  direction: string;
}) {
  return (
    <>
      <label className="relative p-1 w-fit h-fit cursor-pointer group ">
        <input
          type="checkbox"
          checked={textAttribute.textAlign == direction}
          onChange={(e) =>
            handleTextAttributeChanges("textAlign", direction as textAlignTypes)
          }
          className="absolute inset-0 hidden"
        />
        <div
          className="border-1 h-fit w-fit p-1 bg-white hover:bg-gray-200 rounded-sm"
          style={{
            backgroundColor:
              textAttribute.textAlign == direction ? "grey" : "white",
            boxShadow:
              textAttribute.textAlign == direction
                ? "inset 0 0 5px rgba(0,0,0,0.5)"
                : " 0 0 5px rgba(0,0,0,0.5)",
          }}
        >
          <Image
            src={`/logo/align-${direction}.svg`}
            alt={`Align ${direction} logo`}
            width={30}
            height={30}
          />
        </div>
      </label>
    </>
  );
}
export default TextAlign;
