import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";


export async function GET(request) {
    const session = await auth();

    const url = new URL(request.url)
    const page = url.searchParams.get("page")
    const searchTerm = url.searchParams.get("searchTerm")
    const param = new URLSearchParams({ page, searchTerm })

    const response = await fetch(`http://localhost:8080/v1/api/admin/card-search?${param}`, // 서버 엔드포인트 지정
        {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`
            },
            credentials: "include",
            cache: "no-store"
        }
    );

    const result = await response.json();

    if (response.status >= 400) {
        return NextResponse.json({ redirectUrl: 'login' }, { status: response.status })
    } else {
        return NextResponse.json(result.data, { status: 200 });
    }
};
