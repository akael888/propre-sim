import { defaultFontCollection, textAlignTypes } from "@/app/lib/data";
import { TextFontsSelectionProp } from "@/app/lib/type";

export default function TextFontsSelection({
  textAttribute,
  handleTextAttributeChanges,
}: TextFontsSelectionProp) {
  const fontObjects = defaultFontCollection;

  return (
    <div>
      <div>Text Font:</div>
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
        className={`${textAttribute.textFont.className}`}
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
