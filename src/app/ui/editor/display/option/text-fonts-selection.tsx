import { defaultFontCollection, textAlignTypes } from "@/app/lib/data";
import { TextFontsSelectionProp } from "@/app/lib/type";

export default function TextFontsSelection({
  textAttribute,
  handleTextAttributeChanges,
}: TextFontsSelectionProp) {
  const fontObjects = defaultFontCollection;

  return (
    <div className="flex flex-row gap-2 justify-center items-center h-full">
      <h2 className="text-sm font-bold">Font</h2>
      <select
        value={textAttribute.textFont.className}
        onChange={(e) => {
          const selectedClass = e.target.value;
          const selectedFontObject = fontObjects.find(
            (obj) => obj.fontData.className === selectedClass,
          );
          //   alert(textFontOpt.variable);
          if (selectedFontObject) {
            handleTextAttributeChanges('textFont',selectedFontObject.fontData);
          }
        }}
        className={`${textAttribute.textFont.className} bg-white rounded-sm`}
      >
        {fontObjects?.map((object) => (
          <option
            key={object.fontData.className}
            value={object.fontData.className}
            className={object.fontData.className}
          >
            {object.fontName}
          </option>
        ))}
      </select>
    </div>
  );
}
