import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get('public_id');

    if (!publicId) {
      return NextResponse.json({ error: "Public ID is required" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      return NextResponse.json({ message: "Image deleted successfully" });
    } else {
      return NextResponse.json({ error: "Failed to delete image" }, { status: 400 });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}