export interface Turno {
  id: number;
  fecha: string;
  nombre: string;
  tipodefirma: string;
  cuil: string;
  dni: string;
  organismo: string;
  motivo: string;
  estado: string;
  telefono: string;
  idcalendar: string;
  fechahoraregistro: Date;
  hora: string;
}

export interface CreateTurnoRequest {
  fecha: string;
  nombre: string;
  tipodefirma: string;
  cuil: string;
  dni: string;
  organismo: string;
  motivo: string;
  telefono: string;
  hora: string;
}

export interface UpdateTurnoRequest {
  nombre?: string;
  tipodefirma?: string;
  cuil?: string;
  dni?: string;
  organismo?: string;
  motivo?: string;
  estado?: string;
  telefono?: string;
  hora?: string;
}

export interface WeeklySchedule {
  date: string;
  dayName: string;
  isWorkingDay: boolean;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  turno?: Turno;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface TurnoFilters {
  estado?: string;
  fecha_desde?: string;
  fecha_hasta?: string;
  search?: string;
}