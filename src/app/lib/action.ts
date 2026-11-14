// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import { tempSlideData } from "./data";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "../../../auth";
import { cache } from "react";

export const getSession = cache(async () => {
  const session = await auth();
  if (!session?.user) return null;
  return session;
});

const getUserId = cache(async () => {
  const session = await auth();
  if (!session?.user) return null;
  return session?.user?.id ?? null;
});
// const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? process.env.ABSOLUTE_PROD_URL
//     : process.env.ABSOLUTE_TEST_URL;

export async function getData() {
  const userID = await getUserId();

  try {
    if (process.env.DATABASE_URL && userID) {
      const sql = neon(process.env.DATABASE_URL);
      const data =
        await sql`SELECT * FROM slide WHERE user_id=${userID} ORDER BY created_at DESC`;
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
export async function getXAmountOfData(amountOfData: number = 1) {
  const userID = await getUserId();
  try {
    if (process.env.DATABASE_URL && userID) {
      const sql = neon(process.env.DATABASE_URL);
      const data =
        await sql`SELECT * FROM slide WHERE user_id=${userID} ORDER BY created_at DESC LIMIT ${amountOfData}`;
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

export async function submitSlideData(formData: FormData) {
  const userID = await getUserId();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const textdata = formData.get("textdata") as string;
  const cleanedText = textdata
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\f/g, "\n");

  let data = null;
  try {
    if (process.env.DATABASE_URL && userID) {
      const sql = neon(process.env.DATABASE_URL);

      data = await sql`INSERT INTO slide (title,description,textdata,user_id)
      VALUES (${title},${description},${cleanedText},${userID}) RETURNING id`;
      console.log(data);
      console.log(`Data ${data} is submitted! `);
      revalidatePath(`/slide`);
    }
  } catch (error) {
    console.log("Database insert failed:", error);
    return { error: "Failed to save slide Data" };
  }
  if (data) {
    redirect(`/slide/${data[0].id}/edit`);
  }
}

export async function getSlideData(slideID: string) {
  // console.log(slideID);
  const userID = await getUserId();

  try {
    if (process.env.DATABASE_URL && userID) {
      const sql = neon(process.env.DATABASE_URL);
      const data =
        await sql`SELECT * FROM slide WHERE id=${slideID} AND user_id=${userID}`;
      if (data.length > 0) {
        return data[0];
      }
      return null;
    }
    console.log("No User Found");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateSlideData(prevState: any, formData: FormData) {
  const userID = await getUserId();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const textdata = formData.get("textdata") as string;
  const slideID = formData.get("slideID") as string;
  const cleanedText = textdata
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\f/g, "\n");

  try {
    if (process.env.DATABASE_URL && userID) {
      const sql = neon(process.env.DATABASE_URL);
      const data =
        await sql`UPDATE slide SET title = ${title}, description = ${description}, textdata = ${cleanedText} WHERE id=${slideID} AND user_id=${userID} RETURNING id`;
      if (data.length > 0) {
        revalidatePath(`/slide`);
        return { success: true, message: "Updated Slide Data" };
      }
      return { success: false, message: "Does not found the correct Slide" };
    }
    return { success: false, message: "Detected Incorrect User" };
  } catch (error) {
    console.log("Database update failed:", error);
    return { success: false, message: "Failed to update slide Data" };
  }
}

export async function deleteSlideData(slideID: string) {
  const userID = await getUserId();

  try {
    if (process.env.DATABASE_URL && userID) {
      const sql = neon(process.env.DATABASE_URL);
      const data =
        await sql`DELETE FROM slide WHERE id=${slideID} AND user_id=${userID} RETURNING id`;
      if (data.length > 0) {
        revalidatePath(`/slide`);
        return { success: true, message: "Deleted a slide Data" };
      }
      return { success: false, message: "Slide not Found" };
    }
    return { success: false, message: "Detected Incorrect User" };
  } catch (error) {
    console.log("Database delete failed:", error);
    return { success: false, message: "Failed to delete slide Data" };
  }
}

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All Fields are Required" };
  }

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
