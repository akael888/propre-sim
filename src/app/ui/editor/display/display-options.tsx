import { DisplayOptionsProp } from "@/app/lib/type";
import { useState } from "react";
import { defaultTextAttributeData, textAlignTypes } from "../../../lib/data";
import TextFontsSelection from "./option/text-fonts-selection";
import OptionInputStepper from "./option/option-input-stepper";
import OptionColorPicker from "./option/option-color-picker";
import OptionThemeMenu from "./option/option-theme-menu";

const DisplayOptions: React.FC<DisplayOptionsProp> = ({
  textAttribute,
  handleTextAttributeChanges,
  handleTextAttributeObjectChanges,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const resetDisplayOption = () => {
    handleTextAttributeObjectChanges(defaultTextAttributeData);
    localStorage.removeItem("TEXT_ATTRIBUTE_DATA");
    alert("Options Successfully Reset");
  };

  return (
    <>
      <div
        className={`w-full bottom-0 md:h-fit h-${isOpen ? "10%" : "0"} absolute flex flex-col justify-end items-start`}
      >
        <div className="flex flex-row gap-2">
          <button
            className="bg-black w-fit border-1 text-white p-1 "
            onClick={() => setIsOpen(!isOpen)}
          >
            Options
          </button>
          <button
            onClick={resetDisplayOption}
            className="border-1 p-1 bg-foreground hover:bg-background hover:text-foreground"
          >
            Reset Option
          </button>
        </div>

        {isOpen ? (
          <div className=" w-full border-1 bottom-0 max-h-[10%] overflow-y-hidden bg-gray-300">
            <div
              className="md:grid md:grid-cols-2 md:grid-rows-1 flex flex-col md:h-full md:max-h-full max-h-[200px] w-[100%]
             overflow-y-auto"
            >
              <div className="flex md:flex-col flex-col justify-center w-fit h-full p-1 gap-2">
                <div className=" flex md:flex-row flex-col w-full justify-center items-center border-1 gap-2">
                  <OptionInputStepper
                    textAttribute={textAttribute}
                    handleTextAttributeChanges={handleTextAttributeChanges}
                    attributeKey="textSize"
                    intervalPerStep={0.1}
                  />
                  <OptionColorPicker
                    textAttribute={textAttribute}
                    handleTextAttributeChanges={handleTextAttributeChanges}
                    attributeKey="textColor"
                  />
                  <OptionColorPicker
                    textAttribute={textAttribute}
                    handleTextAttributeChanges={handleTextAttributeChanges}
                    attributeKey="textSlideColor"
                  />
                </div>

                <div className=" flex md:flex-row flex-col justify-center items-center border-1">
                  <OptionInputStepper
                    textAttribute={textAttribute}
                    handleTextAttributeChanges={handleTextAttributeChanges}
                    attributeKey="textContainer"
                    keyValue="width"
                    intervalPerStep={1}
                  />
                  <OptionInputStepper
                    textAttribute={textAttribute}
                    handleTextAttributeChanges={handleTextAttributeChanges}
                    attributeKey="textContainer"
                    keyValue="height"
                    intervalPerStep={1}
                  />
                </div>

                <div className="flex md:flex-row flex-col justify-center items-center ">
                  <div className="flex gap-2 p-2">
                    <div>Stroke</div>
                    <input
                      type="checkbox"
                      checked={textAttribute.textStroke.isOn}
                      onChange={(e) =>
                        handleTextAttributeChanges("textStroke", {
                          ...textAttribute.textStroke,
                          isOn: e.target.checked,
                        })
                      }
                    />
                  </div>

                  {textAttribute.textStroke.isOn ? (
                    <>
                      <div className="flex flex-row justify-center items-center border-1">
                        <OptionInputStepper
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          attributeKey="textStroke"
                          keyValue="strokeSize"
                          intervalPerStep={0.1}
                        />
                        <OptionColorPicker
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          attributeKey="textStroke"
                          keyValue="strokeColor"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="flex md:flex-row flex-col justify-center items-center">
                  <div className="flex gap-2 p-2">
                    <div>Shadow</div>
                    <input
                      type="checkbox"
                      checked={textAttribute.textShadow.isOn}
                      onChange={(e) =>
                        handleTextAttributeChanges("textShadow", {
                          ...textAttribute.textShadow,
                          isOn: e.target.checked,
                        })
                      }
                    />
                  </div>

                  {textAttribute.textShadow.isOn ? (
                    <>
                      <div className="md:grid md:grid-cols-2 flex flex-col justify-center items-center md:w-full w-screen p-2 border-1">
                        <OptionInputStepper
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          attributeKey="textShadow"
                          keyValue="x"
                          intervalPerStep={0.01}
                        />
                        <OptionInputStepper
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          attributeKey="textShadow"
                          keyValue="y"
                          intervalPerStep={0.01}
                        />
                        <OptionInputStepper
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          attributeKey="textShadow"
                          keyValue="shadowBlur"
                          intervalPerStep={1}
                        />
                        <OptionColorPicker
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          attributeKey="textShadow"
                          keyValue="shadowColor"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col h-full">
                <div>
                  <div>Text Alignment:</div>
                  <select
                    value={textAttribute.textAlign}
                    onChange={(e) => {
                      const value = e.target.value as textAlignTypes;
                      handleTextAttributeChanges("textAlign", value);
                    }}
                  >
                    <option value={"left"}>left</option>
                    <option value={"center"}>center</option>
                    <option value={"right"}>right</option>
                    <option value={"justify"}>justify</option>
                  </select>
                </div>
                <TextFontsSelection
                  textAttribute={textAttribute}
                  handleTextAttributeChanges={handleTextAttributeChanges}
                />
                <div className="flex flex-row gap-3 p-1">
                  <div>
                    Text Style: {textAttribute.textFont.style.fontWeight}
                  </div>
                  <div>
                    Bold
                    <input
                      type="checkbox"
                      checked={textAttribute.textStyle.bold}
                      onChange={(e) =>
                        handleTextAttributeChanges("textStyle", {
                          ...textAttribute.textStyle,
                          bold: e.target.checked,
                        })
                      }
                    />
                  </div>
                  <div>
                    Italic
                    <input
                      type="checkbox"
                      checked={textAttribute.textStyle.italic}
                      onChange={(e) =>
                        handleTextAttributeChanges("textStyle", {
                          ...textAttribute.textStyle,
                          italic: e.target.checked,
                        })
                      }
                    />
                  </div>
                  <div>
                    Underlined
                    <input
                      type="checkbox"
                      checked={textAttribute.textStyle.underlined}
                      onChange={(e) =>
                        handleTextAttributeChanges("textStyle", {
                          ...textAttribute.textStyle,
                          underlined: e.target.checked,
                        })
                      }
                    />
                  </div>
                  <div>
                    Strikethrough
                    <input
                      type="checkbox"
                      checked={textAttribute.textStyle.strikethrough}
                      onChange={(e) =>
                        handleTextAttributeChanges("textStyle", {
                          ...textAttribute.textStyle,
                          strikethrough: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <OptionThemeMenu
                    textAttribute={textAttribute}
                    handleTextAttributeObjectChanges={
                      handleTextAttributeObjectChanges
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DisplayOptions;
