"use client";

import { authClient } from "@/app/lib/data-client";
import { useState } from "react";

export default function RegisterPage() {
  const [registerMessage, setRegisterMessage] = useState("Register here..");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!authClient) {
      console.log("Auth Client Empty");
      return;
    }

    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          callbackURL: "/register",
        },
        {
          onSuccess: () => {
            setRegisterMessage("Registered");
          },
          onError: (ctx) => {
            console.log(registerMessage);
            setRegisterMessage(ctx.error.message);
          },
        },
      );
    } catch (error) {
      const errorMessage = error.message as string;
      console.log(errorMessage);
      setRegisterMessage(errorMessage);
    }
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
