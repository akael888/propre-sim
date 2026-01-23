import { DisplayOptionsProp, TextAttribute, TextStyle } from "@/app/lib/type";
import { useState, useEffect } from "react";
import { textAlignTypes } from "../../../lib/data";
import TextFontsSelection from "./text-fonts-selection";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import OptionInputStepper from "./option/option-input-stepper";

const DisplayOptions: React.FC<DisplayOptionsProp> = ({
  textAttribute,
  handleTextAttributeChanges,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`w-full bottom-0 md:h-fit h-${isOpen ? "20%" : "0"} absolute flex flex-col justify-end items-start`}
      >
        <button
          className="bg-black w-fit border-1 text-white p-1 "
          onClick={() => setIsOpen(!isOpen)}
        >
          Options
        </button>
        {isOpen ? (
          <div className=" w-full border-1 bottom-0 h-full  bg-gray-300">
            <div className="grid grid-cols-2 grid-rows-1 h-full w-full">
              <div className="flex flex-col justify-center w-fit">
                <OptionInputStepper
                  textAttribute={textAttribute}
                  handleTextAttributeChanges={handleTextAttributeChanges}
                  attributeKey="textSize"
                  intervalPerStep={1}
                />
                <div>
                  <div>
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
                      <OptionInputStepper
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        attributeKey="textStroke"
                        keyValue="strokeSize"
                        intervalPerStep={0.1}
                      />
                    </>
                  ) : null}
                </div>
                <div>
                  <div>
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
                  <div className="grid grid-cols-3 p-2">
                    {textAttribute.textShadow.isOn ? (
                      <>
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
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="">
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
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DisplayOptions;
