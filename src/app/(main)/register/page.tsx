"use client";

import { registerUser } from "@/app/lib/action";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [registerMessage, setRegisterMessage] = useState("Register here..");

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await registerUser(formData);

    if (result?.error) {
      setRegisterMessage(result.error);
    }

    setRegisterMessage("Registered succesfully! Redirecting...");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <>
      <div className="bg-foreground text-black flex flex-col justify-center items-center p-1 h-screen w-full text-center">
        <div>Register: </div>
        {registerMessage ? (
          <>
            <div>{registerMessage}</div>
          </>
        ) : null}

        <form
          className="p-1 flex gap-1 [&>*]:border-1"
          // onSubmit={handleRegister}
          onSubmit={handleRegister}
        >
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
