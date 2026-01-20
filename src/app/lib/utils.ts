export function parseTextDataToObjects(textData: string) {
  console.log(textData);

  const splittedData = textData.split("\n\n");

  console.log(splittedData);

  let charIndexInText = 0;

  const splittedObject = splittedData.map((data, index) => {
    const object = { id: index, content: data, charIndex: charIndexInText };
    charIndexInText = charIndexInText + data.length + 2; // Keep track of the latest index of the splitted text
    return object;
  });

  console.log(splittedObject);
  console.log("test");

  return splittedObject;
}

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
