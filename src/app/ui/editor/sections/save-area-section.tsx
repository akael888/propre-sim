import { getSession, submitSlideData, updateSlideData } from "@/app/lib/action";
import SaveAreaClient from "./save-area-client";

async function SaveSection({
  slideID,
  textAreaData,
  slideData,
  slideDataStatic,
  handleSlideDataObjectChanges,
  isTextAreaNotChanged,
}: {
  slideID?: string;
  textAreaData: string;
  slideData: {
    title: string;
    description: string;
  };
  slideDataStatic: {
    title: string;
    description: string;
  };
  handleSlideDataObjectChanges: (data: {
    title: string;
    description: string;
  }) => void;
  isTextAreaNotChanged: boolean;
}) {
  const session = await getSession();
  const user = session?.user;
  const submitSlideDatawithID = user?.id && submitSlideData.bind(null, user.id);

  return (
    <>
      <SaveAreaClient
        slideID={slideID}
        user={user}
        submitAction={submitSlideDatawithID}
        textAreaData={textAreaData}
        slideData={slideData}
        slideDataStatic={slideDataStatic}
        handleSlideDataObjectChanges={handleSlideDataObjectChanges}
        isTextAreaNotChanged={isTextAreaNotChanged}
      />
    </>
  );
}

export default SaveSection;
