"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Users, CreditCard, UserPlus, BarChart3, LogOut, Menu } from 'lucide-react'
import axios from "axios"
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
  }
]

function AdminSidebar({ activeSection, setActiveSection, isOpen, setIsOpen, onLogout }) {
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
          <button className="nav-item logout" onClick={onLogout}>
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
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const baseURL = `${window.location.protocol}//${window.location.hostname}:80`;
      await axios.post(`${baseURL}/api/auth/logout`, {}, {
        withCredentials: true
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

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
        onLogout={handleLogout}
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
