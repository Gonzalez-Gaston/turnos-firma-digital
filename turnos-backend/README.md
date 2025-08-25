# Backend de Gestión de Turnos

Backend completo para la gestión de turnos con tablero semanal dinámico.

## Características

- 🚀 **Express.js** con TypeScript
- 🐘 **PostgreSQL** como base de datos
- 📊 **Tablero semanal** dinámico
- 🛡️ **Validación** de datos con Joi
- 📝 **API REST** completa
- 🔍 **Filtros y paginación**

## Instalación

### Prerrequisitos

- Node.js 18+
- PostgreSQL 12+
- npm o yarn

### Configuración

1. **Instalar dependencias:**
```bash
cd turnos-backend
npm install
```

2. **Configurar base de datos:**
```bash
# Crear base de datos PostgreSQL
createdb turnos_db
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Ejecutar migraciones:**
```bash
npm run migrate
```

## Desarrollo

```bash
# Modo desarrollo con hot reload
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar en producción
npm start
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

## Tablero Semanal

El endpoint `/api/turnos/tablero-semanal` devuelve:

```json
{
  "success": true,
  "data": {
    "weekStart": "2024-01-29",
    "weekEnd": "2024-02-04",
    "schedule": [
      {
        "date": "2024-01-29",
        "dayName": "lunes",
        "timeSlots": [
          {
            "time": "09:00",
            "available": false,
            "turno": {
              "id": 1,
              "nombre": "Juan Pérez",
              "dni": "12345678",
              // ... resto de datos del turno
            }
          },
          {
            "time": "09:30",
            "available": true,
            "turno": null
          }
          // ... más horarios
        ]
      }
      // ... más días
    ]
  }
}
```

## Estructura de la Tabla

```sql
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

## Estados de Turnos

- `pendiente` - Turno creado, pendiente de confirmación
- `confirmado` - Turno confirmado
- `cancelado` - Turno cancelado
- `completado` - Turno completado

## Filtros Disponibles

- Por estado
- Por rango de fechas
- Búsqueda por nombre, DNI o CUIL
- Paginación y ordenamiento

## Horarios de Atención

- **Horario**: 9:00 AM - 5:00 PM
- **Intervalos**: Cada 30 minutos
- **Días**: Lunes a Domingo (configurable)