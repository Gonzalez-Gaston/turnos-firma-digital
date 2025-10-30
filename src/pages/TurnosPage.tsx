//import React from 'react';
import { Calendar, Users, Clock, TrendingUp } from 'lucide-react';
//import { WeeklyScheduleBoard } from '../components/turnos/WeeklyScheduleBoard';

export function TurnosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Turnos
          </h1>
          <p className="text-gray-600">
            Administra los turnos de firma digital de manera eficiente
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-gray-600">Turnos Esta Semana</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">89</p>
                <p className="text-gray-600">Confirmados</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">23</p>
                <p className="text-gray-600">Pendientes</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">92%</p>
                <p className="text-gray-600">Ocupación</p>
              </div>
            </div>
          </div>
        </div>



        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Instrucciones de Uso</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Para crear un turno:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Haz clic en un slot verde (disponible)</li>
                <li>• Completa el formulario con los datos del cliente</li>
                <li>• El turno se creará automáticamente</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Para gestionar turnos:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Haz clic en un turno ocupado para ver detalles</li>
                <li>• Puedes confirmar, cancelar o completar turnos</li>
                <li>• Los cambios se reflejan inmediatamente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}