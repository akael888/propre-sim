import { AppProvider } from "@/app/context/app-provider";
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
      <AppProvider>
        {" "}
        <Preview slideID={slideID} />
      </AppProvider>
    </>
  );
}
