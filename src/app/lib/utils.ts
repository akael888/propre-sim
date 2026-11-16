export function parseTextDataToObjects(textData: string) {
  // console.log(textData);

  if (textData) {
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
  return [];
}

export async function copyToClipboard(textToCopy: string) {
  try {
    if (textToCopy.length > 0) {
      await navigator.clipboard.writeText(textToCopy);
      return { success: true, message: "Copied!" };
    }
    return { success: false, message: "Empty String!" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Not Copied!" };
  }
}
