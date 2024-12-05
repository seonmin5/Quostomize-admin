import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';

export async function PATCH(request) {
    const session = await auth();
    const accessToken = session.accessToken;

    const body = await request.json()

    try {
        const backendResponse = await fetch(`${process.env.SERVER_URL}/v1/api/admin/member-role-change`,
            {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });

        if (!backendResponse.status === 204) {
            const errorData = await response.json();
            return NextResponse.json(
                { message: errorData.message || '서버 오류 발생', status: backendResponse.status }
            );
        }
        return new Response(null, {
            status: 204,
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { message: '서버 에러' },
            { status: 500 }
        );
    }
}