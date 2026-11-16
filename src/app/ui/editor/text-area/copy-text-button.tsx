import { copyToClipboard } from "@/app/lib/utils";
import { useState } from "react";

function CopyTextButton({ textToCopy }: { textToCopy: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyText = async () => {
    try {
      const result = await copyToClipboard(textToCopy);
      if (result.success) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 900);
        return true;
      }
    } catch (error) {
      alert(`Failed to Copy ${error}`);
      return false;
    }
  };
  return (
    <>
      <button
        className="border-1 p-1 hover:bg-green-400 bg-green-300/50 w-20 rounded-sm disabled:bg-gray-400"
        onClick={() => {
          copyText();
        }}
        disabled={isCopied || textToCopy.length <= 0}
      >
        {isCopied ? "Copied ✓" : "Copy"}
      </button>
    </>
  );
}

export default CopyTextButton;
