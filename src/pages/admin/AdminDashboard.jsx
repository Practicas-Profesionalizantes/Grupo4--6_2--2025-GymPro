"use client"

import { useState } from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Users, CreditCard, UserPlus, BarChart3, Settings, LogOut } from "lucide-react"
import UserManagement from "./components/UserManagement"
import PlanManagement from "./components/PlanManagement"
import CreateUser from "./components/CreateUser"
import Dashboard from "./components/Dashboard"
import "./AdminDashboard.css"

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    id: "dashboard",
  },
  {
    title: "Gestión de Usuarios",
    icon: Users,
    id: "users",
  },
  {
    title: "Gestión de Planes",
    icon: CreditCard,
    id: "plans",
  },
  {
    title: "Crear Usuario",
    icon: UserPlus,
    id: "create-user",
  },
  {
    title: "Configuración",
    icon: Settings,
    id: "settings",
  },
]

function AdminSidebar({ activeSection, setActiveSection }) {
  return (
    <Sidebar>
      <SidebarHeader className="admin-sidebar-header">
        <div className="admin-logo">
          <img src="/src/assets/images/logo.png" alt="MundoForza Admin" />
          <h3>Admin Panel</h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild isActive={activeSection === item.id} onClick={() => setActiveSection(item.id)}>
                <button className="admin-menu-button">
                  <item.icon />
                  <span>{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="admin-sidebar-footer">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button className="admin-menu-button logout-button">
                  <LogOut />
                  <span>Cerrar Sesión</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

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
      <SidebarProvider>
        <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <SidebarInset>
          <header className="admin-header">
            <SidebarTrigger />
            <div className="admin-header-content">
              <h1>Panel de Administración</h1>
              <div className="admin-user-info">
                <span>Administrador</span>
              </div>
            </div>
          </header>
          <main className="admin-main">{renderContent()}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default AdminDashboard
