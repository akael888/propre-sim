// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
  if (process.env.DATABASE_URL) {
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`SELECT * FROM name`;
    return data;
  }
}

export async function submitSlideData(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const textdata = formData.get("textdata") as string;
  const cleanedText = textdata
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\f/g, "\n");

  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      const data = await sql`INSERT INTO slide (title,description,textdata)
      VALUES (${title},${description},${cleanedText})`;
      console.log(`Data ${data} is submitted! `);
    }
  } catch (error) {
    console.log(error);
  }
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
