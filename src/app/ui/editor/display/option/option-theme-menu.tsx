import { defaultThemeCollection } from "@/app/lib/data";
import { OptionThemeMenuProp, TextAttribute, Theme } from "@/app/lib/type";
import { useState } from "react";

export default function OptionThemeMenu({
  textAttribute,
  handleTextAttributeObjectChanges,
}: OptionThemeMenuProp) {
  const getThemeCollection = (): Theme[] => {
    try {
      const stored = localStorage.getItem("THEME_COLLECTION");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (err) {
      console.log(err);
    }
    return defaultThemeCollection;
  };
  const [themeCollection, setThemeCollection] = useState(getThemeCollection());
  const [selectedTheme, setSelectedTheme] = useState(themeCollection[0]);
  const [createdThemeName, setCreatedThemeName] = useState("");

  const loadingSelectedTheme = (themeSettings: TextAttribute) => {
    handleTextAttributeObjectChanges(themeSettings);
  };

  const clearLocalTheme = () => {
    localStorage.removeItem("THEME_COLLECTION");
    setThemeCollection(defaultThemeCollection);
  };

  const saveTheme = () => {
    const newTheme: Theme = {
      themeID: themeCollection.length,
      themeName: createdThemeName,
      textAttribute: textAttribute,
    };
    setThemeCollection((prevItems) => [...prevItems, newTheme]);

    localStorage.setItem("THEME_COLLECTION", JSON.stringify(themeCollection));
  };

  return (
    <>
      <div className="p-1">
        <div>Theme:</div>
        <div className="p-1 flex gap-2">
          <select
            onChange={(e) => {
              const themeID = Number(e.currentTarget.value);
              setSelectedTheme(themeCollection[themeID]);
            }}
            value={selectedTheme.themeID}
          >
            {themeCollection.map((theme, index) => (
              <option key={index} value={theme.themeID}>
                {theme.themeName}
              </option>
            ))}
          </select>
          <button
            className="border-1 p-1 hover:bg-foreground"
            onClick={() => loadingSelectedTheme(selectedTheme.textAttribute)}
          >
            Load Theme
          </button>
          <button
            className="border-1 p-1 hover:bg-foreground"
            onClick={clearLocalTheme}
          >
            Clear Local Theme
          </button>
        </div>
        <div className="p-1 flex gap-2">
          <input
            type="text"
            placeholder="Theme Name"
            value={createdThemeName}
            onChange={(e) => {
              setCreatedThemeName(e.target.value);
            }}
            className="border-1 p-1 bg-white"
          />
          <button
            className="border-1 p-1 hover:bg-foreground disabled:bg-background disabled:text-foreground"
            disabled={createdThemeName === ""}
            onClick={saveTheme}
          >
            Save Theme
          </button>
        </div>
      </div>
    </>
  );
}
