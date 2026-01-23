import { OptionInputStepperProp } from "@/app/lib/type";

export default function OptionInputStepper({
  textAttribute,
  handleTextAttributeChanges,
  attributeKey,
  keyValue,
  intervalPerStep,
}: OptionInputStepperProp) {
  const currentObject = textAttribute[attributeKey];

  const getCurrentValue = (): number => {
    if (
      typeof currentObject === "object" &&
      currentObject !== null &&
      keyValue
    ) {
      const obj = currentObject as Record<string, unknown>;
      return typeof obj[keyValue] === "number" ? (obj[keyValue] as number) : 0;
    }
    return Number(currentObject) || 0;
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
    <div className="flex flex-col p-3 w-fit">
      <div className="w-full p-2 h-fit flex items-center text-center">
        {attributeKey} {keyValue ? `(${keyValue})` : ""} :
      </div>
      <div className="flex flex-row">
        <button
          className="w-[20%] bg-red-400"
          onClick={() => updateValue(getCurrentValue() - intervalPerStep)}
        >
          -
        </button>
        <input
          value={getCurrentValue()}
          onInput={(e) => {
            if (typeof currentObject === "object" && currentObject !== null) {
              alert(currentObject);
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
            }
          }}
          type="number"
          className="border-1 p-1 max-w-[20%] text-center bg-white"
          placeholder="Text Size"
        />
        <button
          className="w-[20%] bg-green-400"
          onClick={() => updateValue(getCurrentValue() + intervalPerStep)}
        >
          +
        </button>
      </div>
    </div>
  );
}
