import Editor from "@/app/ui/editor/editor";
import Preview from "@/app/ui/preview/preview";

export default async function SlidePreview({
  params,
}: {
  params: { slideID: string };
}) {
  const { slideID } = await params;

  return (
    <>
      <Preview slideID={slideID} />
    </>
  );
}
