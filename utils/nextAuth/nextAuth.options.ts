import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { compare } from "bcryptjs";
import { prisma } from "../prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
    //maxAge: 30 * 24 * 60 * 60, // 30 days
    //days * hours * minutes * seconds
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
            select: {
              user_email: true,
              user_password: true,
              user_first_name: true,
              user_last_name: true,
              user_role: true,
              user_status: true,
              user_image: true,
            },
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
            lastName: user.user_last_name,
            picture: user.user_image || null,
            role: user.user_role,
          };
        } catch (err: any) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
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

//type declaration for next-auth session user (with custom keys)
declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
      picture: string | null;
      lastName: string;
      role: string;
      sub: number;
      exp: number;
      iat: number;
      jti: string;
    };
  }
}
