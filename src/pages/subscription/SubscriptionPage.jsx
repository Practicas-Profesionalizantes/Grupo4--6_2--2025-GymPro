import React from 'react';
import PlanOption from '../../components/subscription/PlanOption';
import HeaderProcessBar from '../../components/payment/HeaderProcessBar';

function SubscriptionPage() {
    return (
    <>
        <div class="container">
            <HeaderProcessBar />
            <main>
                <form action="/payment" method="get">
                    <div className="split-layout">
                        <section className="purchase-section">
                            <h1>SELECCIONÁ TU PLAN</h1>
                            <p>¡ELEGÍ EL ABONO QUE SE ADAPTE A VOS!</p>

                            <div className="plans">
                                <PlanOption
                                    id={1}
                                    title="PLAN FORZA FLEX"
                                    price={`<span class='prePrice'>$38.990/mes</span>$27.290<span>/MES</span>`}
                                    extraInfo={[
                                        `DÉBITO AUTOMÁTICO <span>(Permanencia mínima de 3 meses)</span>`,
                                        `<div class='inscription-bar'><p>INSCRIPCIÓN: $5000</p></div>`
                                    ]}
                                    discount="30% OFF!"
                                >
                                    <input type="radio" name="plan" value="0" className="hide" required />
                                </PlanOption>

                                <PlanOption
                                    id={2}
                                    title="PLAN SEMESTRAL + MULTISEDE"
                                    price="$36.990<span>/MES</span>"
                                    extraInfo={[
                                        "UN PAGO CON DÉBITO",
                                        "¡TAMBIÉN PODÉS CUOTEAR! <span>(6 pagos de $39.990)</span>"
                                    ]}
                                >
                                    <input type="radio" name="plan" value="1" className="hide" required />
                                </PlanOption>

                                <PlanOption
                                    id={3}
                                    title="PLAN ANUAL + MULTISEDE"
                                    price="$33.990<span>/MES</span>"
                                    extraInfo={[
                                        "UN PAGO CON DÉBITO",
                                        "¡TAMBIÉN PODÉS CUOTEAR! <span>(6 pagos de $74.990)</span>"
                                    ]}
                                >
                                    <input type="radio" name="plan" value="2" className="hide" required />
                                </PlanOption>
                            </div>

                            <div className="terms">
                                <label>
                                    <input type="checkbox" required />
                                    Acepto los <a href="#">Términos y Condiciones</a> y la <a href="#">Política de Privacidad</a>.
                                </label>
                                <label>
                                    <input type="checkbox" required />
                                    Acepto recibir comunicaciones.
                                </label>
                            </div>
                        </section>

                        <section className="data-section">
                            <h1>COMPLETÁ TUS DATOS</h1>
                            <p>DEJANOS TUS DATOS PARA LA INSCRIPCIÓN</p>

                            <div className="dataForm" id="personalDataForm">
                                <div className="form-row">
                                    <input type="text" placeholder="Nombre" name="nombre" required />
                                    <input type="text" placeholder="Apellido" name="apellido" required />
                                </div>
                                <div className="form-row">
                                    <select name="documentoTipo" required>
                                        <option disabled value="">Tipo De Documento</option>
                                        <option value="dni">DNI</option>
                                    </select>
                                    <input type="number" name="documentoNumero" placeholder="Número" required />
                                </div>
                                <div className="form-row">
                                    <select name="genero" required>
                                        <option disabled value="">Seleccionar Género</option>
                                        <option value="m">Masculino</option>
                                        <option value="f">Femenino</option>
                                    </select>
                                    <input type="date" name="nacimiento" required />
                                </div>
                                <input type="email" name="email" placeholder="Email" required />
                                <input type="number" name="contactoEmergencia" placeholder="Contacto De Emergencia" required />

                                <h3>Domicilio</h3>
                                <div className="form-row">
                                    <input type="text" name="calle" placeholder="Calle" required />
                                    <input type="number" name="calleNumero" placeholder="Número" required />
                                    <input type="text" name="dpto" placeholder="Dpto/Lote" />
                                </div>
                                <div className="form-row">
                                    <input type="text" name="ciudad" placeholder="Ciudad" required />
                                    <select name="provincia" required>
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