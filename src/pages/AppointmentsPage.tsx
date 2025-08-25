import React from 'react';
import { Calendar, Phone, Mail, AlertCircle } from 'lucide-react';

export function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Reservar Turno
          </h1>
          <p className="text-xl text-gray-600">
            Para reservar tu turno de firma digital, comunícate con nosotros
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sistema de Turnos Administrativo
            </h2>
            <p className="text-gray-600 mb-6">
              Los turnos se gestionan a través del sistema administrativo. 
              Para solicitar un turno, por favor contacta con nosotros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg mb-4">
                <Phone className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Teléfono
              </h3>
              <p className="text-gray-600 mb-2">
                Llama para reservar tu turno
              </p>
              <p className="text-primary font-semibold">
                +54 387 XXX-XXXX
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-4">
                <Mail className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email
              </h3>
              <p className="text-gray-600 mb-2">
                Envía un correo con tus datos
              </p>
              <p className="text-primary font-semibold">
                turnos@firmadigitalsalta.gob.ar
              </p>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Información Importante</h4>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• Los turnos son únicamente martes y jueves de 9:00 a 17:00 hs</li>
                  <li>• Cada turno tiene una duración de 30 minutos</li>
                  <li>• Es necesario presentar DNI vigente</li>
                  <li>• Llegue 15 minutos antes de su turno asignado</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Horarios de Atención
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Martes y Jueves:</strong> 9:00 AM - 5:00 PM
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Turnos cada 30 minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}