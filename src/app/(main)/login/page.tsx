"use client";

import { authClient } from "@/app/lib/data";

export default function LoginPage() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!authClient) {
      console.log("Auth Client Empty");
      return;
    }

    try {
      await authClient.signIn.email({ email: email, password: password });
      console.log("Logged In!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-foreground text-black flex flex-col justify-center items-center p-1 h-screen w-full text-center">
        <div>Login: </div>

        <form className="p-1 flex gap-1 [&>*]:border-1" onSubmit={handleLogin}>
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
            Login
          </button>
        </form>
      </div>
    </>
  );
}
