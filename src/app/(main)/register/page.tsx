"use client";

import { registerUser } from "@/app/lib/action";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [registerMessage, setRegisterMessage] = useState("");

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (result?.error) {
      setRegisterMessage(result.error);
      return;
    }

    setRegisterMessage("Registered succesfully! Redirecting...");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <>
      <div className="bg-foreground/80 p-1 xl:w-200 w-full h-100 flex flex-col justify-center items-center text-center gap-2 rounded-sm">
        <p className="font-bold text-2xl">REGISTER</p>

        {registerMessage && <div>{registerMessage}</div>}

        <form
          className="p-1 flex gap-1 [&>*]:border-1  xl:flex-row flex-col [&>*]:bg-foreground"
          // onSubmit={handleRegister}
          onSubmit={handleRegister}
        >
          <input
            required={true}
            placeholder="Enter Name"
            name="name"
            minLength={3}
            maxLength={20}
            className="p-2"
          />
          <input
            required={true}
            placeholder="Enter Email"
            name="email"
            type="email"
            className="p-2"
          />
          <input
            required={true}
            placeholder="Enter Password"
            name="password"
            type="password"
            className="p-2"
          />
          <button
            className="p-2 hover:bg-gray-900 hover:text-white rounded-sm"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
