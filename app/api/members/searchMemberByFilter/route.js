import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';

export async function GET(request) {
    const session = await auth();
    const accessToken = session.accessToken;

    const url = new URL(request.url)
    const page = url.searchParams.get("page")
    const sortDirection = url.searchParams.get("sortDirection")
    const memberRole = url.searchParams.get("memberRole")
    const param = new URLSearchParams({ page, sortDirection, memberRole })
    try {
        const backendResponse = await fetch(`${process.env.SERVER_URL}/v1/api/admin/member-info?${param}`,
            {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                credentials: 'include',
            });

        const result = await backendResponse.json();

        if (!backendResponse.ok) {
            return NextResponse.json(
                { message: 'Backend server error' },
                { status: backendResponse.status }
            );
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { message: '서버 에러' },
            { status: 500 }
        );
    }
}