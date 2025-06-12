function PlanOption({ id, title, price, extraInfo, discount, children, selected, onClick }) {
    let priceHTML = `$${price.toLocaleString('es-AR')}<span>/MES</span>`;
    if (discount)
    {
        priceHTML = `<span class='prePrice'>$${price.toLocaleString('es-AR')}/mes</span>$${(price - (price * (discount / 100))).toLocaleString('es-AR')}<span>/MES</span>`
    }

    return (
        <div className={`plan ${selected === id ? 'selected' : ''}`} data-plan={id} onClick={() => onClick(id)}>
            {discount && discount !== 0 && <div className="discount-badge">{discount}% OFF!</div>}
            <h3>{title}</h3>
            <p className="price" dangerouslySetInnerHTML={{ __html: priceHTML }} />
            {extraInfo.map((text, idx) => (
                <p key={idx} className="payment-method" dangerouslySetInnerHTML={{ __html: text }} />
            ))}
            {children}
            <input type="radio" name="plan" value={id} className="hide" checked={selected === id} required />                             
        </div>
    );
}

export default PlanOption;