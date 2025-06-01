import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Define the User type with `role`
interface CustomUser {
  id: string;
  email: string;
  name: string;
  role: "customer" | "vendor" | "admin";
}
export const auth = () => NextAuth(authOptions);
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        // Replace with real DB check
        if (
          credentials?.email === "customer@test.com" &&
          credentials.password === "123"
        ) {
          const user: CustomUser = {
            id: "1",
            email: "customer@test.com",
            name: "Customer",
            role: "vendor", // Must match "customer" | "vendor" | "admin"
          };
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Now TypeScript knows `role` exists
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "customer" | "vendor" | "admin"; // Type assertion
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};