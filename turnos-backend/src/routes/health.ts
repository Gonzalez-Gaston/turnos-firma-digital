import { Router, Request, Response } from 'express';
import { Database } from '../database/connection';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const dbStatus = await Database.testConnection();
  
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: dbStatus ? 'connected' : 'disconnected',
      environment: process.env.NODE_ENV,
      version: '1.0.0'
    }
  });
}));

router.get('/db', asyncHandler(async (req: Request, res: Response) => {
  const result = await Database.query('SELECT NOW() as current_time, version() as db_version');
  
  // Verificar tabla turnos
  const tableExists = await Database.checkTableExists();
  const turnosCount = tableExists ? await Database.getTurnosCount() : 0;
  
  // Obtener algunos turnos de ejemplo si existen
  let sampleTurnos = [];
  if (tableExists && turnosCount > 0) {
    const turnosResult = await Database.query('SELECT * FROM turnos LIMIT 5');
    sampleTurnos = turnosResult.rows;
  }
  
  res.json({
    success: true,
    message: 'Base de datos conectada',
    data: {
      ...result.rows[0],
      table_exists: tableExists,
      turnos_count: turnosCount,
      sample_turnos: sampleTurnos
    }
  });
}));

export { router as healthRoutes };