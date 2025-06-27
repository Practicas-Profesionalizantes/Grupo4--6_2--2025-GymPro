"use client"

import { useState, useEffect } from "react"
import { Users, TrendingUp, Calendar, Settings } from "lucide-react"

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    expiringMemberships: 0,
    activePlans: 0,
    administrators: 0,
  })

  useEffect(() => {
    // Simular carga de estadísticas
    setStats({
      totalUsers: 142,
      activeUsers: 142,
      expiringMemberships: 23,
      activePlans: 4,
      administrators: 3,
    })
  }, [])

  return (
    <div className="admin-section">
      <div className="dashboard-header">
        <h2>Panel General</h2>
        <p>Resumen de la actividad del gimnasio</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <p className="stat-title">Usuarios Activos</p>
            <Users className="stat-icon" />
          </div>
          <h3 className="stat-value">{stats.totalUsers}</h3>
          <span className="stat-change positive">+12% desde el último mes</span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <p className="stat-title">Membresías por Vencer</p>
            <Calendar className="stat-icon" />
          </div>
          <h3 className="stat-value">{stats.expiringMemberships}</h3>
          <span className="stat-change neutral">+5 desde el último mes</span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <p className="stat-title">Planes Activos</p>
            <Settings className="stat-icon" />
          </div>
          <h3 className="stat-value">{stats.activePlans}</h3>
          <span className="stat-change neutral">0 desde el último mes</span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <p className="stat-title">Administradores</p>
            <TrendingUp className="stat-icon" />
          </div>
          <h3 className="stat-value">{stats.administrators}</h3>
          <span className="stat-change positive">+1 desde el último mes</span>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="recent-activity">
          <h3>Actividad Reciente</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-info">
                <h4>María González se registró</h4>
                <p>Plan Premium - Hace 2 horas</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-info">
                <h4>Juan Pérez renovó membresía</h4>
                <p>Plan Básico - Hace 4 horas</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-info">
                <h4>Ana Martín canceló plan</h4>
                <p>Plan Premium - Hace 1 día</p>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-activity">
          <h3>Próximos Vencimientos</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-info">
                <h4>Carlos López</h4>
                <p>Vence en 3 días</p>
              </div>
              <span className="activity-status urgent">Urgente</span>
            </div>
            <div className="activity-item">
              <div className="activity-info">
                <h4>Laura García</h4>
                <p>Vence en 7 días</p>
              </div>
              <span className="activity-status warning">Próximo</span>
            </div>
            <div className="activity-item">
              <div className="activity-info">
                <h4>Roberto Silva</h4>
                <p>Vence en 14 días</p>
              </div>
              <span className="activity-status success">OK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
