const API_BASE_URL = 'http://kubernetes.salta.gob.ar:30122/api';

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
  fechahoraregistro: string;
  hora: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  turno?: Turno;
}

export interface WeeklySchedule {
  date: string;
  dayName: string;
  isWorkingDay: boolean;
  timeSlots: TimeSlot[];
}

export interface WeeklyScheduleResponse {
  weekStart: string;
  weekEnd: string;
  schedule: WeeklySchedule[];
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

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class TurnosApi {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      console.log(`Making API request to: ${API_BASE_URL}${endpoint}`);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      console.log(`API response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<T> = await response.json();
      console.log('API response data:', data);
      
      if (!data.success) {
        throw new Error(data.message || 'Error en la API');
      }

      return data.data!;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getWeeklySchedule(fecha?: string): Promise<WeeklyScheduleResponse> {
    const params = fecha ? `?fecha=${fecha}` : '';
    return this.request<WeeklyScheduleResponse>(`/turnos/tablero-semanal${params}`);
  }

  async createTurno(turno: CreateTurnoRequest): Promise<Turno> {
    console.log('📝 Creating turno:', turno);
    return this.request<Turno>('/turnos', {
      method: 'POST',
      body: JSON.stringify(turno),
    });
  }

  async getTurno(id: number): Promise<Turno> {
    return this.request<Turno>(`/turnos/${id}`);
  }

  async updateTurno(id: number, updates: Partial<Turno>): Promise<Turno> {
    return this.request<Turno>(`/turnos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteTurno(id: number): Promise<void> {
    await this.request(`/turnos/${id}`, {
      method: 'DELETE',
    });
  }

  async getTurnos(params?: {
    page?: number;
    limit?: number;
    estado?: string;
    fecha_desde?: string;
    fecha_hasta?: string;
    search?: string;
  }): Promise<{
    turnos: Turno[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const query = searchParams.toString();
    return this.request(`/turnos${query ? `?${query}` : ''}`);
  }

  // Método adicional para obtener todos los turnos sin paginación
  async getTurnosAll(): Promise<Turno[]> {
    return this.request<Turno[]>('/turnos');
  }
}

export const turnosApi = new TurnosApi();