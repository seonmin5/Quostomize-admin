import {auth} from "../../../../../auth";
import {NextResponse} from "next/server";


export async function GET(request) {

    const session = await auth();
    const url = new URL(request.url)
    const page = url.searchParams.get("page")
    const size = url.searchParams.get("size")
    const sortBy = url.searchParams.get("sortBy")
    const direction = url.searchParams.get("direction")
    const param = new URLSearchParams({ page, size, sortBy, direction })
    const accessToken = session.accessToken;

    try {
        const backendResponse = await fetch(`${process.env.SERVER_URL}/v1/api/admin/logs/mail?${param}`,
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
            {message: '서버 에러'},
            {status: 500}
        );
    }
}