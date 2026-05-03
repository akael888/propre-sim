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
      <div className="w-full bottom-0 h-full flex flex-col justify-center items-start">
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
              <div className="border-1 p-1">
                <h2 className="font-bold text-md">Text Attributes</h2>
                <div className=" grid grid-cols-2 w-full justify-start items-start gap-2">
                  <div className="flex flex-col">
                    <h3 className="font-bold text-sm text-center">Alignment</h3>
                    <div className="flex flex-row gap-1 h-fit justify-center items-center">
                      <TextAlign
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        direction="left"
                      />
                      <TextAlign
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        direction="center"
                      />
                      <TextAlign
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        direction="right"
                      />
                      <TextAlign
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        direction="justify"
                      />
                    </div>
                  </div>
                  <TextFontsSelection
                    textAttribute={textAttribute}
                    handleTextAttributeChanges={handleTextAttributeChanges}
                  />
                  <div className="flex flex-col gap-3 p-1">
                    <h3 className="font-bold text-sm text-center">Style</h3>
                    <div className="flex flex-row gap-1 h-fit justify-center items-center">
                      <TextStyle
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        styleAttribute="bold"
                      />
                      <TextStyle
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        styleAttribute="italic"
                      />
                      <TextStyle
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        styleAttribute="underlined"
                      />
                      <TextStyle
                        textAttribute={textAttribute}
                        handleTextAttributeChanges={handleTextAttributeChanges}
                        styleAttribute="strikethrough"
                      />
                    </div>
                  </div>
                  <OptionInputStepper
                    textAttribute={textAttribute}
                    handleTextAttributeChanges={handleTextAttributeChanges}
                    attributeKey="textSize"
                    intervalPerStep={0.1}
                  />
                  <div className="flex flex-row gap-2 justify-center">
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

              <div className="flex flex-col justify-center items-center gap-2">
                <div className="justify-start w-full h-10 flex flex-row gap-2 p-2">
                  <h2 className="font-bold text-md">Stroke</h2>
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
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="justify-start w-full h-10 flex flex-row gap-2 p-2">
                  <h2 className="font-bold text-md">Shadow</h2>
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
