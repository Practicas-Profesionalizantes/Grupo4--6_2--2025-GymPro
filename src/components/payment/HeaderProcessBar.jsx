import logo from '../../assets/images/logo.png';

function HeaderProcessBar({status}) {
    return(
        <header>
            <img src={logo} alt="MundoForza Logo" class="logo"/>
            
            <div class="progress-container">
                <div class={`progress-bar ${status >= 2 ? 'step2' : ''} ${status >= 3 ? 'step3' : ''}`}>
                    <div class="step active">
                        <div class="step-number">1</div>
                        <div class="step-text">ELEGÍ TU PLAN</div>
                    </div>
                    <div class={status >= 2 ? 'step active' : 'step'}>
                        <div class="step-number">2</div>
                        <div class="step-text">COMPLETÁ TUS DATOS</div>
                    </div>
                    <div class={status === 3 ? 'step active' : 'step'}>
                        <div class="step-number">3</div>
                        <div class="step-text">COMENZÁ A RUGIR</div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderProcessBar;