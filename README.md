# Sistema de Turnos - Firma Digital Salta

Sistema web para la **gestión y solicitud de turnos** para certificados de **firma digital** en la Provincia de Salta, Argentina.

El sistema está orientado principalmente a la **solicitud de turnos por parte del ciudadano**, utilizando **Notion como backend del formulario**, lo que permite una implementación simple, rápida y sin necesidad de infraestructura propia para almacenamiento de datos.

---

## Características Principales

- 🗓️ **Solicitud de Turnos Online**: Formulario de turnos integrado mediante Notion.
- 🔗 **Redirección Inteligente**: Acceso directo al formulario oficial desde la web.
- 📱 **Diseño Responsive**: Compatible con dispositivos móviles, tablets y desktop.
- 🎨 **Diseño Institucional**: Paleta de colores oficial de la Provincia de Salta.
- ⚡ **Alta performance**: Frontend optimizado con Vite + React.
- 🔒 **Sin backend propio**: Notion actúa como backend de datos para el formulario.

---

## Tecnologías Utilizadas

### Frontend
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Vite**
- **Lucide React (iconos)**

### Backend del Formulario
- **Notion** (base de datos + formulario embebido)

---

## Arquitectura del Sistema

### Frontend Web
- React + TypeScript
- Tailwind CSS para estilos
- React Router para navegación
- Vite para build y desarrollo

### Backend de Turnos
- **Notion**
  - Base de datos para almacenamiento de solicitudes
  - Formulario embebido y compartido
  - Gestión manual desde panel de Notion

> 🔹 En esta implementación **NO se utiliza backend propio**, ni base de datos PostgreSQL, ni API REST.

---

## Flujo de Funcionamiento

1. El usuario ingresa al sitio web.
2. Hace click en **"Sacar Turno"**.
3. Es redirigido automáticamente al **formulario de Notion**.
4. Completa los datos requeridos.
5. El formulario se guarda directamente en **Notion**, que actúa como backend.
6. El personal administrativo gestiona los turnos desde el panel de Notion.

---

## Implementación del Formulario (Notion)

### Motivo del Uso de Notion

- Implementación rápida
- Sin necesidad de servidores propios
- Sin costos adicionales
- Panel administrativo simple
- Exportación directa a Excel / CSV
- Historial completo de solicitudes

---