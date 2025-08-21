import './PaymentSuccessPage.css'
import logo from '../../assets/images/logo.png'

function PaymentFailedPage(){
    return(
        <>
        <div class="container">
            <header>
                <img src={logo} alt="MundoForza Logo" class="logo" />
            </header>

            <main>
                <section class="payment-success">
                    <h1>¡Pago Fallido!</h1>
                    <p class="thanks-message">Tu compra no ha sido completada correctamente, vuelva a intentar o contacta con soporte.</p>

                    {/* <div class="payment-details">
                        <h3>Detalles del Pago</h3>
                        <table class="payment-table">
                            <tr>
                                <th>ID de Transacción</th>
                                <td><span id="txn-id">Cargando...</span></td>
                            </tr>
                            <tr>
                                <th>Fecha</th>
                                <td><span id="date">Cargando...</span></td>
                            </tr>
                            <tr>
                                <th>Método de Pago</th>
                                <td><span id="method">Cargando...</span></td>
                            </tr>
                            <tr>
                                <th>Monto</th>
                                <td><span id="amount">Cargando...</span></td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td><span id="email">Cargando...</span></td>
                            </tr>
                        </table>
                    </div> */}

                    <div class="confirm-button">
                        <a href="/" class="btn">Volver al Inicio</a>
                    </div>
                </section>
            </main>
        </div>
        </>
        
    )
}

export default PaymentFailedPage;