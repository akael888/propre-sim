export function parseTextDataToObjects(textData: string) {
  console.log(textData);

  const splittedData = textData.split("\n\n");

  console.log(splittedData);

  const splittedObject = splittedData.map((data, index) => {
    return { id: index, content: data, clicked: false };
  });

  console.log(splittedObject);
  console.log("test");

  return splittedObject;
}

// export function convertInnerHTMLToText(test: string) {
//   console.log(test);
// }

// export function insertDataBlock(event: InputEvent<HTMLDivElement>) {
//   console.log("insertDataBlock");
//   console.log(event.currentTarget.innerHTML);
//   console.log("insertDataBlock");

// }
