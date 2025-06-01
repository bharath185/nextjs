import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: "customer" | "vendor" | "admin";
    } & DefaultSession["user"];
  }

  interface User {
    role: "customer" | "vendor" | "admin";
  }
}