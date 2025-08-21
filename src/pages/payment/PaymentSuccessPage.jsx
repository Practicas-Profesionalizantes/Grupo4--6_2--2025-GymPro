import { useSearchParams } from "react-router-dom";
import './PaymentSuccessPage.css'
import logo from '../../assets/images/logo.png'

function PaymentSuccessPage() {
    const [searchParams] = useSearchParams();

    const paymentId = searchParams.get("payment_id");
    const amount = searchParams.get("amount");
    const email = searchParams.get("email");

    return (
        <>
            <div class="container">
                <header>
                    <img src={logo} alt="MundoForza Logo" class="logo" />
                </header>

                <main>
                    <section class="payment-success">
                        <h1>¡Pago Exitoso!</h1>
                        <p class="thanks-message">Gracias por tu compra. Hemos recibido tu pago correctamente.</p>

                        <div class="payment-details">
                            <h3>Detalles del Pago</h3>
                            <table class="payment-table">
                                <tr>
                                    <th>ID de Transacción</th>
                                    <td><span id="txn-id">{paymentId || "N/A"}</span></td>
                                </tr>
                                <tr>
                                    <th>Monto</th>
                                    <td>{amount || "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{email || "N/A"}</td>
                                </tr>
                            </table>
                        </div>

                        <div class="confirm-button">
                            <a href="/" class="btn">Volver al Inicio</a>
                        </div>
                    </section>
                </main>
            </div>
        </>

    )
}

export default PaymentSuccessPage;