import HeaderProcessBar from "../../components/payment/HeaderProcessBar";

function PaymentProcessPage() {
    return (
        <>
        <div class="container">
            <HeaderProcessBar/>
            <main>
                <form
                    action="https://script.google.com/macros/s/AKfycby30LwJo4l5382RC3LxfsDumXCUB-5HRq6iem2x1ysNOu4NkExjp9YF0GUmcL7T4vwS/exec"
                    method="get"
                    name="payment"
                >
                    <button className="back-btn"><i className="bx bx-arrow-back"></i>Volver</button>

                    <div className="plan-conditions">
                        <div className="grid-container">
                            <div className="conditions-box">
                                <h3 id="title">Estas comprando un abono Forza Flex</h3>
                                <p className="price">$0.00</p>
                                <ul id="conditions"></ul>
                            </div>

                            <div className="topMessage-container">
                                <div className="topMessage">
                                    <h3>🎉 Descuento por los primeros 3 meses</h3>
                                </div>

                                <div className="discount-box">
                                    <select name="sede" required defaultValue="">
                                        <option disabled value="" id="titleSed">Seleccionar Sede</option>
                                        <option>Monte Grande</option>
                                        <option>Lomitas</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="final-price">
                        <p>DESPUÉS DE LOS 3 MESES PAGAS <span>$38.990/MES</span></p>
                    </div>

                    <section className="data-section">
                        <h2>Cargá tu información de pago</h2>
                        <div className="dataForm">
                            <div className="form-row">
                                <input
                                    type="text"
                                    placeholder="Nombre en la tarjeta"
                                    data-decidir="card_holder_name"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <select data-decidir="card_holder_doc_type" required defaultValue="dni">
                                    <option value="dni">DNI</option>
                                </select>
                                <input
                                    type="number"
                                    placeholder="Documento del Titular"
                                    data-decidir="card_holder_doc_number"
                                    id="dninmb"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <input
                                    name="ccn"
                                    id="ccn"
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9\s]{13,19}"
                                    autoComplete="cc-number"
                                    maxLength="19"
                                    placeholder="Número de la tarjeta de crédito o débito"
                                    data-decidir="card_number"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <input
                                    type="number"
                                    name="mm"
                                    placeholder="MM"
                                    data-decidir="card_expiration_month"
                                    required
                                />
                                <input
                                    type="number"
                                    name="yy"
                                    placeholder="YY"
                                    data-decidir="card_expiration_year"
                                    required
                                />
                                <input
                                    type="number"
                                    name="cvv"
                                    placeholder="CVV/CVC"
                                    data-decidir="security_code"
                                    required
                                />
                            </div>
                            <div className="form-row" id="cuotas">
                                <select name="cuotas" required defaultValue="1">
                                    <option value="1">Pago único $219.960</option>
                                    <option value="6">6 Pagos de $39.990 (Crédito)</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <div className="terms">
                        <label>
                            <input type="checkbox" required />
                            Acepto las condiciones del contrato de cobro recurrente
                        </label>
                        <label>
                            <input type="checkbox" required />
                            Acepto presentar mi apto físico en menos de 30 días
                        </label>
                    </div>

                    <button className="confirm-button">Abonar y empezar</button>
                </form>
            </main>
        </div>
        </>
    );
}

export default PaymentProcessPage;