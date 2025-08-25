# Configuración de PostgreSQL para el Sistema de Turnos

## 1. Crear Base de Datos y Usuario

```sql
-- Conectarse como superusuario (postgres)
sudo -u postgres psql

-- Crear base de datos
CREATE DATABASE turnos_db;

-- Crear usuario (reemplaza 'tu_usuario' y 'tu_password')
CREATE USER tu_usuario WITH PASSWORD 'tu_password';

-- Dar permisos al usuario
GRANT ALL PRIVILEGES ON DATABASE turnos_db TO tu_usuario;

-- Salir
\q
```

## 2. Configurar pg_hba.conf (si es necesario)

Si tienes problemas de autenticación, edita el archivo pg_hba.conf:

```bash
# Encontrar ubicación del archivo
sudo -u postgres psql -c "SHOW hba_file;"

# Editar el archivo (ejemplo de ubicación)
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

Agregar o modificar estas líneas:

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     trust
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
```

## 3. Reiniciar PostgreSQL

```bash
sudo systemctl restart postgresql
```

## 4. Configurar Variables de Entorno

Crea el archivo `.env` en `turnos-backend/`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=turnos_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password
PORT=3002
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 5. Probar Conexión

```bash
# Probar conexión manual
psql -h localhost -U tu_usuario -d turnos_db

# Si funciona, ejecutar migraciones
cd turnos-backend
npm run migrate
```

## 6. Comandos Útiles

```bash
# Ver bases de datos
\l

# Conectarse a base de datos
\c turnos_db

# Ver tablas
\dt

# Ver estructura de tabla
\d turnos

# Salir
\q
```