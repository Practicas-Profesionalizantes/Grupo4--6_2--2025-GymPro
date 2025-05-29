import logo from '../../assets/images/logo.png';

function HeaderProcessBar() {
    return(
        <header>
            <img src={logo} alt="MundoForza Logo" class="logo"/>
            
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="step active">
                        <div class="step-number">1</div>
                        <div class="step-text">ELEGÍ TU PLAN</div>
                    </div>
                    <div class="step active">
                        <div class="step-number">2</div>
                        <div class="step-text">COMPLETÁ TUS DATOS</div>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-text">COMENZÁ A RUGIR</div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderProcessBar;