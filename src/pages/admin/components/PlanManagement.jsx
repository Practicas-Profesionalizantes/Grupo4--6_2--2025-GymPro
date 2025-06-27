"use client"

import { useState, useEffect } from "react"
import { Edit, Plus, Trash2 } from "lucide-react"
import axios from 'axios';

function PlanManagement() {
    const baseURL = `${window.location.protocol}//${window.location.hostname}:80`;

    const [plans, setPlans] = useState([])
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        axios.get(`${baseURL}/api/plans/get`)
            .then(res => setPlans(res.data.data))
            .catch(err => console.error(err));

        // // Simular carga de planes
        // const mockPlans = [
        //     {
        //         id: 1,
        //         name: "Forza Flex",
        //         price: 25990,
        //         discount: 15,
        //         inscription: 5000,
        //         description: "Plan básico con acceso al gimnasio",
        //         features: ["Acceso al gimnasio", "Equipamiento estándar", "Acceso a vestuarios"],
        //         active: true,
        //     },
        //     {
        //         id: 2,
        //         name: "Forza Premium",
        //         price: 38990,
        //         discount: 0,
        //         inscription: 0,
        //         description: "Plan premium con beneficios adicionales",
        //         features: ["Acceso 24/7", "Clases grupales", "Entrenamiento personal", "Sauna"],
        //         active: true,
        //     },
        //     {
        //         id: 3,
        //         name: "Forza Elite",
        //         price: 55990,
        //         discount: 0,
        //         inscription: 0,
        //         description: "Plan elite con todos los beneficios",
        //         features: ["Todo lo del Premium", "Asesoría nutricional", "Acceso multisede", "Locker VIP"],
        //         active: true,
        //     },
        // ]
        // setPlans(mockPlans)
    }, [])

    const openEditModal = (plan = null) => {
        if (plan) {
            setSelectedPlan({ ...plan })
            setIsCreating(false)
        } else {
            setSelectedPlan({
                id: Date.now(),
                name: "",
                price: 0,
                discount: 0,
                inscription: 0,
                description: "",
                features: [""],
                active: true,
            })
            setIsCreating(true)
        }
        setShowEditModal(true)
    }

    const savePlan = () => {
        if (isCreating) {
            setPlans([...plans, selectedPlan])
        } else {
            setPlans(plans.map((plan) => (plan.id === selectedPlan.id ? selectedPlan : plan)))
        }
        setShowEditModal(false)
        setSelectedPlan(null)
    }

    const deletePlan = (planId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este plan?")) {
            setPlans(plans.filter((plan) => plan.id !== planId))
        }
    }

    const togglePlanStatus = (planId) => {
        setPlans(plans.map((plan) => (plan.id === planId ? { ...plan, active: !plan.active } : plan)))
    }

    const addFeature = () => {
        setSelectedPlan({
            ...selectedPlan,
            features: [...selectedPlan.features, ""],
        })
    }

    const updateFeature = (index, value) => {
        const newFeatures = [...selectedPlan.features]
        newFeatures[index] = value
        setSelectedPlan({
            ...selectedPlan,
            features: newFeatures,
        })
    }

    const removeFeature = (index) => {
        setSelectedPlan({
            ...selectedPlan,
            features: selectedPlan.features.filter((_, i) => i !== index),
        })
    }

    return (
        <div className="admin-section">
            <div className="section-header">
                <h2>Gestión de Planes</h2>
                <button className="btn-primary" onClick={() => openEditModal()}>
                    <Plus size={16} />
                    Crear Plan
                </button>
            </div>

            <div className="plans-grid">
                {plans.map((plan) => (
                    <div key={plan.id} className={`plan-card-admin ${!plan.active ? "inactive" : ""}`}>
                        <div className="plan-header-admin">
                            <h3>{plan.name}</h3>
                            <div className="plan-status">
                                <label className="toggle-switch">
                                    <input type="checkbox" checked={plan.active} onChange={() => togglePlanStatus(plan.id)} />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <div className="plan-price-admin">
                            <span className="price-main">${plan.price.toLocaleString("es-AR")}</span>
                            <span className="price-period">/mes</span>
                            {plan.discount > 0 && <span className="discount-badge">{plan.discount}% OFF</span>}
                        </div>

                        {plan.inscription > 0 && (
                            <div className="inscription-fee">Inscripción: ${plan.inscription.toLocaleString("es-AR")}</div>
                        )}

                        <p className="plan-description">{plan.description}</p>

                        <div className="plan-features-admin">
                            <h4>Características:</h4>
                            <ul>
                                {plan.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="plan-actions">
                            <button className="action-btn edit" onClick={() => openEditModal(plan)} title="Editar plan">
                                <Edit size={16} />
                            </button>
                            <button className="action-btn delete" onClick={() => deletePlan(plan.id)} title="Eliminar plan">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Edición/Creación */}
            {showEditModal && selectedPlan && (
                <div className="modal-overlay">
                    <div className="modal-content large">
                        <div className="modal-header">
                            <h3>{isCreating ? "Crear Plan" : "Editar Plan"}</h3>
                            <button className="modal-close" onClick={() => setShowEditModal(false)}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nombre del Plan</label>
                                    <input
                                        type="text"
                                        value={selectedPlan.name}
                                        onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio Mensual</label>
                                    <input
                                        type="number"
                                        value={selectedPlan.price}
                                        onChange={(e) => setSelectedPlan({ ...selectedPlan, price: Number.parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Descuento (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={selectedPlan.discount}
                                        onChange={(e) => setSelectedPlan({ ...selectedPlan, discount: Number.parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Inscripción</label>
                                    <input
                                        type="number"
                                        value={selectedPlan.inscription}
                                        onChange={(e) => setSelectedPlan({ ...selectedPlan, inscription: Number.parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            {/* <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    value={selectedPlan.description}
                                    onChange={(e) => setSelectedPlan({ ...selectedPlan, description: e.target.value })}
                                    rows="3"
                                />
                            </div> */}

                            <div className="form-group">
                                <label>Características</label>
                                {selectedPlan.features.map((feature, index) => (
                                    <div key={index} className="feature-input">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            placeholder="Característica del plan"
                                        />
                                        <button type="button" className="remove-feature" onClick={() => removeFeature(index)}>
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <button type="button" className="add-feature" onClick={addFeature}>
                                    + Agregar Característica
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setShowEditModal(false)}>
                                Cancelar
                            </button>
                            <button className="btn-primary" onClick={savePlan}>
                                {isCreating ? "Crear Plan" : "Guardar Cambios"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlanManagement
