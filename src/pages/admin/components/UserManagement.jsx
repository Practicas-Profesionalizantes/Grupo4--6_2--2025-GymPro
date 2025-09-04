"use client"

import { useState, useEffect } from "react"
import { Search, Edit, ToggleLeft, ToggleRight, LogIn } from "lucide-react"
import axios from 'axios';

function UserManagement() {
    const baseURL = `${window.location.protocol}//${window.location.hostname}:80`;

    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedUser, setSelectedUser] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        axios.get(`${baseURL}/api/admin/users/get`)
            .then(res => setUsers(res.data.data))
            .catch(err => console.error(err));
    }, [baseURL])

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const toggleUserStatus = (userId) => {
        const user = users.find(u => u.id === userId);
        const newStatus = user.active === 1 ? 0 : 1;

        axios.post(`${baseURL}/api/admin/users/change-active`, {
            user: userId,
            active: newStatus
        })
        .then(res => {
            setUsers(
                users.map(u =>
                    u.id === userId ? { ...u, active: newStatus } : u
                )
            )
        })
        .catch(err => console.error(err));
    }

    const registerAccess = (userId) => {
        
        axios.post(`${baseURL}/api/admin/users/register-access`, {
            user: userId
        })
        .then(res => {
            console.log(res.data)
            setUsers(users.map((user) => (user.id === userId ? { ...user, last_access: res.data.last_access } : user)))
        })
        .catch(err => console.error(err));
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
        return <span className={`status-badge ${status}`}>{status === 1 ? "Activo" : "Inactivo"}</span>
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
            return <span className="expiration-status active">Vence en {diffDays} días</span>
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
                                    <span className="plan-badge">{user.plan_name}</span>
                                </td>
                                <td>{getStatusBadge(user.active)}</td>
                                <td>
                                    <div className="expiration-info">
                                        {getExpirationStatus(user.expire)}
                                    </div>
                                </td>
                                <td>
                                    {(new Date(user.last_access)).toLocaleDateString() + ' ' + (new Date(user.last_access)).toLocaleTimeString()}
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-btn edit" onClick={() => openEditModal(user)} title="Editar usuario">
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className={`action-btn toggle ${user.active === 1 ? 'active' : 'inactive'}`}
                                            onClick={() => toggleUserStatus(user.id)}
                                            title={user.active === 1 ? "Desactivar" : "Activar"}
                                        >
                                            {user.active === 1 ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
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
