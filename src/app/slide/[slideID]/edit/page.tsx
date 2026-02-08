import Editor from "@/app/ui/editor/editor";

export default async function SlideEditor({
  params,
}: {
  params: { slideID: string };
}) {
  const { slideID } = await params;

  return (
    <>
      <Editor slideID={slideID} />
    </>
  );  
}
