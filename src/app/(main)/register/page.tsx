import { registerUser } from "@/app/lib/action";

export default function RegisterPage() {
  return (
    <>
      <div className="bg-foreground text-black flex flex-col justify-center items-center p-1 h-screen w-screen text-center">
        <div>Register: </div>

        <form className="p-1 flex gap-1 [&>*]:border-1" action={registerUser}>
          <input
            required={true}
            placeholder="Enter Name"
            name="name"
            minLength={3}
            maxLength={20}
          />
          <input required={true} placeholder="Enter Email" name="email" />
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
            Register
          </button>
        </form>
      </div>
    </>
  );
}
