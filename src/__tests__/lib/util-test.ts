import { parseTextDataToObjects } from "@/app/lib/utils";

describe("Util Testing", () => {
  it("Testing if Text Parsing to JS Object is Correct", () => {
    const testText = "Text 1\n\nText 2\n\nText 3\n\n";
    expect(parseTextDataToObjects(testText).length).toBe(4);
  });
});
