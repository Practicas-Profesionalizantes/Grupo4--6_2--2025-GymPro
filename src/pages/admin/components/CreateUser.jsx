"use client"

import { useState } from "react"
import { User, Shield } from "lucide-react"

function CreateUser() {
  const [userType, setUserType] = useState("user")
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    documentType: "dni",
    documentNumber: "",
    sex: "",
    dateOfBirth: "",
    address: "",
    addressNumber: "",
    floor: "",
    city: "",
    province: "",
    emergencyContact: "",
    plan: "",
    expirationDate: "",
    password: "",
    confirmPassword: "",
  })

  const [plans] = useState([
    { id: 1, name: "Forza Flex" },
    { id: 2, name: "Forza Premium" },
    { id: 3, name: "Forza Elite" },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    // Aquí iría la lógica para crear el usuario
    console.log("Crear usuario:", { ...formData, userType })
    alert(`Usuario ${userType === "admin" ? "administrador" : "normal"} creado exitosamente`)

    // Resetear formulario
    setFormData({
      name: "",
      lastname: "",
      email: "",
      phone: "",
      documentType: "dni",
      documentNumber: "",
      sex: "",
      dateOfBirth: "",
      address: "",
      addressNumber: "",
      floor: "",
      city: "",
      province: "",
      emergencyContact: "",
      plan: "",
      expirationDate: "",
      password: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Crear Usuario</h2>
        <p>Registra un nuevo usuario en el sistema</p>
      </div>

      <div className="user-type-selector">
        <div className="type-options">
          <label className={`type-option ${userType === "user" ? "selected" : ""}`}>
            <input
              type="radio"
              name="userType"
              value="user"
              checked={userType === "user"}
              onChange={(e) => setUserType(e.target.value)}
            />
            <div className="type-card">
              <User size={32} />
              <h3>Usuario Normal</h3>
              <p>Cliente del gimnasio con acceso a servicios</p>
            </div>
          </label>

          <label className={`type-option ${userType === "admin" ? "selected" : ""}`}>
            <input
              type="radio"
              name="userType"
              value="admin"
              checked={userType === "admin"}
              onChange={(e) => setUserType(e.target.value)}
            />
            <div className="type-card">
              <Shield size={32} />
              <h3>Administrador</h3>
              <p>Acceso completo al panel de administración</p>
            </div>
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="create-user-form">
        <div className="form-section">
          <h3>Información Personal</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Apellido *</label>
              <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Teléfono *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tipo de Documento</label>
              <select name="documentType" value={formData.documentType} onChange={handleInputChange}>
                <option value="dni">DNI</option>
                <option value="passport">Pasaporte</option>
              </select>
            </div>
            <div className="form-group">
              <label>Número de Documento *</label>
              <input
                type="text"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Género</label>
              <select name="sex" value={formData.sex} onChange={handleInputChange}>
                <option value="">Seleccionar</option>
                <option value="m">Masculino</option>
                <option value="f">Femenino</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        {userType === "user" && (
          <>
            <div className="form-section">
              <h3>Dirección</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Calle</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Número</label>
                  <input type="text" name="addressNumber" value={formData.addressNumber} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Piso/Dpto</label>
                  <input type="text" name="floor" value={formData.floor} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ciudad</label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Provincia</label>
                  <select name="province" value={formData.province} onChange={handleInputChange}>
                    <option value="">Seleccionar Provincia</option>
                    <option value="C">CABA</option>
                    <option value="B">PROVINCIA DE BUENOS AIRES</option>
                    <option value="K">CATAMARCA</option>
                    <option value="X">CORDOBA</option>
                    <option value="W">CORRIENTES</option>
                    <option value="H">CHACO</option>
                    <option value="U">CHUBUT</option>
                    <option value="E">ENTRE RIOS</option>
                    <option value="P">FORMOSA</option>
                    <option value="Y">JUJUY</option>
                    <option value="L">LA PAMPA</option>
                    <option value="F">LA RIOJA</option>
                    <option value="M">MENDOZA</option>
                    <option value="N">MISIONES</option>
                    <option value="Q">NEUQUEN</option>
                    <option value="R">RIO NEGRO</option>
                    <option value="A">SALTA</option>
                    <option value="D">SAN LUIS</option>
                    <option value="Z">SANTA CRUZ</option>
                    <option value="S">SANTA FE</option>
                    <option value="G">SANTIAGO DEL ESTERO</option>
                    <option value="V">TIERRA DEL FUEGO</option>
                    <option value="T">TUCUMAN</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Contacto de Emergencia</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Plan y Membresía</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Plan</label>
                  <select name="plan" value={formData.plan} onChange={handleInputChange}>
                    <option value="">Seleccionar Plan</option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.name}>
                        {plan.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha de Vencimiento</label>
                  <input
                    type="date"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="form-section">
          <h3>Credenciales de Acceso</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Contraseña *</label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Confirmar Contraseña *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Crear Usuario
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateUser
