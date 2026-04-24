// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import { tempSlideData } from "./data";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "../../../auth";
import { cache } from "react";

// const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? process.env.ABSOLUTE_PROD_URL
//     : process.env.ABSOLUTE_TEST_URL;

export async function getData(userID?: string) {
  try {
    if (process.env.DATABASE_URL && userID) {
      const sql = neon(process.env.DATABASE_URL);
      const data = await sql`SELECT * FROM slide WHERE user_id=${userID}`;
      // console.log(data[1].created_at);
      // revalidatePath(`/slide`);
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function submitSlideData(userID: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const textdata = formData.get("textdata") as string;
  const cleanedText = textdata
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\f/g, "\n");

  let data = null;
  data = [{ id: 1 }];
  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);

      data = await sql`INSERT INTO slide (title,description,textdata,user_id)
      VALUES (${title},${description},${cleanedText},${userID}) RETURNING id`;
      console.log(data);
      console.log(`Data ${data} is submitted! `);
      revalidatePath(`/slide`);
    }
  } catch (error) {
    console.log(error);
  }
  redirect(`/slide/${data[0].id}/edit`);
}

export async function getSlideData(slideID: string) {
  console.log(slideID);
  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      const data = await sql`SELECT * FROM slide WHERE id=${slideID}`;
      if (data) {
        console.log(data[0]);
        return data[0];
      }
      console.log(data);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateSlideData(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const textdata = formData.get("textdata") as string;
  const slideID = formData.get("slideID") as string;
  const cleanedText = textdata
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\f/g, "\n");

  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      const data =
        await sql`UPDATE slide SET title = ${title}, description = ${description}, textdata = ${cleanedText} WHERE id=${slideID}`;
      console.log(`Data ${data} is Updated! `);
      revalidatePath(`/slide`);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSlideData(slideID: string) {
  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      const data = await sql`DELETE FROM slide WHERE id=${slideID}`;

      if (data) {
        console.log(data[0]);
        revalidatePath(`/slide`);
        return data[0];
      }
      console.log(data);

      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All Fields are Required" };
  }

  console.log(name);
  console.log(email);
  console.log(password);

  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);

      const exisiting = await sql`SELECT id FROM users WHERE email = ${email}`;

      console.log("exist len" + exisiting.length);

      if (exisiting.length > 0) return { error: "Email already registered" };

      const hashedPassword = await bcrypt.hash(password, 12);

      await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword})`;

      return { success: true };
    } else return { error: "Database not configured" };
  } catch (error) {
    console.log(error);
    return { error: "Something went Wrong" };
  }
}

export const getSession = cache(async () => {
  const session = await auth();
  if (!session?.user) return null;
  return session;
});

export async function logoutUser() {
  await signOut({ redirectTo: "/login" });
}

// export async function loginUser(formData: FormData) {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirect: false,
//     });
//   } catch (error) {
//     return { error };
//   }
// }
