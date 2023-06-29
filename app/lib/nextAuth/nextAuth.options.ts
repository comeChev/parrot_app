import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "your email and password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      // ts error from authorize typing in next-auth
      // ignore it for now
      // @ts-ignore
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            throw new Error("Mauvais identifiants");
          }

          const user = await prisma.user.findUnique({
            where: {
              user_email: credentials.email,
            },
          });

          if (
            !user ||
            !(await compare(credentials.password, user.user_password))
          ) {
            throw new Error("Mauvais identifiants");
          }
          if (user.user_status === "INACTIVE") {
            throw new Error("Votre compte est désactivé");
          }

          return {
            //token.sub refer to the user id
            email: user.user_email,
            name: user.user_first_name,
            picture: user.user_image || null,
            lastName: user.user_last_name,
            role: user.user_role,
          };
        } catch (err: any) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      //we add the token infos to the session
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        //we add the user infos to the token
        return { ...token, ...u };
      }
      return token;
    },
  },
};
