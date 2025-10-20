import { NextResponse } from 'next/server';
import { getUserByUsername } from '@/lib/services/userService';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const user = await getUserByUsername(username, password);

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ success: true, user });
    } catch (e) {
        return NextResponse.json({ success: false, error: (e as Error).message }, { status: 500 });
    }
}
