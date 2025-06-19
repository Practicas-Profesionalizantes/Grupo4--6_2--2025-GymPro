"use client"

import { useState, useEffect } from "react"
import { Search, Edit, ToggleLeft, ToggleRight, LogIn } from "lucide-react"

function UserManagement() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    // Simular carga de usuarios
    const mockUsers = [
      {
        id: 1,
        name: "Juan Pérez",
        email: "juan@email.com",
        phone: "+54 11 1234-5678",
        plan: "Forza Flex",
        status: "active",
        expirationDate: "2024-03-15",
        lastAccess: "2024-01-15 14:30",
        joinDate: "2023-12-01",
      },
      {
        id: 2,
        name: "María García",
        email: "maria@email.com",
        phone: "+54 11 8765-4321",
        plan: "Forza Premium",
        status: "active",
        expirationDate: "2024-02-28",
        lastAccess: "2024-01-14 09:15",
        joinDate: "2023-11-15",
      },
      {
        id: 3,
        name: "Carlos López",
        email: "carlos@email.com",
        phone: "+54 11 5555-1234",
        plan: "Forza Elite",
        status: "inactive",
        expirationDate: "2024-01-10",
        lastAccess: "2024-01-10 18:45",
        joinDate: "2023-10-20",
      },
    ]
    setUsers(mockUsers)
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleUserStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const registerAccess = (userId) => {
    const now = new Date()
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

    setUsers(users.map((user) => (user.id === userId ? { ...user, lastAccess: formattedDate } : user)))
  }

  const openEditModal = (user) => {
    setSelectedUser({ ...user })
    setShowEditModal(true)
  }

  const saveUserChanges = () => {
    setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)))
    setShowEditModal(false)
    setSelectedUser(null)
  }

  const getStatusBadge = (status) => {
    return <span className={`status-badge ${status}`}>{status === "active" ? "Activo" : "Inactivo"}</span>
  }

  const getExpirationStatus = (expirationDate) => {
    const today = new Date()
    const expDate = new Date(expirationDate)
    const diffTime = expDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return <span className="expiration-status expired">Vencido</span>
    } else if (diffDays <= 7) {
      return <span className="expiration-status warning">Vence en {diffDays} días</span>
    } else {
      return <span className="expiration-status active">Activo</span>
    }
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Gestión de Usuarios</h2>
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Plan</th>
              <th>Estado</th>
              <th>Vencimiento</th>
              <th>Último Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="plan-badge">{user.plan}</span>
                </td>
                <td>{getStatusBadge(user.status)}</td>
                <td>
                  <div className="expiration-info">
                    <div>{user.expirationDate}</div>
                    {getExpirationStatus(user.expirationDate)}
                  </div>
                </td>
                <td>{user.lastAccess}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit" onClick={() => openEditModal(user)} title="Editar usuario">
                      <Edit size={16} />
                    </button>
                    <button
                      className={`action-btn toggle ${user.status}`}
                      onClick={() => toggleUserStatus(user.id)}
                      title={user.status === "active" ? "Desactivar" : "Activar"}
                    >
                      {user.status === "active" ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                    </button>
                    <button
                      className="action-btn access"
                      onClick={() => registerAccess(user.id)}
                      title="Registrar ingreso"
                    >
                      <LogIn size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edición */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Editar Usuario</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  value={selectedUser.phone}
                  onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Plan</label>
                <select
                  value={selectedUser.plan}
                  onChange={(e) => setSelectedUser({ ...selectedUser, plan: e.target.value })}
                >
                  <option value="Forza Flex">Forza Flex</option>
                  <option value="Forza Premium">Forza Premium</option>
                  <option value="Forza Elite">Forza Elite</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fecha de Vencimiento</label>
                <input
                  type="date"
                  value={selectedUser.expirationDate}
                  onChange={(e) => setSelectedUser({ ...selectedUser, expirationDate: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowEditModal(false)}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={saveUserChanges}>
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
