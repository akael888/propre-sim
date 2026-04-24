
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
      <Editor slideID={slideID} user={user} />
    </>
  );
}
