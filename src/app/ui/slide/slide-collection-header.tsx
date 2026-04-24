import { getSession } from "@/app/lib/action";

export default async function SlideCollectionHeader({}) {
  const session = await getSession();
  const user = session?.user;

  return (
    <>
      <span>Hi {user?.name}!</span>
    </>
  );
}
