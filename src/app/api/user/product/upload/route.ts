import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
        return NextResponse.json({ success: false, message: "No file uploaded." }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);
    await writeFile(filePath, buffer);
    const imageUrl = `/uploads/${fileName}`;
    return NextResponse.json({ success: true, imageUrl });
}