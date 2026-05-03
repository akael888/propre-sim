import { TextAttribute } from "@/app/lib/type";
import Image from "next/image";

function TextStyle({
  textAttribute,
  handleTextAttributeChanges,
  styleAttribute,
}: {
  textAttribute: TextAttribute;
  handleTextAttributeChanges: <K extends keyof TextAttribute>(
    attribute: K,
    attributeValue: TextAttribute[K],
  ) => void;
  styleAttribute: keyof TextAttribute["textStyle"];
}) {
  return (
    <>
      <label className="relative p-1 w-fit h-fit cursor-pointer group ">
        <input
          type="checkbox"
          checked={textAttribute.textStyle[styleAttribute] as boolean}
          onChange={(e) =>
            handleTextAttributeChanges("textStyle", {
              ...textAttribute.textStyle,
              [styleAttribute]: e.target.checked,
            })
          }
          className="absolute inset-0 hidden"
        />
        <div
          className="border-1 h-fit w-fit p-1 bg-white hover:bg-gray-200"
          style={{
            backgroundColor: textAttribute.textStyle[styleAttribute]
              ? "grey"
              : "white",
          }}
        >
          <Image
            src={`/logo/${styleAttribute}-icon-100.png`}
            alt={`${styleAttribute} style logo`}
            width={30}
            height={30}
          />
        </div>
      </label>
    </>
  );
}
export default TextStyle;
