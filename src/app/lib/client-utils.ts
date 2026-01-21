export function parseTextDataToObjects(textData: string) {
  // console.log(textData);

  const splittedData = textData.split("\n\n");

  // console.log(splittedData);

  let charIndexInText = 0;

  const splittedObject = splittedData.map((data, index) => {
    const object = { id: index, content: data, charIndex: charIndexInText };
    charIndexInText = charIndexInText + data.length + 2; // Keep track of the latest index of the splitted text
    return object;
  });
  return splittedObject;
}
