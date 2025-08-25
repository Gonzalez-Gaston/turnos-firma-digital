import { Router, Request, Response } from 'express';
import { Database } from '../database/connection';
import { 
  validateRequest, 
  validateQuery,
  turnoSchema, 
  updateTurnoSchema,
  paginationSchema,
  turnoFiltersSchema 
} from '../middleware/validation';
import { asyncHandler, createError } from '../middleware/errorHandler';
import { CreateTurnoRequest, UpdateTurnoRequest, PaginationParams, TurnoFilters, Turno } from '../types';
import { format, startOfWeek, endOfWeek, addDays, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

const router = Router();

// Obtener tablero semanal




// Crear nuevo turno
router.post('/',
  validateRequest(turnoSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const turnoData: CreateTurnoRequest = req.body;

    // Verificar si ya existe un turno en esa fecha y hora
    const existingResult = await Database.query(
      `SELECT id FROM turnos 
       WHERE fecha = $1 AND hora = $2`,
      [turnoData.fecha, turnoData.hora]
    );

    if (existingResult.rows.length > 0) {
      throw createError('Ya existe un turno en esa fecha y hora', 409);
    }

    // Crear turno
    const result = await Database.query(
      `INSERT INTO turnos (fecha, nombre, tipodefirma, cuil, dni, organismo, motivo, telefono, hora, estado, fechahoraregistro)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)
       RETURNING *`,
      [
        turnoData.fecha,
        turnoData.nombre,
        turnoData.tipodefirma,
        turnoData.cuil,
        turnoData.dni,
        turnoData.organismo,
        turnoData.motivo,
        turnoData.telefono,
        turnoData.hora,
        'Reservado'
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Turno creado exitosamente',
      data: result.rows[0]
    });
  })
);

// Obtener turnos con filtros y paginación
router.get('/',
  validateQuery(paginationSchema.concat(turnoFiltersSchema)),
  asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, sort = 'fecha', order = 'asc' } = req.query as PaginationParams;
    const { estado, fecha_desde, fecha_hasta, search } = req.query as TurnoFilters;

    let whereClause = 'WHERE 1=1';
    const queryParams: any[] = [];
    let paramCount = 0;

    // Excluir turnos con estado "No Asignado"
    whereClause += ` AND estado ILIKE 'No Asignado' = FALSE`;

    // Agregar filtros
    if (estado) {
      paramCount++;
      whereClause += ` AND estado = $${paramCount}`;
      queryParams.push(estado);
    }

    if (fecha_desde) {
      paramCount++;
      whereClause += ` AND fecha >= $${paramCount}`;
      queryParams.push(fecha_desde);
    }

    if (fecha_hasta) {
      paramCount++;
      whereClause += ` AND fecha <= $${paramCount}`;
      queryParams.push(fecha_hasta);
    }

    if (search) {
      paramCount++;
      whereClause += ` AND (nombre ILIKE $${paramCount} OR dni ILIKE $${paramCount} OR cuil ILIKE $${paramCount})`;
      queryParams.push(`%${search}%`);
    }

    // Obtener total de registros
    const countResult = await Database.query(
      `SELECT COUNT(*) as total FROM turnos ${whereClause}`,
      queryParams
    );
    const total = parseInt(countResult.rows[0].total);

    // Obtener turnos
    const offset = (page - 1) * limit;
    paramCount++;
    const limitParam = paramCount;
    paramCount++;
    const offsetParam = paramCount;

    const result = await Database.query(
      `SELECT * FROM turnos ${whereClause} 
       ORDER BY ${sort} ${order.toUpperCase()}
       LIMIT $${limitParam} OFFSET $${offsetParam}`,
      [...queryParams, limit, offset]
    );

    res.json({
      success: true,
      data: {
        turnos: result.rows,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  })
);

// Obtener turno por ID
router.get('/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await Database.query(
      'SELECT * FROM turnos WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      throw createError('Turno no encontrado', 404);
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  })
);

// Actualizar turno
router.put('/:id',
  validateRequest(updateTurnoSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData: UpdateTurnoRequest = req.body;

    // Verificar si el turno existe
    const existingResult = await Database.query(
      'SELECT * FROM turnos WHERE id = $1',
      [id]
    );

    if (existingResult.rows.length === 0) {
      throw createError('Turno no encontrado', 404);
    }

    // Construir query de actualización
    const updateFields: string[] = [];
    const queryParams: any[] = [];
    let paramCount = 0;

    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined) {
        paramCount++;
        updateFields.push(`${key} = $${paramCount}`);
        queryParams.push(value);
      }
    });

    if (updateFields.length === 0) {
      throw createError('No hay campos para actualizar', 402);
    }

    paramCount++;
    queryParams.push(id);

    const result = await Database.query(
      `UPDATE turnos SET ${updateFields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      queryParams
    );

    res.json({
      success: true,
      message: 'Turno actualizado exitosamente',
      data: result.rows[0]
    });
  })
);

// Eliminar turno
router.delete('/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await Database.query(
      'DELETE FROM turnos WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      throw createError('Turno no encontrado', 404);
    }

    res.json({
      success: true,
      message: 'Turno eliminado exitosamente',
      data: result.rows[0]
    });
  })
);

export { router as turnosRoutes };