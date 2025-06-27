"use client"

import { useState } from "react"
import { Users, CreditCard, UserPlus, BarChart3, Settings, LogOut, Menu } from "lucide-react"
import UserManagement from "./components/UserManagement"
import PlanManagement from "./components/PlanManagement"
import CreateUser from "./components/CreateUser"
import Dashboard from "./components/Dashboard"
import "./AdminDashboard.css"

const menuItems = [
  {
    title: "Panel General",
    icon: BarChart3,
    id: "dashboard",
  },
  {
    title: "Usuarios",
    icon: Users,
    id: "users",
  },
  {
    title: "Planes",
    icon: CreditCard,
    id: "plans",
  },
  {
    title: "Administradores",
    icon: UserPlus,
    id: "create-user",
  },
  {
    title: "Configuración",
    icon: Settings,
    id: "settings",
  },
]

function AdminSidebar({ activeSection, setActiveSection, isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">MF</div>
            <div className="logo-text">
              <h3>MUNDOFORZA</h3>
              <p>Panel de Administración</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id)
                setIsOpen(false)
              }}
              className={`nav-item ${activeSection === item.id ? "active" : ""}`}
            >
              <item.icon size={20} />
              <span>{item.title}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout">
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  )
}

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "users":
        return <UserManagement />
      case "plans":
        return <PlanManagement />
      case "create-user":
        return <CreateUser />
      case "settings":
        return (
          <div className="admin-section">
            <h2>Configuración</h2>
            <p>Próximamente...</p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="main-content">
        <header className="main-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="header-content">
            <h1>Panel de Administración</h1>
            <div className="user-info">
              <span>Administrador</span>
            </div>
          </div>
        </header>

        <main className="main-body">{renderContent()}</main>
      </div>
    </div>
  )
}

export default AdminDashboard
