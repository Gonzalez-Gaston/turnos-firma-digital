# Sistema de Turnos - Firma Digital Salta

Sistema web para la gestión de turnos para certificados de firma digital en la Provincia de Salta, Argentina.

## Características

- 🗓️ **Gestión de Turnos**: Sistema administrativo para gestionar turnos con tablero semanal
- 👥 **Panel Administrativo**: Dashboard completo para administradores
- 🔐 **Autenticación Simple**: Sistema de login para administradores
- 💬 **Chatbot Integrado**: Conexión con WhatsApp, Telegram y webhooks n8n
- 📱 **Responsive**: Diseño adaptable para móviles y desktop
- 🎨 **Diseño Profesional**: Paleta de colores oficial de Salta

## Tecnologías

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript + PostgreSQL
- **Base de Datos**: PostgreSQL
- **Iconos**: Lucide React
- **Build**: Vite

## Arquitectura del Sistema

### Frontend (Puerto 5173)
- React con TypeScript
- Tailwind CSS para estilos
- Gestión de estado con Context API
- Rutas con React Router

### Backend (Puerto 3001)
- Express.js con TypeScript
- PostgreSQL como base de datos
- API REST completa
- Validación con Joi

## Instalación y Configuración

### 1. Frontend

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### 2. Backend

```bash
# Ir al directorio del backend
cd turnos-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones de PostgreSQL

# Ejecutar migraciones
npm run migrate

# Iniciar servidor de desarrollo
npm run dev

# Para producción
npm run build
npm start
```

### 3. Base de Datos PostgreSQL

```sql
-- Crear base de datos
CREATE DATABASE turnos_db;

-- La tabla se crea automáticamente con las migraciones
-- Estructura de la tabla turnos:
CREATE TABLE public.turnos (
  id serial4 NOT NULL,
  fecha date NULL,
  nombre varchar NULL,
  tipodefirma varchar NULL,
  cuil varchar NULL,
  dni varchar NULL,
  organismo varchar NULL,
  motivo varchar NULL,
  estado varchar NULL,
  telefono varchar NULL,
  idcalendar varchar NULL,
  fechahoraregistro timestamptz NULL,
  hora time NULL,
  CONSTRAINT turnos_pk PRIMARY KEY (id)
);
```

## Estructura del Proyecto

```
├── src/                          # Frontend React
│   ├── components/
│   │   ├── Layout/              # Header, Footer
│   │   ├── turnos/              # Componentes de gestión de turnos
│   │   ├── ChatbotWidget.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/                # Context providers
│   ├── lib/                     # APIs y configuraciones
│   ├── pages/                   # Páginas principales
│   └── App.tsx
├── turnos-backend/              # Backend Express.js
│   ├── src/
│   │   ├── database/           # Conexión y migraciones
│   │   ├── middleware/         # Middlewares
│   │   ├── routes/             # Rutas de la API
│   │   ├── types/              # Tipos TypeScript
│   │   └── server.ts
│   └── package.json
└── package.json                # Frontend dependencies
```

## API Endpoints

### Turnos
- `GET /api/turnos/tablero-semanal` - Obtener tablero semanal
- `POST /api/turnos` - Crear turno
- `GET /api/turnos` - Listar turnos con filtros
- `GET /api/turnos/:id` - Obtener turno por ID
- `PUT /api/turnos/:id` - Actualizar turno
- `DELETE /api/turnos/:id` - Eliminar turno

### Sistema
- `GET /api/health` - Estado de la API
- `GET /api/health/db` - Estado de la base de datos

## Funcionalidades

### Para Administradores
- Dashboard con estadísticas
- Tablero semanal dinámico
- Gestión completa de turnos (crear, confirmar, cancelar, completar)
- Vista de calendario con slots de tiempo
- Filtros y búsqueda
- Autenticación segura

### Para Usuarios
- Información sobre firma digital
- Página de contacto para solicitar turnos
- Chatbot de asistencia
- Diseño responsive

## Tablero Semanal

El tablero semanal permite:

- **Vista de calendario**: 7 días con slots de tiempo cada 30 minutos
- **Gestión visual**: Colores por estado (disponible, pendiente, confirmado, etc.)
- **Creación rápida**: Click en slot verde para crear turno
- **Gestión de turnos**: Click en turno ocupado para ver detalles y gestionar
- **Navegación**: Botones para ir a semana anterior/siguiente

## Estados de Turnos

- **Pendiente**: Turno creado, pendiente de confirmación
- **Confirmado**: Turno confirmado por el administrador
- **Cancelado**: Turno cancelado
- **Completado**: Turno completado exitosamente

## Paleta de Colores

- **Primario**: #063763 (Azul institucional)
- **Secundario**: #8BABC7 (Azul claro)
- **Acento**: #BB1821 (Rojo)
- **Acento Claro**: #DE6B73 (Rosa)

## Horarios de Atención

- **Días**: Martes y Jueves
- **Horario**: 9:00 AM - 1:00 PM
- **Turnos**: Cada 30 minutos

## Credenciales de Administrador

- **Email**: admin@firmadigitalsalta.gob.ar
- **Contraseña**: admin123

## Desarrollo

### Iniciar ambos servidores

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd turnos-backend
npm run dev
```

### URLs de desarrollo
- Frontend: http://localhost:5173
- Backend API: http://localhost:3002
- Admin Dashboard: http://localhost:5173/admin

## Soporte

Para soporte técnico, contactar a: soporte@firmadigitalsalta.gob.ar