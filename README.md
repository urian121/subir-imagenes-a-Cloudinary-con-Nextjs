# Galería de Imágenes con Next.js y Cloudinary

Aplicación web moderna para subir, visualizar y gestionar imágenes utilizando Next.js como framework frontend y Cloudinary como servicio de almacenamiento en la nube. Incluye funcionalidades de carga optimista, eliminación instantánea y galería responsiva con componentes modulares.

![](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/refs/heads/master/subir-imagenes-con-Nextjs-y-Cloudinary.gif)

## 🚀 Instalación y Configuración

1. **Clonar el repositorio e instalar dependencias:**
   ```bash
   git clone https://github.com/urian121/subir-imagenes-a-Cloudinary-con-Nextjs
   cd subir-imagenes-a-Cloudinary-con-Nextjs
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env-example .env.local
   ```
   Edita `.env.local` con tus credenciales de Cloudinary:
   ```
   CLOUDINARY_CLOUD_NAME=tu_cloud_name
   CLOUDINARY_API_KEY=tu_api_key
   CLOUDINARY_API_SECRET=tu_api_secret
   ```

3. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`

## 🛠️ Tecnologías y Librerías

### Frontend
- **Next.js 15** - Framework React con App Router y Server Components
- **React 18** - Biblioteca para interfaces de usuario
- **SWR** - Librería para fetching de datos con cache y revalidación automática
- **Axios** - Cliente HTTP para peticiones a la API

### Backend/API
- **Next.js API Routes** - Endpoints serverless integrados
- **Cloudinary SDK** - Servicio de gestión y optimización de imágenes
- **Multer** - Middleware para manejo de archivos multipart

### Estilos
- **CSS Modules/Global CSS** - Estilos con scope local y global
- **CSS Grid/Flexbox** - Layout responsivo moderno

### Características
- ✅ Carga optimista de imágenes
- ✅ Eliminación instantánea con rollback en caso de error
- ✅ Componentes modulares y reutilizables
- ✅ Interfaz responsiva y moderna
- ✅ Gestión de estados con SWR
- ✅ Validación de archivos y manejo de errores

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── images/     # GET - Obtener todas las imágenes
│   │   ├── upload/     # POST - Subir nueva imagen
│   │   └── delete/     # DELETE - Eliminar imagen
│   ├── components/
│   │   └── Gallery.js  # Componente de galería modular
│   ├── styles/
│   │   └── globals.css # Estilos globales
│   └── page.js         # Página principal
└── lib/
    └── cloudinary.js   # Configuración de Cloudinary
```
