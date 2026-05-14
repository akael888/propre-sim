import { TextAttributeProvider } from "../context/text-attribute-context";
import { getSession } from "../lib/action";
import Editor from "../ui/editor/editor";

export default async function EditorPage() {
  const session = await getSession();
  const user = session?.user;

  return (
    <>
      <TextAttributeProvider>
        <Editor user={user} />
      </TextAttributeProvider>
    </>
  );
}
