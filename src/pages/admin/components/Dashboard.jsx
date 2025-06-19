"use client"

import { useState, useEffect } from "react"
import { Users, CreditCard, TrendingUp, Calendar } from "lucide-react"

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 0,
    expiringMemberships: 0,
  })

  useEffect(() => {
    // Simular carga de estadísticas
    setStats({
      totalUsers: 1247,
      activeUsers: 1156,
      totalRevenue: 2450000,
      expiringMemberships: 23,
    })
  }, [])

  return (
    <div className="admin-section">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Resumen general del gimnasio</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <Users />
          </div>
          <div className="stat-content">
            <h3>{stats.totalUsers.toLocaleString()}</h3>
            <p>Total Usuarios</p>
            <span className="stat-change positive">+12% este mes</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon active">
            <TrendingUp />
          </div>
          <div className="stat-content">
            <h3>{stats.activeUsers.toLocaleString()}</h3>
            <p>Usuarios Activos</p>
            <span className="stat-change positive">+8% este mes</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">
            <CreditCard />
          </div>
          <div className="stat-content">
            <h3>${stats.totalRevenue.toLocaleString()}</h3>
            <p>Ingresos Mensuales</p>
            <span className="stat-change positive">+15% este mes</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon expiring">
            <Calendar />
          </div>
          <div className="stat-content">
            <h3>{stats.expiringMemberships}</h3>
            <p>Membresías por Vencer</p>
            <span className="stat-change neutral">Próximos 7 días</span>
          </div>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Ingresos de los Últimos 6 Meses</h3>
          <div className="chart-placeholder">
            <p>Gráfico de ingresos mensuales</p>
          </div>
        </div>

        <div className="recent-activity">
          <h3>Actividad Reciente</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">👤</div>
              <div className="activity-content">
                <p>
                  <strong>Juan Pérez</strong> se registró
                </p>
                <span>Hace 2 horas</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">💳</div>
              <div className="activity-content">
                <p>
                  <strong>María García</strong> renovó su membresía
                </p>
                <span>Hace 4 horas</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">🏋️</div>
              <div className="activity-content">
                <p>
                  <strong>Carlos López</strong> registró ingreso
                </p>
                <span>Hace 6 horas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
