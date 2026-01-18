export function parseTextDataToObjects(textData: string) {
  console.log(textData);

  const splittedData = textData.split("\n\n");

  console.log(splittedData);

  const splittedObject = splittedData.map((data, index) => {
    return { id: index, content: data };
  });

  console.log(splittedObject);
  console.log("test")

  return splittedObject;
}
