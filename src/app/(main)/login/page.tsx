import { loginUser } from "@/app/lib/action";

export default function LoginPage() {
  return (
    <>
      <div className="bg-foreground text-black flex flex-col justify-center items-center p-1 h-screen w-screen text-center">
        <div>Login: </div>

        <form className="p-1 flex gap-1 [&>*]:border-1" action={loginUser}>
          <input required={true} placeholder="Enter Username" name="username" />
          <input
            required={true}
            placeholder="Enter Password"
            name="password"
            type="password"
          />
          <button
            className="p-1 hover:bg-gray-900 hover:text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
