"use client";
import { useState } from "react";
import axios from "axios";
import useSWR from 'swr';
import Gallery from './components/Gallery';
import { showToast } from "nextjs-toast-notify";

// Fetcher function para useSWR
const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data.images;
};

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // useSWR para manejo de datos
  const { data: images = [], error, isLoading, mutate } = useSWR('/api/images', fetcher, {
    refreshInterval: 0, // Desactivar polling automático
    revalidateOnFocus: false, // No revalidar al enfocar
    dedupingInterval: 2000 // Evitar requests duplicados
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload successful:", response.data);
      setFile(null);
      // Actualización optimista: agregar imagen inmediatamente
      const newImage = response.data.image;
      if (newImage) {
        // Revalidar datos después de 2.5s para confirmar la subida
        setTimeout(() => mutate(), 2500);

        showToast.success("¡La imagen se subió con éxito!", {
          duration: 4000,
          progress: true,
          position: "top-right",
          transition: "topBounce",
          icon: '',
          sound: true,
        });
      }
      // Revalidar en segundo plano
      mutate();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (publicId) => {

    try {
      // Actualización optimista: remover imagen inmediatamente
      const currentImages = images || [];
      const filteredImages = currentImages.filter(img => img.public_id !== publicId);
      mutate(filteredImages, false);
      
      await axios.delete(`/api/delete?public_id=${encodeURIComponent(publicId)}`);

      showToast.success("¡La imagen eliminada con éxito!", {
        duration: 4000,
        progress: true,
        position: "top-right",
        transition: "topBounce",
        icon: '',
        sound: true,
      });
      // Revalidar en segundo plano
      mutate();
    } catch (error) {
      console.error("Error deleting image:", error);
      // Revertir cambios en caso de error
      mutate();
    }
  };

  return (
    <div className="main-container">
      <h1 className="main-title">Cloudinary Gallery</h1>
      
      <div className="content-layout">
        {/* Formulario de subida - Lado izquierdo */}
        <div className="upload-panel">
          <div className="upload-card">
            <h2>Subir Nueva Imagen</h2>
            <div className="upload-form">
              <div className="file-input-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="file-input"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="file-label">
                  {file ? file.name : "Seleccionar imagen"}
                </label>
              </div>
              
              <button 
                onClick={handleUpload} 
                disabled={!file || uploading}
                className="upload-button"
              >
                {uploading ? (
                  <>
                    <span className="spinner"></span>
                    Subiendo...
                  </>
                ) : (
                  "Subir Imagen"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Galería - Lado derecho */}
        <Gallery 
          images={images}
          isLoading={isLoading}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
