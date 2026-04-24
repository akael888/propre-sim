"use client";

import { error } from "console";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [loginMessage, setLoginMessage] = useState("Login Page..");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log("result:", result);

    if (result?.error) {
      setLoginMessage("Invalid email or password");
      return;
    }

    setLoginMessage("Login successful! Redirecting...");
    setTimeout(() => router.push("/editor"), 1500);
  };

  return (
    <div className="bg-foreground text-black flex flex-col justify-center items-center p-1 h-screen w-full text-center">
      <div>Login:</div>
      {loginMessage && <div>{loginMessage}</div>}
      <form className="p-1 flex gap-1 [&>*]:border-1" onSubmit={handleLogin}>
        <input required placeholder="Enter Email" name="email" type="email" />
        <input
          required
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
  );
}
