import Image from 'next/image';

export default function Gallery({ images, isLoading, onDelete }) {
  return (
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
                <div className="image-overlay-visible">
                  <button 
                    className="delete-button"
                    onClick={() => onDelete(image.public_id)}
                    title="Eliminar imagen"
                  >
                    ✕
                  </button>
                </div>
              </div>
             <div className="image-info">
                <a 
                  href={image.secure_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="image-name"
                >
                  {image.public_id}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}