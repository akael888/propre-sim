import { OptionInputStepperProp } from "@/app/lib/type";

export default function OptionInputStepper({
  textAttribute,
  handleTextAttributeChanges,
  attributeKey,
  keyValue,
  intervalPerStep,
  showText = true,
  max,
  min,
}: OptionInputStepperProp) {
  const currentObject = textAttribute[attributeKey];

  const clamp = (value: number): number => {
    if (min !== undefined && value < min) return min;
    if (max !== undefined && value > max) return max;
    return value;
  };

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
    const clamped = clamp(newValue);
    if (typeof currentObject === "object" && currentObject !== null) {
      if (keyValue) {
        handleTextAttributeChanges(attributeKey, {
          ...currentObject,
          [keyValue]: clamped,
        });
      }
    } else {
      handleTextAttributeChanges(attributeKey, clamped);
    }
  };

  return (
    <div className="flex 2xl:flex-row flex-col p-3 w-30 2xl:w-fit justify-center items-center h-full">
      {showText && (
        <>
          <div className=" p-2 h-fit flex items-center justify-start  font-bold">
            <h2 className="text-center text-sm">
              {attributeKey} {keyValue ? `(${keyValue})` : ""}
            </h2>
          </div>
        </>
      )}

      <div className="flex flex-row gap-1 items-center justify-center w-fit">
        <button
          className="w-5 h-8  rounded-md hover:bg-gray-500"
          onClick={() =>
            updateValue(Number(getCurrentValue()) - intervalPerStep)
          }
        >
          -
        </button>
        <input
          value={getCurrentValue()}
          min={min}
          max={max}
          onInput={(e) => {
            const clamped = clamp(Number(e.currentTarget.value));
            if (typeof currentObject === "object" && currentObject !== null) {
              if (keyValue) {
                handleTextAttributeChanges(attributeKey, {
                  ...currentObject,
                  [keyValue]: clamped,
                });
              } else {
                handleTextAttributeChanges(attributeKey, clamped);
              }
            } else {
              handleTextAttributeChanges(attributeKey, clamped);
            }
          }}
          type="number"
          className="border-1 w-15 p-1 text-center  rounded-md"
          placeholder="Text Size"
        />
        <button
          className="w-5 h-8  rounded-md hover:bg-gray-500"
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
