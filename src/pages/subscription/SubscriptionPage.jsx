import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PlanOption from '../../components/subscription/PlanOption';
import HeaderProcessBar from '../../components/payment/HeaderProcessBar';

function SubscriptionPage() {
    const baseURL = `${window.location.protocol}//${window.location.hostname}:80`;

    const [plans, setPlans] = useState([]);
    const [selectedPlanId, setSelectedPlanId] = useState(null);

    useEffect(() => {
        axios.get(`${baseURL}/api/plans/get`)
            .then(res => setPlans(res.data.data))
            .catch(err => console.error(err));
    }, []);


    return (
    <>
        <div class="container">
            <HeaderProcessBar />
            <main>
                <form action={`${baseURL}/api/payment/create`} method="post">
                    <div className="split-layout">
                        <section className="purchase-section">
                            <h1>SELECCIONÁ TU PLAN</h1>
                            <p>¡ELEGÍ EL ABONO QUE SE ADAPTE A VOS!</p>

                                <div className="plans">
                                    {(() => {
                                        const plan = plans.find(e => e.id === 1);
                                        if (!plan) return null;

                                        return (
                                            <PlanOption
                                                id={1}
                                                title={plan.name}
                                                price={plan.price}
                                                extraInfo={[
                                                    `DÉBITO AUTOMÁTICO <span>(Permanencia mínima de 3 meses)</span>`,
                                                    plan.inscription ? `<div class='inscription-bar'><p>INSCRIPCIÓN: ${plan.inscription}</p></div>` : null
                                                ]}
                                                discount={plan.discount}
                                                selected={selectedPlanId}
                                                onClick={setSelectedPlanId}
                                            ></PlanOption>
                                        );
                                    })()}
                                    {(() => {
                                        const plan = plans.find(e => e.id === 2);
                                        if (!plan) return null;
                                        
                                        return (
                                            <PlanOption
                                                id={2}
                                                title={`${plan.name} + MULTISEDE`}
                                                price={plan.price}
                                                extraInfo={[
                                                    "UN PAGO CON DÉBITO",
                                                    `¡TAMBIÉN PODÉS CUOTEAR! <span>(6 pagos de $${Math.round(plan.price/6).toLocaleString('es-AR')})</span>`,
                                                    plan.inscription ? `<div class='inscription-bar'><p>INSCRIPCIÓN: ${plan.inscription}</p></div>` : null
                                                ]}
                                                selected={selectedPlanId}
                                                onClick={setSelectedPlanId}
                                            ></PlanOption>
                                        );
                                    })()}
                                    {(() => {
                                        const plan = plans.find(e => e.id === 3);
                                        if (!plan) return null;

                                        return (
                                            <PlanOption
                                                id={3}
                                                title={`${plan.name} + MULTISEDE`}
                                                price={plan.price}
                                                extraInfo={[
                                                    "UN PAGO CON DÉBITO",
                                                    `¡TAMBIÉN PODÉS CUOTEAR! <span>(6 pagos de $${Math.round(plan.price/6).toLocaleString('es-AR')})</span>`,
                                                    plan.inscription ? `<div class='inscription-bar'><p>INSCRIPCIÓN: ${plan.inscription}</p></div>` : null
                                                ]}
                                                selected={selectedPlanId}
                                                onClick={setSelectedPlanId}
                                            ></PlanOption>
                                        );
                                    })()}
                                </div>

                            <div className="terms">
                                <label>
                                    <input type="checkbox" required />
                                    Acepto los <a href="/terminos-y-condiciones" target="_blank">Términos y Condiciones</a> y la <a href="/politica-de-privacidad" target="_blank">Política de Privacidad</a>.
                                </label>
                                <label>
                                    <input type="checkbox" />
                                    Acepto recibir comunicaciones.
                                </label>
                            </div>
                        </section>

                        <section className="data-section">
                            <h1>COMPLETÁ TUS DATOS</h1>
                            <p>DEJANOS TUS DATOS PARA LA INSCRIPCIÓN</p>

                            <div className="dataForm" id="personalDataForm">
                                <div className="form-row">
                                    <input type="text" placeholder="Nombre" name="name" required />
                                    <input type="text" placeholder="Apellido" name="lastname" required />
                                </div>
                                <div className="form-row">
                                    <select name="documentType" required>
                                        <option disabled value="">Tipo De Documento</option>
                                        <option value="dni">DNI</option>
                                    </select>
                                    <input type="number" name="documentNumber" placeholder="" required />
                                </div>
                                <div className="form-row">
                                    <select name="sex" required>
                                        <option disabled value="">Seleccionar Género</option>
                                        <option value="m">Masculino</option>
                                        <option value="f">Femenino</option>
                                    </select>
                                    <input type="date" name="dateOfBirth" required />
                                </div>
                                <input type="email" name="email" placeholder="Email" required />
                                <input type="number" name="emergencyContact" placeholder="Contacto De Emergencia" required />

                                <h3>Domicilio</h3>
                                <div className="form-row">
                                    <input type="text" name="address" placeholder="Calle" required />
                                    <input type="number" name="addressNumber" placeholder="Número" required />
                                    <input type="text" name="floor" placeholder="Dpto/Lote" />
                                </div>
                                <div className="form-row">
                                    <input type="text" name="city" placeholder="Ciudad" required />
                                    <select name="province" required>
                                        <option disabled value="">Seleccionar Provincia</option>
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
                        </section>
                    </div>

                    <button className="confirm-button">Ir a Pagar</button>
                </form>
            </main>
        </div>
        
    </>
    );
}

export default SubscriptionPage;