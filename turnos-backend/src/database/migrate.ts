import { Database } from './connection';

export async function runMigrations() {
  try {
    console.log('🔄 Running database migrations...');

    // Crear tabla turnos si no existe
    await Database.query(`
      CREATE TABLE IF NOT EXISTS public.turnos (
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
        fechahoraregistro timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
        hora time NULL,
        CONSTRAINT turnos_pk PRIMARY KEY (id)
      );
    `);

    // Crear índices para mejorar el rendimiento
    await Database.query(`
      CREATE INDEX IF NOT EXISTS idx_turnos_fecha ON public.turnos(fecha);
      CREATE INDEX IF NOT EXISTS idx_turnos_estado ON public.turnos(estado);
      CREATE INDEX IF NOT EXISTS idx_turnos_fecha_hora ON public.turnos(fecha, hora);
    `);

    console.log('✅ Database migrations completed successfully');

  } catch (error) {
    console.error('❌ Error running migrations:', error);
    throw error;
  }
}

// Run migrations if called directly
if (require.main === module) {
  Database.initialize();
  runMigrations()
    .then(() => {
      console.log('✅ Migrations completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migrations failed:', error);
      process.exit(1);
    });
}