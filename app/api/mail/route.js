import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export async function POST(request) {
  const session = await auth();
  const accessToken = session.accessToken;
  const formData = await request.formData();

  const backendFormData = new FormData();
  backendFormData.append('title', formData.get('title'));
  backendFormData.append('optionalTerms', formData.get('optionalTerms'));
  backendFormData.append('htmlFile', formData.get('htmlFile'));

  const response = await fetch(
    `${process.env.SERVER_URL}/v1/api/admin/email`,
    {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        credentials: "include",
        cache: "no-store",
        duplex: "half",
        body: backendFormData
    }
  );
  console.log(response);
  
  if (response.status === 400) {
    return NextResponse.json({message: "제목과 내용을 다시 확인해주세요"}, {status: 400});
  }

  if (response.status === 401 || response.state === 403) {
    return NextResponse.redirect("/", {status: response.status});
  }

  return NextResponse.json({message: "알림을 성공적으로 보냈습니다."}, {status:200});

}