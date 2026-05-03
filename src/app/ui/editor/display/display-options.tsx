import { DisplayOptionsProp } from "@/app/lib/type";
import { useState } from "react";
import { defaultTextAttributeData, textAlignTypes } from "../../../lib/data";
import TextFontsSelection from "./option/text-fonts-selection";
import OptionInputStepper from "./option/option-input-stepper";
import OptionColorPicker from "./option/option-color-picker";
import OptionThemeMenu from "./option/option-theme-menu";
import Image from "next/image";
import TextAlign from "./option/option-text-align";
import TextStyle from "./option/option-text-style";

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
      <div className="w-full bottom-0 h-full flex flex-col justify-evenly items-start">
        <h1 className="p-1 font-bold text-xl">OPTIONS</h1>
        <div className=" w-full border-1 bottom-0 h-full overflow-y-hidden bg-gray-300 p-1">
          <div>
            <OptionThemeMenu
              textAttribute={textAttribute}
              handleTextAttributeObjectChanges={
                handleTextAttributeObjectChanges
              }
            />
          </div>
          <div className=" flex flex-col w-full overflow-y-auto">
            <div className="flex md:flex-col flex-col justify-center w-full h-full p-1 gap-2">
              <div className=" p-1">
                <h2 className="font-bold text-md w-full p-1 border-b-1">
                  Text Attributes
                </h2>
                <div className=" grid grid-cols-2 w-full justify-start items-start gap-2 p-2">
                  <div className="flex flex-row justify-evenly col-span-full">
                    <div className="flex 2xl:flex-row flex-col gap-1 h-full w-full justify-evenly items-center">
                      <div className="flex flex-row items-center h-full w-80">
                        <TextFontsSelection
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                        />
                        <OptionInputStepper
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          attributeKey="textSize"
                          intervalPerStep={0.1}
                          showText={false}
                        />
                      </div>
                      <div className="2xl:flex hidden w-1 h-10 bg-black/20 rounded-sm" />
                      <div className="flex flex-row h-full w-full justify-center">
                        {" "}
                        <TextAlign
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          direction="left"
                        />
                        <TextAlign
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          direction="center"
                        />
                        <TextAlign
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          direction="right"
                        />
                        <TextAlign
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          direction="justify"
                        />
                      </div>
                      <div className="2xl:flex hidden w-1 h-10 bg-black/20 rounded-sm" />
                      <div className="flex flex-row h-full w-full justify-center">
                        <TextStyle
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          styleAttribute="bold"
                        />
                        <TextStyle
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          styleAttribute="italic"
                        />
                        <TextStyle
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          styleAttribute="underlined"
                        />
                        <TextStyle
                          textAttribute={textAttribute}
                          handleTextAttributeChanges={
                            handleTextAttributeChanges
                          }
                          styleAttribute="strikethrough"
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-start col-span-full"></div>{" "}
                  <div className="flex flex-row justify-evenly col-span-full">
                    <div className="flex flex-row gap-1 h-fit justify-evenly items-center">
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
                  </div>
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
                  <div className="flex flex-row gap-2 justify-evenly items-center h-full w-full col-span-2"></div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center p-1">
                <div className="justify-start w-full h-full flex flex-row  items-center border-b-1">
                  <h2 className="font-bold text-md  w-full p-1 text-start  ">
                    Stroke
                  </h2>
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
                    <div className="grid grid-cols-2 justify-evenly items-center  w-full gap-2">
                      <OptionInputStepper
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        attributeKey="textStroke"
                        keyValue="strokeSize"
                        intervalPerStep={0.1}
                      />
                      <OptionColorPicker
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        attributeKey="textStroke"
                        keyValue="strokeColor"
                      />
                    </div>
                  </>
                ) : null}
              </div>
              <div className="flex flex-col justify-evenly items-center p-1">
                <div className="justify-start w-full h-full flex flex-row  items-center border-b-1">
                  <h2 className="font-bold text-md  w-full p-1 text-start  ">
                    Shadow
                  </h2>
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
                    <div className="md:grid md:grid-cols-2 flex flex-col justify-between items-center md:w-full w-screen p-2 ">
                      <OptionInputStepper
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        attributeKey="textShadow"
                        keyValue="x"
                        intervalPerStep={0.01}
                      />
                      <OptionInputStepper
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        attributeKey="textShadow"
                        keyValue="y"
                        intervalPerStep={0.01}
                      />
                      <OptionInputStepper
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        attributeKey="textShadow"
                        keyValue="shadowBlur"
                        intervalPerStep={1}
                      />
                      <OptionColorPicker
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        attributeKey="textShadow"
                        keyValue="shadowColor"
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayOptions;
