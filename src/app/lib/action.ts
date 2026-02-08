// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";

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

  let data = [{ id: 1 }];

  try {
    if (process.env.DATABASE_URL) {
      const sql = neon(process.env.DATABASE_URL);
      data = await sql`INSERT INTO slide (title,description,textdata)
      VALUES (${title},${description},${cleanedText}) RETURNING id`;
      console.log(data);
      console.log(`Data ${data} is submitted! `);
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
    }
  } catch (error) {
    console.log(error);
  }
}
