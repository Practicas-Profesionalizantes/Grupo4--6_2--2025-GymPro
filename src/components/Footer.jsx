import logo from '../assets/images/logo.png';
import '../assets/css/footer.css'

function Footer(){
    return(
        <footer>
            <div class="footer-content">
                <div class="footer-section">
                    <h4>SOCIOS</h4>
                    <ul>
                        <li><a href="#">Stop Debit</a></li>
                        <li><a href="#">Botón De Arrepentimiento</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>LEGAL</h4>
                    <ul>
                        <li><a href="#">Términos & Condiciones</a></li>
                        <li><a href="#">Contrato Forza Flex</a></li>
                        <li><a href="#">Políticas De Privacidad</a></li>
                    </ul>
                </div>
                <div class="footer-logo">
                    <img src={logo} alt="MundoForza Logo"/>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2025 Mundoforza. Todos Los Derechos Reservados.</p>
                <div class="social-links">
                    <a href="mailto:ventas@mundoforza.com" class="social-icon" target="_blank"><i class='bx bx-envelope'></i></a>
                    <a href="https://instagram.com/mundoforza.gym" class="social-icon" target="_blank"><i class='bx bxl-instagram' ></i></a>
                    <a href="https://wa.me/+541172364754" class="social-icon" target="_blank"><i class='bx bxl-whatsapp' ></i></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;