import { copyToClipboard, parseTextDataToObjects } from "@/app/lib/utils";

describe("Util: Parse Text Data to Objects", () => {
  it("Test 4 Object", () => {
    const testText = "Text 1\n\nText 2\n\nText 3\n\n";
    expect(parseTextDataToObjects(testText)?.length).toBe(4);
  });

  it("Empty String", () => {
    const text = "";
    expect(parseTextDataToObjects(text)?.[0].content).toBe(undefined);
    expect(parseTextDataToObjects(text)?.length).toBe(undefined);
  });

  it("Text without Double Enter", () => {
    const text = "Text123";
    expect(parseTextDataToObjects(text)?.length).toBe(1);
  });

  it("Text with Double Enter and Correct Value", () => {
    const text = "Hi\n\nThere";
    expect(parseTextDataToObjects(text)?.[0].content).toBe("Hi");
    expect(parseTextDataToObjects(text)?.[1].content).toBe("There");
    expect(parseTextDataToObjects(text)?.length).toBe(2);
  });
});

describe("Util: Copy Text Data to Clipboard", () => {
  //Save Original Clipboard
  const originalClipboard = global.navigator.clipboard;

  //Setup Navigator before Each Test
  beforeEach(() => {
    const mockClipboard = {
      writeText: jest.fn().mockResolvedValue(undefined),
      // readText: jest.fn().mockResolvedValue("mocked test"),
    };

    Object.defineProperty(navigator, "clipboard", {
      value: mockClipboard,
      writable: true,
      configurable: true,
    });
  });

  //Reset and Put Back Navigator
  afterEach(() => {
    jest.resetAllMocks();
    Object.defineProperty(navigator, "clipboard", {
      value: originalClipboard,
      writable: true,
      configurable: true,
    });
  });

  it("Correct Copy Empty Text", async () => {
    const result = await copyToClipboard("");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Empty String!");
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(0);
  });

  it("Correct Copy Text Data", async () => {
    const result = await copyToClipboard("Test 12345");
    expect(result.success).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Test 12345");
  });

  it("Correct Copy Text Data With Enter", async () => {
    const result = await copyToClipboard("Test 12345\n\nTest123");
    expect(result.success).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "Test 12345\n\nTest123",
    );
  });

  it("Copy to clipboard Failed", async () => {
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(
      new Error("Denied"),
    );
    const result = await copyToClipboard("Test 12345");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Not Copied!");
  });
});
