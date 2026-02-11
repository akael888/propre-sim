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

// console.log(splittedObject);
// console.log("test");

// export async function parseFontFilestoFontObjects() {
//   console.log("Parsing Font Files to Font Objects");
//   try {
//     const filePath = path.join(process.cwd(), "src", "app", "fonts");
//     const fileData = readFile(filePath, "utf-8");
//     console.log("filePath");
//     console.log(filePath);
//     console.log("fileData");
//     console.log(fileData);
//     return [{ fontData: 1 }, { fontData: 2 }];
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

// function scrollToSentence(searchText: string) {
//   const textarea = document.getElementById("myTextarea");

//   if (textarea) {
//     const index = textarea.value.indexOf(searchText);

//     if (index !== -1) {
//       textarea.focus();
//       // This selects the text, which forces the browser to scroll to it
//       textarea.setSelectionRange(index, index + searchText.length);
//     } else {
//       alert("Sentence not found!");
//     }
//   }
// }

// export function convertInnerHTMLToText(test: string) {
//   console.log(test);
// }

// export function insertDataBlock(event: InputEvent<HTMLDivElement>) {
//   console.log("insertDataBlock");
//   console.log(event.currentTarget.innerHTML);
//   console.log("insertDataBlock");

// }

export async function copyToClipboard(textToCopy: string) {
  try {
    await navigator.clipboard.writeText(textToCopy);
    console.log();
    return "Copied";
  } catch (error) {
    console.log(error);
    return "Not Copied";
  }
}
