import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";


export async function GET(request) {
    const session = await auth();

    const url = new URL(request.url)
    const page = url.searchParams.get("page")
    const searchAmount = url.searchParams.get("searchAmount")
    const searchType = url.searchParams.get("searchType")
    const param = new URLSearchParams({ page, searchAmount, searchType })

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/admin/payment-record-search?${param}`, // 서버 엔드포인트 지정
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