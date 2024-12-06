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
      return NextResponse.json("로그아웃 완료", {status: 200});
  } catch(err) {
    return NextResponse.json("서버에 문제가 발생했습니다.", {status: 500});
  } finally {
    await signOut({ redirect: false });
  }
};