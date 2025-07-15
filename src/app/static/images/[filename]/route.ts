import { NextRequest, NextResponse } from "next/server";

//proxy the image from the backend through nextjs backend
export async function GET(
    request: NextRequest,
    { params }: { params: { filename: string } }
) {
    try {
        const backendUrl = `http://localhost:8080/static/images/${params.filename}`;
        const backendRes = await fetch(backendUrl);
        if (!backendRes.ok) {
            return new NextResponse("Image not found", { status: 404 });
        }
        const contentType = backendRes.headers.get("content-type") || "image/jpeg";
        const imageBuffer = await backendRes.arrayBuffer();
        return new NextResponse(Buffer.from(imageBuffer), {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error proxying image:", error);
        return new NextResponse("Error fetching image", { status: 500 });
    }
} 