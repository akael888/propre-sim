import { OptionInputStepperProp } from "@/app/lib/type";

export default function OptionInputStepper({
  textAttribute,
  handleTextAttributeChanges,
  attributeKey,
  keyValue,
  intervalPerStep,
}: OptionInputStepperProp) {
  const currentObject = textAttribute[attributeKey];

  const getCurrentValue = (): number | string => {
    if (
      typeof currentObject === "object" &&
      currentObject !== null &&
      keyValue
    ) {
      const obj = currentObject as Record<string, unknown>;
      if (obj[keyValue] == "") return "";
      return typeof obj[keyValue] === "number" ? (obj[keyValue] as number) : 0;
    }

    if (currentObject == "") return "";

    return Number(currentObject) || "";
  };

  const updateValue = (newValue: number) => {
    if (typeof currentObject === "object" && currentObject !== null) {
      if (keyValue) {
        handleTextAttributeChanges(attributeKey, {
          ...currentObject,
          [keyValue]: newValue,
        });
      }
    } else {
      handleTextAttributeChanges(attributeKey, newValue);
    }
  };

  return (
    <div className="flex 2xl:flex-row flex-col p-3 w-65 justify-center items-center h-full">
      <div className=" p-2 h-fit flex items-center justify-start  font-bold">
        <h2 className="text-center text-sm">
          {attributeKey} {keyValue ? `(${keyValue})` : ""}
        </h2>
      </div>
      <div className="flex flex-row gap-1 items-center justify-center w-fit">
        <button
          className="w-5 h-8 bg-red-400/50 rounded-md hover:bg-red-500 hover:-translate-y-0.5 box-shadow shadow-xl"
          onClick={() =>
            updateValue(Number(getCurrentValue()) - intervalPerStep)
          }
        >
          -
        </button>
        <input
          value={getCurrentValue()}
          onInput={(e) => {
            if (typeof currentObject === "object" && currentObject !== null) {
              if (keyValue) {
                handleTextAttributeChanges(attributeKey, {
                  ...currentObject,
                  [keyValue]: Number(e.currentTarget.value),
                });
              } else {
                handleTextAttributeChanges(
                  attributeKey,
                  Number(e.currentTarget.value),
                );
              }
            } else {
              handleTextAttributeChanges(
                attributeKey,
                Number(e.currentTarget.value),
              );
            }
          }}
          type="number"
          className="border-1 w-15 p-1 text-center bg-white rounded-md"
          placeholder="Text Size"
        />
        <button
          className="w-5 h-8 bg-green-400/50 rounded-md hover:bg-green-500 hover:-translate-y-0.5 box-shadow shadow-xl"
          onClick={() =>
            updateValue(Number(getCurrentValue()) + intervalPerStep)
          }
        >
          +
        </button>
      </div>
    </div>
  );
}
