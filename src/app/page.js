"use client";
import { useState } from "react";
import Image from 'next/image';
import axios from "axios";
import useSWR from 'swr';

// Fetcher function para useSWR
const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data.images;
};

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // useSWR para manejo de datos
  const { data: images = [], error, isLoading, mutate } = useSWR('/api/images', fetcher);

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
      // Revalidar datos automáticamente
      mutate();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (publicId) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta imagen?")) return;

    try {
      await axios.delete("/api/delete", {
        data: { publicId }
      });
      // Revalidar datos automáticamente
      mutate();
    } catch (error) {
      console.error("Error deleting image:", error);
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
        <div className="gallery-panel">
          <h2>Galería ({images?.length || 0} imágenes)</h2>
          
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner large"></div>
              <p>Cargando imágenes...</p>
            </div>
          ) : !images || images.length === 0 ? (
            <div className="empty-state">
              <p>No hay imágenes disponibles</p>
              <span>Sube tu primera imagen para comenzar</span>
            </div>
          ) : (
            <div className="gallery-grid">
              {images.map((image) => (
                <div key={image.public_id} className="gallery-item">
                  <div className="image-wrapper">
                    <Image 
                      src={image.secure_url} 
                      alt={image.public_id}
                      width={300}
                      height={200}
                      className="gallery-image"
                      loading="lazy"
                    />
                    <div className="image-overlay">
                      <button 
                        className="delete-button"
                        onClick={() => handleDelete(image.public_id)}
                        title="Eliminar imagen"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="image-info">
                    <span className="image-name">{image.public_id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
