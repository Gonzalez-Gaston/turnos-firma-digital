import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Calendar, Users, Clock, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { TurnosTable } from '../../components/turnos/TurnosTable';
import { turnosApi } from '../../lib/turnosApi';

export function DashboardPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'turnos'>('turnos');

  // Estado para estadísticas
  const [stats, setStats] = useState({
    total: 0,
    Disponibles: 0,
    confirmados: 0,
    cancelados: 0,
    semanal: [0, 0, 0, 0, 0], // Lunes a Viernes
    semanalMax: 16 // Puedes ajustar este valor según tu lógica
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        // Traer todos los turnos (puedes optimizar con una API específica para stats)
        const res = await turnosApi.getTurnosAll( );
        const turnos = res;

        // Estadísticas generales
        const total = turnos.length;
        const Disponibles = turnos.filter(t => t.estado?.toLowerCase() === 'disponible' || t.estado?.toLowerCase() === 'temporal').length;
        const confirmados = turnos.filter(t => t.estado?.toLowerCase() === 'completado' || t.estado?.toLowerCase() === 'reservado').length;
        const cancelados = turnos.filter(t => t.estado?.toLowerCase() === 'cancelado').length;

        // Estadísticas semanales (Lunes a Viernes)
        const semanal = [0, 0, 0, 0, 0];
        const hoy = new Date();
        const primerDiaSemana = new Date(hoy);
        primerDiaSemana.setDate(hoy.getDate() - hoy.getDay() + 1); // Lunes

       

        setStats({
          total,
          Disponibles,
          confirmados,
          cancelados,
          semanal,
          semanalMax: 16 // Puedes ajustar según tu lógica
        });
      } catch (e) {
        setStats({
          total: 0,
          Disponibles: 0,
          confirmados: 0,
          cancelados: 0,
          semanal: [0, 0, 0, 0, 0],
          semanalMax: 16
        });
      } finally {
        setLoadingStats(false);
      }
    };
    if (activeTab === 'overview') fetchStats();
  }, [activeTab]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{loadingStats ? '...' : stats.total}</p>
              <p className="text-gray-600">Total Turnos</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{loadingStats ? '...' : stats.Disponibles}</p>
              <p className="text-gray-600">Disponibles</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{loadingStats ? '...' : stats.confirmados}</p>
              <p className="text-gray-600">Confirmados</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{loadingStats ? '...' : stats.cancelados}</p>
              <p className="text-gray-600">Cancelados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button
              onClick={() => setActiveTab('turnos')}
              className="w-full text-left p-3 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Turnos</p>
                  <p className="text-sm text-gray-600">Ver todos los turnos</p>
                </div>
              </div>
            </button>
          </div>
        </div>

       {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen Semanal</h3>
          <div className="space-y-3">
            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((dia, idx) => (
              <div className="flex justify-between items-center" key={dia}>
                <span className="text-gray-600">{dia}</span>
                <span className="font-medium">
                  {loadingStats ? '...' : `${stats.semanal[idx]}/${stats.semanalMax} turnos`}
                </span>
              </div>
            ))}
          </div>
        </div>*/}
      </div>

      {/* Instructions }
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Sistema de Gestión de Turnos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Características:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Tabla CRUD completa</li>
              <li>• Filtros y búsqueda avanzada</li>
              <li>• Base de datos PostgreSQL</li>
              <li>• API REST con Express.js</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Funcionalidades:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Crear, editar y eliminar turnos</li>
              <li>• Ver detalles completos</li>
              <li>• Filtrar por estado y fecha</li>
              <li>• Paginación automática</li>
            </ul>
          </div>
        </div>
      </div>*/}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">
            Gestiona los turnos de firma digital
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Resumen</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('turnos')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'turnos'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Tabla de Turnos</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'turnos' && <TurnosTable />}
      </div>
    </div>
  );
}