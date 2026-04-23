import { getSession } from "../lib/action";
import Editor from "../ui/editor/editor";

export default async function EditorPage() {
  const session = await getSession();
  const user = session?.user;

  return (
    <>
      <Editor user={user} />
    </>
  );
}
