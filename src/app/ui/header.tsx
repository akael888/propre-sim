import Link from "next/link";
import { getSession, logoutUser } from "../lib/action";
import Image from "next/image";

export default async function Header() {
  const session = await getSession();
  const user = session?.user;

  return (
    <>
      <div className="w-full grid grid-cols-2 sticky top-0 bg-foreground h-[50%] border-1 border-black">
        <div className="flex flex-row justify-start items-center ">
          <Link href="/" className="p-2 flex gap-2 items-center">
            <Image
              src="/propresim-logo.png"
              alt="Pro Presenter Logo"
              width={40}
              height={40}
            />
            <p className="text-black font-bold"> ProPresenter Simulator</p>
          </Link>
        </div>

        <div className="flex flex-row justify-end items-center  gap-2 p-2">
          {user ? (
            <>
              <Link
                href="/slide"
                className="border-1 p-1 bg-foreground text-background hover:bg-blue-700 rounded-sm"
              >
                Slide Collections
              </Link>
              <button
                className="border-1 p-1 bg-foreground text-background hover:bg-blue-700 rounded-sm"
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

          {/* <Link
            href="/editor"
            className="border-1 p-1 bg-foreground text-background hover:bg-yellow-700"
          >
            Editor
          </Link> */}
        </div>
      </div>
    </>
  );
}
