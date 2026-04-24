import Link from "next/link";
import { getSession, logoutUser } from "../lib/action";

export default async function Header() {
  const session = await getSession();
  const user = session?.user;

  return (
    <>
      <div className="w-full grid grid-cols-2 sticky top-0 bg-black h-[50%]">
        <div className="flex flex-row justify-start items-center w-full">
          <Link href="/" className="p-2">
            ProPresenter Sim
          </Link>
        </div>

        <div className="flex flex-row justify-end items-center w-full gap-2">
          {user ? (
            <>
              <Link
                href="/slide"
                className="border-1 p-1 bg-foreground text-background hover:bg-blue-700"
              >
                Slide Collections
              </Link>
              <button
                className="border-1 p-1 bg-foreground text-background hover:bg-blue-700"
                onClick={logoutUser}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              {" "}
              <Link
                href="/login"
                className="border-1 p-1 bg-foreground text-background hover:bg-yellow-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="border-1 p-1 bg-foreground text-background hover:bg-yellow-700"
              >
                Register
              </Link>
            </>
          )}

          <Link
            href="/editor"
            className="border-1 p-1 bg-foreground text-background hover:bg-yellow-700"
          >
            To Editor
          </Link>
        </div>
      </div>
    </>
  );
}
