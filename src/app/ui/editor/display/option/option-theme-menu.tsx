import { defaultThemeCollection } from "@/app/lib/data";
import { OptionThemeMenuProp, TextAttribute, Theme } from "@/app/lib/type";
import { useEffect, useState } from "react";

export default function OptionThemeMenu({
  textAttribute,
  slideAttribute,
  handleTextAttributeObjectChanges,
  handleSlideAttributeObjectChanges,
  menuType,
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

  const loadSelectedTheme = (selectedTheme: Theme) => {
    handleTextAttributeObjectChanges(selectedTheme.textAttribute);
    handleSlideAttributeObjectChanges(selectedTheme.slideAttribute);
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
      slideAttribute: slideAttribute,
    };
    setThemeCollection((prevItems) => [...prevItems, newTheme]);

    localStorage.setItem("THEME_COLLECTION", JSON.stringify(themeCollection));
  };

  return (
    <>
      <div className="p-1  flex flex-col gap-2 h-full">
        <div className="flex flex-col 2xl:flex-row gap-2 h-full ">
          <div className=" flex flex-row justify-center">
            {" "}
            <div className=" flex items-center justify-center h-10">
              <p className="font-bold text-md text-center ">Theme:</p>
            </div>
            <div className="w-full flex">
              <select
                className="h-full bg-white"
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
          </div>

          <div className="gap-2 flex flex-row justify-evenly items-center">
            <button
              className="border-1 p-1 hover:bg-foreground bg-green-500/50 h-10 w-20 hover:-translate-y-0.5 box-shadow shadow-md rounded-sm"
              onClick={() => loadSelectedTheme(selectedTheme)}
            >
              ↓ Load
            </button>
            {menuType == "Edit" && (
              <>
                <button
                  className="border-1 p-1 hover:bg-foreground bg-red-500/50 h-10 w-20 hover:-translate-y-0.5 box-shadow shadow-md rounded-sm"
                  onClick={() => deleteSelectedTheme(selectedTheme)}
                >
                  Delete
                </button>
                {/* <button
              className="border-1 p-1 hover:bg-foreground bg-orange-500/50 h-10 w-20 hover:-translate-y-0.5 box-shadow shadow-md rounded-sm"
              onClick={clearLocalTheme}
            >
              Delete Local
            </button> */}
                <button
                  className="border-1 p-1 hover:bg-foreground bg-gray-500/50 h-10 w-20 hover:-translate-y-0.5 box-shadow shadow-md rounded-sm"
                  onClick={resetThemeToDefault}
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>

        {menuType == "Edit" && (
          <>
            {" "}
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
          </>
        )}
      </div>
    </>
  );
}
