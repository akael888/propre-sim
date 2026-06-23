import { AppProvider } from "@/app/context/app-provider";
import { getSession, getSlideData } from "@/app/lib/action";
import { defaultTextAttributeData } from "@/app/lib/data";
import { parseTextDataToObjects } from "@/app/lib/utils";
import PreviewHeader from "@/app/ui/preview/preview-header";
import PreviewPanel from "@/app/ui/preview/preview-panel";

export default async function SlidePreview({
  params,
}: {
  params: { slideID: string };
}) {
  const { slideID } = await params;
  const session = await getSession();
  const stored = await getSlideData(slideID, session?.user.id);

  const slideObject = stored
    ? parseTextDataToObjects(stored.textdata.toString())
    : [];

  const slideData = stored
    ? { title: stored.title, description: stored.description }
    : null;

  return (
    <>
      <AppProvider>
        <PreviewHeader slideID={slideID} slideData={slideData} />
        <PreviewPanel
          slideObject={slideObject}
          textAttribute={defaultTextAttributeData}
        />
      </AppProvider>
    </>
  );
}
