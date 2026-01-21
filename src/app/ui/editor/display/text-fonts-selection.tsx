import { defaultFontCollection, textAlignTypes } from "@/app/lib/data";
import { TextFontsSelectionProp } from "@/app/lib/type";

export default function TextFontsSelection({
  textFontOpt,
  handleTextFontOptChanges,
}: TextFontsSelectionProp) {
  const fontObjects = defaultFontCollection;

  return (
    <div>
      <div>Text Font:</div>
      <select
        value={textFontOpt.className}
        onChange={(e) => {
          const value = Number(e.target.value);
        //   alert(textFontOpt.variable);
          handleTextFontOptChanges(fontObjects[value].fontData);
        }}
      >
        {fontObjects?.map((object, index) => (
          <option
            key={index}
            value={index}
            className={object.fontData.className}
          >
            {object.fontName}
          </option>
        ))}
      </select>
    </div>
  );
}
