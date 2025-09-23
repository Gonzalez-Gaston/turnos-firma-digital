import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit,Filter, Calendar, User, Phone, Clock } from 'lucide-react';
import { turnosApi, Turno } from '../../lib/turnosApi';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { TurnoModal } from './TurnoModal';
import { CreateTurnoModal } from './CreateTurnoModal';
import { EditTurnoModal } from './EditTurnoModal';

export function TurnosTable() {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTurno, setSelectedTurno] = useState<Turno | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTurno, setEditingTurno] = useState<Turno | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    loadTurnos();
  }, [currentPage, searchTerm, statusFilter, dateFilter]);

  const loadTurnos = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: 10,
        sort: 'id',
        order: 'desc'
      };

      if (searchTerm) params.search = searchTerm;
      if (statusFilter) params.estado = statusFilter;
      if (dateFilter) params.fecha_desde = dateFilter;

      const response = await turnosApi.getTurnos(params);
      setTurnos(response.turnos);
      setTotalPages(response.pagination.pages);
    } catch (error) {
      console.error('Error loading turnos:', error);
      alert('Error al cargar los turnos');
    } finally {
      setLoading(false);
    }
  };

  /*const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este turno?')) {
      try {
        await turnosApi.deleteTurno(id);
        loadTurnos();
      } catch (error) {
        console.error('Error deleting turno:', error);
        alert('Error al eliminar el turno');
      }
    }
  };*/

  const handleTurnoCreated = () => {
    loadTurnos();
    setShowCreateModal(false);
  };

  const handleTurnoUpdated = () => {
    loadTurnos();
    setSelectedTurno(null);
    setEditingTurno(null);
  };

const getStatusBadge = (estado: string) => {
    const badges = {
      asistio: 'bg-green-100 text-green-800 border-green-200',
      noasistio: 'bg-red-100 text-red-800 border-red-200',
      temporal: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      disponible: 'bg-green-100 text-green-800 border-green-200',
      reservado: 'bg-blue-100 text-blue-800 border-blue-200',
      cancelado: 'bg-red-100 text-red-800 border-red-200',
    };
    
    return badges[estado?.toLowerCase() as keyof typeof badges] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

 const formatDate = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    date.setUTCHours(12);
    return format(date, 'dd/MM/yyyy', { locale: ar });
  } catch {
    return dateString;
  }
};


  /*const formatDateTime = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy HH:mm', { locale: es });
    } catch {
      return dateString;
    }
  };*/

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Turnos</h2>
            <p className="text-gray-600 mt-1">Administra todos los turnos de firma digital</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Turno</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, DNI o CUIL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
             <option value="">Todos los estados</option>         
            <option value="Asistio">Asistió</option>
            <option value="NoAsistio">No Asistió</option> 
            <option value="Temporal">Temporal</option>
            <option value="Disponible">Disponible</option>
            <option value="Reservado">Reservado</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />

          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setDateFilter('');
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : turnos.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No se encontraron turnos</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo de Firma
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {turnos.map((turno) => (
                <tr key={turno.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                         {formatDate(turno.fecha)}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {turno.hora}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {turno.nombre || 'Sin asignar'}
                        </div>
                        <div className="text-sm text-gray-500">
                          DNI: {turno.dni || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      {turno.telefono || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {turno.tipodefirma || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(turno.estado)}`}>
                      {turno.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                    
                      <button
                        onClick={() => setEditingTurno(turno)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                     
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedTurno && (
        <TurnoModal
          turno={selectedTurno}
          onClose={() => setSelectedTurno(null)}
          onUpdate={handleTurnoUpdated}
        />
      )}

      {showCreateModal && (
        <CreateTurnoModal
          date={format(new Date(), 'yyyy-MM-dd')}
          time="09:00"
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleTurnoCreated}
        />
      )}

      {editingTurno && (
        <EditTurnoModal
          turno={editingTurno}
          onClose={() => setEditingTurno(null)}
          onUpdate={handleTurnoUpdated}
        />
      )}
    </div>
  );
}