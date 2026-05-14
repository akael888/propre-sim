import { AppProvider } from "../context/app-provider";
import { getSession } from "../lib/action";
import Editor from "../ui/editor/editor";

export default async function EditorPage() {
  const session = await getSession();
  const user = session?.user;

  return (
    <>
      <AppProvider>
        <Editor user={user} />
      </AppProvider>
    </>
  );
}
