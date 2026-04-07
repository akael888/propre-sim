import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt", maxAge: 30 * 86400 },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        // Check if Credentials if Empty
        if (!credentials?.email || !credentials?.password) return null;

        // Get Neon
        const sql = neon(process.env.DATABASE_URL!);

        // Find Users in DB from Email
        const users =
          await sql`SELECT * FROM users WHERE email=${credentials.email as string}`;

        const user = users[0];

        // If No User Found
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );

        if (!isValid) return null;
        console.log("user");
        console.log(String(user.id));
        return { id: String(user.id), name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: { signIn: "/login" },
});
