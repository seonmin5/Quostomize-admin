import { NextResponse } from "next/server";
import { auth, signOut } from "../../../../auth"

export async function POST(request) {
  const session = await auth();
  const accessToken = session.accessToken;
  
  try {
      const response = await fetch(`${process.env.SERVER_URL}/v1/api/auth/logout`,
          {
              method: "POST",
              headers: {
                  "Content-type": "application/json",
                  "Authorization": `Bearer ${accessToken}`,
                  "traceId": `${session.traceId}`
              },
              credentials: "include",
              cache: "no-store"
          }
      );
  } catch(err) {

  } finally {
    await signOut({ redirect: false });
  }
};