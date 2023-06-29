import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./nextAuth.options";

/**
 * @param request NextRequest
 * @description check if user is connected or if the request comes from an api key
 */
export const verifyAuthorization = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);

  // if request comes from the api key
  if (request.headers.get("authorization")) {
    return (
      request.headers.get("authorization")?.split(" ")[1] ===
      process.env.API_KEY
    );
  }

  // if user is connected
  if (session) return true;

  // nothing matches
  return false;
};

/**
 * @description check if user is connected and is admin
 */
export const verifyAdmin = async () => {
  const session = await getServerSession(authOptions);
  return session && session.user?.role === "ADMIN";
};

/**
 * @description check if user is connected
 */
export const verifySession = async () => {
  const session = await getServerSession(authOptions);
  return session ? true : false;
};
