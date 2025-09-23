import React, { useState } from 'react';
import { X, User, Phone, Building, FileText, Calendar, Clock, CreditCard } from 'lucide-react';
import { turnosApi, CreateTurnoRequest } from '../../lib/turnosApi';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

interface CreateTurnoModalProps {
  date: string;
  time: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateTurnoModal({ date, time, onClose, onSuccess }: CreateTurnoModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateTurnoRequest>({
    fecha: date,
    hora: time,
    nombre: '',
    tipodefirma: '',
    cuil: '',
    dni: '',
    organismo: '',
    motivo: '',
    telefono: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await turnosApi.createTurno(formData);
      onSuccess();
    } catch (error) {
      console.error('Error creating turno:', error);
      alert('Error al crear el turno. Por favor verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const tiposFirma = [
    'Token',
    'Remota',
    'Vinculación',
    'Renovación'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Crear Nuevo Turno</h2>
            <p className="text-gray-600 mt-1">
              {format(parseISO(date), 'EEEE, dd MMMM yyyy', { locale: es })} a las {time}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Información Personal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Ingrese el nombre completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DNI *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="dni"
                    required
                    value={formData.dni}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="12345678"
                    maxLength={8}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CUIL *
                </label>
                <input
                  type="text"
                  name="cuil"
                  required
                  value={formData.cuil}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="20-12345678-9"
                  maxLength={11}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    name="telefono"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="+54 387 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Information */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2 text-primary" />
              Información del Turno
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Firma *
                </label>
                <select
                  name="tipodefirma"
                  required
                  value={formData.tipodefirma}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Seleccione tipo de firma</option>
                  {tiposFirma.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organismo *
                </label>
                <input
                  type="text"
                  name="organismo"
                  required
                  value={formData.organismo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Nombre del organismo"
                />
              </div>
            </div>
          </div>

          {/* Motivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FileText className="h-4 w-4 mr-2 text-gray-400" />
              Motivo del Turno *
            </label>
            <textarea
              name="motivo"
              required
              value={formData.motivo}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Describa el motivo del turno..."
            />
          </div>

          {/* Date and Time Display */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Resumen del Turno</h4>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {format(parseISO(date), 'dd/MM/yyyy', { locale: es })}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {time}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando...' : 'Crear Turno'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}