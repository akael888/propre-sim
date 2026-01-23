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
            <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
              <div className="flex justify-center w-fit h-full">
                <OptionInputStepper
                  textAttribute={textAttribute}
                  handleTextAttributeChanges={handleTextAttributeChanges}
                  attributeKey="textSize"
                  intervalPerStep={1}
                />
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
              </div>
              <div className="p-1">
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
              </div>
              <div className="">
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
                  {textAttribute.textShadow.isOn ? (
                    <>
                      <div className="flex md:flex-row flex-col p-3 w-fit">
                        <div className="w-fit p-2 h-full flex items-center text-center">
                          Text Shadow (X):
                        </div>
                        <div className="flex flex-row w-full">
                          <button
                            className="w-[20%] bg-red-400"
                            onClick={() =>
                              handleTextAttributeChanges("textShadow", {
                                ...textAttribute.textShadow,
                                x: textAttribute.textShadow.x - 0.01,
                              })
                            }
                          >
                            -
                          </button>
                          <input
                            value={textAttribute.textShadow.x}
                            onInput={(e) =>
                              handleTextAttributeChanges("textShadow", {
                                ...textAttribute.textShadow,
                                x: Number(e.currentTarget.value),
                              })
                            }
                            type="number"
                            className="border-1 p-1 max-w-[20%] text-center bg-white"
                            placeholder="Text Size"
                          />
                          <button
                            className="w-[20%] bg-green-400"
                            onClick={() =>
                              handleTextAttributeChanges("textShadow", {
                                ...textAttribute.textShadow,
                                x: textAttribute.textShadow.x + 0.01,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex md:flex-row flex-col p-3 w-fit">
                        <div className="w-fit p-2 h-full flex items-center text-center">
                          Text Shadow (Y):
                        </div>
                        <div className="flex flex-row w-full">
                          <button
                            className="w-[20%] bg-red-400"
                            onClick={() =>
                              handleTextAttributeChanges("textShadow", {
                                ...textAttribute.textShadow,
                                y: textAttribute.textShadow.y - 0.01,
                              })
                            }
                          >
                            -
                          </button>
                          <input
                            value={textAttribute.textShadow.y}
                            onInput={(e) =>
                              handleTextAttributeChanges("textShadow", {
                                ...textAttribute.textShadow,
                                y: Number(e.currentTarget.value),
                              })
                            }
                            type="number"
                            className="border-1 p-1 max-w-[20%] text-center bg-white"
                            placeholder="Text Size"
                          />
                          <button
                            className="w-[20%] bg-green-400"
                            onClick={() =>
                              handleTextAttributeChanges("textShadow", {
                                ...textAttribute.textShadow,
                                y: textAttribute.textShadow.y + 0.01,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex md:flex-row flex-col p-3 w-fit">
                        <div className="w-fit p-2 h-full flex items-center text-center">
                          Shadow Blur:
                        </div>
                        <div className="flex flex-row w-full">
                          <button
                            className="w-[20%] bg-red-400"
                            onClick={() =>
                              handleTextAttributeChanges("textShadow", {
                                ...textAttribute.textShadow,
                                shadowBlur:
                                  textAttribute.textShadow.shadowBlur - 1,
                              })
                            }
                          >
                            -
                          </button>
                          <input
                            value={textAttribute.textShadow.shadowBlur}
                            onInput={(e) =>
                              handleTextAttributeChanges("textShadow", {
                                ...textAttribute.textShadow,
                                shadowBlur: Number(e.currentTarget.value),
                              })
                            }
                            type="number"
                            className="border-1 p-1 max-w-[20%] text-center bg-white"
                            placeholder="Text Size"
                          />
                          <button
                            className="w-[20%] bg-green-400"
                            onClick={() =>
                              handleTextAttributeChanges("textShadow", {
                                ...textAttribute.textShadow,
                                shadowBlur:
                                  textAttribute.textShadow.shadowBlur + 1,
                              })
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}
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
