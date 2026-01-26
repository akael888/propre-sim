import { defaultThemeCollection } from "@/app/lib/data";
import { OptionThemeMenuProp, TextAttribute, Theme } from "@/app/lib/type";
import { useEffect, useState } from "react";

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

  const loadSelectedTheme = (themeSettings: TextAttribute) => {
    handleTextAttributeObjectChanges(themeSettings);
  };

  const deleteSelectedTheme = (deletedTheme: Theme) => {
    const updatedCollection = themeCollection.filter(
      (theme) => theme.themeID !== deletedTheme.themeID,
    );
    setThemeCollection(updatedCollection);
    localStorage.setItem("THEME_COLLECTION", JSON.stringify(updatedCollection));
  };

  const clearLocalTheme = () => {
    localStorage.removeItem("THEME_COLLECTION");
  };

  const resetThemeToDefault = () => {
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
        <div className="p-1 flex flex-col gap-2">
          <div className="w-full flex">
            <select
              className="h-full"
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
          </div>

          <div className="gap-2 flex">
            <button
              className="border-1 p-1 hover:bg-foreground bg-green-500"
              onClick={() => loadSelectedTheme(selectedTheme.textAttribute)}
            >
              Load Selected Theme
            </button>
            <button
              className="border-1 p-1 hover:bg-foreground bg-red-500"
              onClick={() => deleteSelectedTheme(selectedTheme)}
            >
              Delete Selected Theme
            </button>
            <button
              className="border-1 p-1 hover:bg-foreground bg-orange-500"
              onClick={clearLocalTheme}
            >
              Clear Local Theme
            </button>
            <button
              className="border-1 p-1 hover:bg-foreground bg-gray-500"
              onClick={resetThemeToDefault}
            >
              Reset Theme to Default
            </button>
          </div>
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
