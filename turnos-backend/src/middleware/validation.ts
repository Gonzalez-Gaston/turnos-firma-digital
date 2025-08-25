import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Datos de entrada inválidos',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
      return;
    }
    
    next();
  };
};

export const turnoSchema = Joi.object({
  fecha: Joi.date().required().messages({
    'date.base': 'La fecha debe ser válida',
    'any.required': 'La fecha es requerida'
  }),
  nombre: Joi.string().min(2).max(255).required().messages({
    'string.empty': 'El nombre es requerido',
    'string.min': 'El nombre debe tener al menos 2 caracteres',
    'string.max': 'El nombre no puede exceder 255 caracteres'
  }),
  tipodefirma: Joi.string().required().messages({
    'string.empty': 'El tipo de firma es requerido'
  }),
  cuil: Joi.string().min(11).max(11).required().messages({
    'string.empty': 'El CUIL es requerido',
    'string.min': 'El CUIL debe tener 11 dígitos',
    'string.max': 'El CUIL debe tener 11 dígitos'
  }),
  dni: Joi.string().min(7).max(8).required().messages({
    'string.empty': 'El DNI es requerido',
    'string.min': 'El DNI debe tener al menos 7 dígitos',
    'string.max': 'El DNI no puede exceder 8 dígitos'
  }),
  organismo: Joi.string().required().messages({
    'string.empty': 'El organismo es requerido'
  }),
  motivo: Joi.string().required().messages({
    'string.empty': 'El motivo es requerido'
  }),
  telefono: Joi.string().min(10).max(20).required().messages({
    'string.empty': 'El teléfono es requerido',
    'string.min': 'El teléfono debe tener al menos 10 caracteres'
  }),
  hora: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required().messages({
    'string.pattern.base': 'La hora debe tener formato HH:MM',
    'string.empty': 'La hora es requerida'
  })
});

export const updateTurnoSchema = Joi.object({
  fecha: Joi.date(),
  nombre: Joi.string().min(2).max(255),
  tipodefirma: Joi.string(),
  cuil: Joi.string().min(11).max(11),
  dni: Joi.string().min(7).max(8),
  organismo: Joi.string(),
  motivo: Joi.string(),
  estado: Joi.string().valid('Temporal','Disponible','Reservado','Cancelado', 'Completado'),
  telefono: Joi.string().min(10).max(20),
  hora: Joi.string()
});

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.query);
    
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Parámetros de consulta inválidos',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      });
      return;
    }
    
    next();
  };
};

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  sort: Joi.string().valid('id', 'fecha', 'nombre', 'estado', 'fechahoraregistro').default('fecha'),
  order: Joi.string().valid('asc', 'desc').default('asc')
});

export const turnoFiltersSchema = Joi.object({
  estado: Joi.string().valid('Temporal', 'Disponible', 'Reservado', 'Cancelado', 'Completado'),
  fecha_desde: Joi.date().iso(),
  fecha_hasta: Joi.date().iso(),
  search: Joi.string().max(255)
});