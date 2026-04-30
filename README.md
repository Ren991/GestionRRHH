# 🚀Gestión de Talentos RRHH

Un Sistema de Seguimiento de Candidatos (ATS) moderno, robusto y minimalista diseñado para centralizar la recepción de CVs y la administración de vacantes en tiempo real. Desarrollado con el stack de vanguardia para garantizar velocidad y escalabilidad desde **Rosario** hacia el mundo.

## 🛠️ Stack Tecnológico
*   **Framework:** Next.js (App Router) con soporte para Server Actions.
*   **Base de Datos:** Turso (SQLite en el Edge) para una latencia mínima.
*   **Estilos:** Tailwind CSS con una estética refinada, uso de desenfoques (glassmorphism) y tipografía serif.
*   **Seguridad:** Validaciones de integridad por IP, Email y Rate Limiting (máximo 3 postulaciones diarias).
*   **Librerías:** SweetAlert2 para feedback de usuario y UUID para identificadores únicos de registros.

## ✨ Características Principales
*   **Postulaciones Blindadas:** Sistema de detección de duplicados por IP y Correo Electrónico para mantener la base de datos limpia.
*   **Gestión de Archivos:** Procesamiento de CVs en formato PDF guardados como `BLOB` directamente en la base de datos.
*   **Panel Administrativo:**
    *   Visualización dinámica de candidatos y estados de postulación.
    *   Gestión de ubicación del candidato (Rosario / Remoto / Híbrido).
    *   Descarga de documentos en Base64 directamente desde el panel.
    *   Baja física de registros mediante modales de confirmación imperativos.

## 🚀 Instalación y Configuración Local

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/gestion-rrhh.git](https://github.com/tu-usuario/gestion-rrhh.git)
    cd gestion-rrhh
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade tus credenciales de Turso:
    ```env
    TURSO_DATABASE_URL=libsql://tu-base-de-datos.turso.io
    TURSO_AUTH_TOKEN=tu_token_aqui
    ```

4.  **Correr en desarrollo:**
    ```bash
    npm run dev
    ```

## 📦 Despliegue
Este proyecto está optimizado para ser desplegado en **Vercel**:
1.  Conecta tu repositorio de GitHub a Vercel.
2.  Carga las Variables de Entorno (`TURSO_DATABASE_URL` y `TURSO_AUTH_TOKEN`) en el Dashboard de configuración.
3.  Vercel ejecutará automáticamente el `npm run build` y desplegará la aplicación en el Edge.

---
Desarrollado por **Renzo Beccari** — Full Stack Developer.