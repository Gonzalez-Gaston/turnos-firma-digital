import React, { useState } from 'react';
import { X, User, Phone, Building, FileText, Calendar, Clock, CreditCard, Mail } from 'lucide-react';
import { Turno, turnosApi } from '../../lib/turnosApi';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface TurnoModalProps {
  turno: Turno;
  onClose: () => void;
  onUpdate: () => void;
}

export function TurnoModal({ turno, onClose, onUpdate }: TurnoModalProps) {
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState(turno.estado);

  const handleUpdateEstado = async (nuevoEstado: string) => {
    try {
      setLoading(true);
      await turnosApi.updateTurno(turno.id, { estado: nuevoEstado });
      setEstado(nuevoEstado);
      onUpdate();
    } catch (error) {
      console.error('Error updating turno:', error);
      alert('Error al actualizar el turno');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este turno?')) {
      try {
        setLoading(true);
        await turnosApi.deleteTurno(turno.id);
        onUpdate();
        onClose();
      } catch (error) {
        console.error('Error deleting turno:', error);
        alert('Error al eliminar el turno');
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      reservado: 'bg-blue-100 text-blue-800 border-blue-200',
      pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmado: 'bg-blue-100 text-blue-800 border-blue-200',
      cancelado: 'bg-red-100 text-red-800 border-red-200',
      completado: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status?.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Detalles del Turno</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(estado)}`}>
              {estado.charAt(0).toUpperCase() + estado.slice(1)}
            </span>
            <span className="text-sm text-gray-500">
              ID: {turno.id}
            </span>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Información Personal
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <p className="text-gray-900">{turno.nombre}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">DNI</label>
                  <p className="text-gray-900">{turno.dni}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">CUIL</label>
                  <p className="text-gray-900">{turno.cuil}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <p className="text-gray-900 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {turno.telefono}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Building className="h-5 w-5 mr-2 text-primary" />
                Información del Turno
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha</label>
                  <p className="text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {format(parseISO(turno.fecha), 'EEEE, dd MMMM yyyy', { locale: es })}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hora</label>
                  <p className="text-gray-900 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {turno.hora}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tipo de Firma</label>
                  <p className="text-gray-900">{turno.tipodefirma}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Organismo</label>
                  <p className="text-gray-900">{turno.organismo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Motivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-gray-400" />
              Motivo
            </label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{turno.motivo}</p>
          </div>

          {/* Metadata */}
          <div className="text-sm text-gray-500 border-t pt-4">
            <p>Registrado: {format(parseISO(turno.fechahoraregistro), 'dd/MM/yyyy HH:mm', { locale: es })}</p>
            {turno.idcalendar && <p>ID Calendar: {turno.idcalendar}</p>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-2">
            {estado !== 'confirmado' && (
              <button
                onClick={() => handleUpdateEstado('confirmado')}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Confirmar
              </button>
            )}
            {estado !== 'cancelado' && (
              <button
                onClick={() => handleUpdateEstado('cancelado')}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
            )}
            {estado !== 'completado' && (
              <button
                onClick={() => handleUpdateEstado('completado')}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Completar
              </button>
            )}
          </div>
          
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}