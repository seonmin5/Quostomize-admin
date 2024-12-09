import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";


export async function GET(request) {
    const session = await auth();

    const url = new URL(request.url)
    const page = url.searchParams.get("page")
    const sortDirection = url.searchParams.get("sortDirection")
    const param = new URLSearchParams({ page, sortDirection })

    const response = await fetch(`${process.env.SERVER_URL}/v1/api/admin/payment-record-info?${param}`, // 서버 엔드포인트 지정
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