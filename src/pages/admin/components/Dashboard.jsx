"use client"

import { useState, useEffect, useMemo } from "react"
import { Users, TrendingUp, Calendar, Settings } from "lucide-react"
import axios from "axios"

const daysUntil = (dateStr) => {
  if (!dateStr) return Infinity
  const now = new Date()
  const d = new Date(dateStr)
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24))
}

const EXPIRING_DAYS = 30

function Dashboard() {
  const baseURL = `${window.location.protocol}//${window.location.hostname}:80`

  const [users, setUsers] = useState([])
  const [plans, setPlans] = useState([])

  useEffect(() => {
    axios
      .get(`${baseURL}/api/plans/get`)
      .then((res) => setPlans(res?.data?.data ?? []))
      .catch((err) => console.error(err))

    axios
      .get(`${baseURL}/api/admin/users/get`)
      .then((res) => setUsers(res?.data?.data ?? []))
      .catch((err) => console.error(err))
  }, [baseURL])

  const { stats, upcomingExpirations } = useMemo(() => {
    const isActiveUser = (u) => Number(u?.active) === 1
    const isAdmin = (u) => String(u?.group || "").toLowerCase() === "admin"

    const activeUsers = users.filter(isActiveUser).length
    const expiringMemberships = users.filter(
      (u) =>
        isActiveUser(u) &&
        u?.expire &&
        daysUntil(u.expire) >= 0 &&
        daysUntil(u.expire) <= EXPIRING_DAYS
    ).length
    const activePlans = plans.filter((p) =>
      p?.active == null ? true : Boolean(Number(p.active))
    ).length
    const administrators = users.filter(isAdmin).length

    const upcoming = users
      .filter((u) => isActiveUser(u) && u?.expire)
      .map((u) => ({ user: u, days: daysUntil(u.expire) }))
      .filter((x) => x.days >= 0 && x.days <= EXPIRING_DAYS)
      .sort((a, b) => a.days - b.days)
      .slice(0, 10)

    return {
      stats: {
        totalUsers: users.length,
        activeUsers,
        expiringMemberships,
        activePlans,
        administrators,
      },
      upcomingExpirations: upcoming,
    }
  }, [users, plans])

  const statusClass = (d) => (d <= 3 ? "urgent" : d <= 10 ? "warning" : "success")

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
          <h3 className="stat-value">{stats.activeUsers}</h3>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <p className="stat-title">Membresías por Vencer</p>
            <Calendar className="stat-icon" />
          </div>
          <h3 className="stat-value">{stats.expiringMemberships}</h3>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <p className="stat-title">Planes Activos</p>
            <Settings className="stat-icon" />
          </div>
          <h3 className="stat-value">{stats.activePlans}</h3>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <p className="stat-title">Administradores</p>
            <TrendingUp className="stat-icon" />
          </div>
          <h3 className="stat-value">{stats.administrators}</h3>
        </div>
      </div>

      <div className="dashboard-charts">
        {/* <div className="recent-activity">
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
        </div> */}

        <div className="recent-activity">
          <h3>Próximos Vencimientos</h3>
          <div className="activity-list">
            {upcomingExpirations.length === 0 && (
              <div className="activity-item">
                <div className="activity-info">
                  <h4>Sin vencimientos próximos</h4>
                  <p>Dentro de {EXPIRING_DAYS} días</p>
                </div>
              </div>
            )}
            {upcomingExpirations.map(({ user, days }) => {
              const label =
                [user?.name, user?.lastname].filter(Boolean).join(" ") ||
                user?.email ||
                `Usuario #${user?.id}`
              return (
                <div key={user?.id} className="activity-item">
                  <div className="activity-info">
                    <h4>{label}</h4>
                    <p>Vence en {days} {days === 1 ? "día" : "días"}</p>
                  </div>
                  <span className={`activity-status ${statusClass(days)}`}>
                    {days <= 3 ? "Urgente" : days <= 10 ? "Próximo" : "OK"}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
