import { AppProvider } from "@/app/context/app-provider";
import { getSession } from "@/app/lib/action";
import Editor from "@/app/ui/editor/editor";

export default async function SlideEditor({
  params,
}: {
  params: { slideID: string };
}) {
  const { slideID } = await params;
  const session = await getSession();
  const user = session?.user;

  return (
    <>
      <AppProvider>
        <Editor slideID={slideID} user={user} />
      </AppProvider>
    </>
  );
}
