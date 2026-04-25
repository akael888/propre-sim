"use client";

import { error } from "console";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function LoginPage() {
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setIsLoading(true);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    console.log("result:", result);

    if (result?.error) {
      setLoginMessage("Invalid email or password");
      setIsLoading(false);
      return;
    }

    setLoginMessage("Login successful! Redirecting...");
    setIsLoading(false);
    setTimeout(() => router.push("/editor"), 1500);
  };

  return (
    <div className="bg-foreground/80 p-1 xl:w-200 w-full h-100 flex flex-col justify-center items-center text-center gap-2 rounded-sm">
      <p className="font-bold text-2xl">LOGIN</p>
      {loginMessage && <div>{loginMessage}</div>}
      <form
        className="p-1 flex xl:flex-row flex-col gap-1 [&>*]:border-1 [&>*]:bg-foreground"
        onSubmit={handleLogin}
      >
        <input
          required
          placeholder="Enter Email"
          name="email"
          type="email"
          className="p-2"
        />
        <input
          required
          placeholder="Enter Password"
          name="password"
          type="password"
          className="p-2"
        />
        <button
          className="p-2 hover:bg-gray-900 hover:text-white rounded-sm disabled:bg-black disabled:hover:text-white disabled:text-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in.." : "Login"}
        </button>
      </form>
    </div>
  );
}
