import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Primero intentamos buscar en la carpeta específica
    let result;
    try {
      result = await cloudinary.search
        .expression('folder:nextjs_uploads')
        .max_results(30)
        .execute();
    } catch (folderError) {
      // Si falla, buscamos todas las imágenes
      console.log('Folder search failed, searching all images:', folderError.message);
      result = await cloudinary.search
        .expression('resource_type:image')
        .max_results(30)
        .execute();
    }

    // Ordenamos manualmente por fecha de creación
    const sortedImages = (result.resources || []).sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );

    return NextResponse.json({ 
      images: sortedImages,
      total: result.total_count || 0
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ 
      error: error.message,
      images: [],
      total: 0
    }, { status: 500 });
  }
}