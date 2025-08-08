function PlanOption({ id, title, price, inscription, discount, extraInfo, children, selected, onClick }) {
    let priceHTML = `$${price.toLocaleString('es-AR')}<span>/MES</span>`;
    if (discount)
    {
        priceHTML = `<span class='prePrice'>$${price.toLocaleString('es-AR')}/mes</span>$${(price - (price * (discount / 100))).toLocaleString('es-AR')}<span>/MES</span>`
    }

    const renderExtraInfo = () =>
    extraInfo
        .replaceAll('{PRICE}', price.toLocaleString('es-AR'))
        .replaceAll('{PRICE_PER_3}', Math.round(price / 3).toLocaleString('es-AR'))
        .replaceAll('{PRICE_PER_6}', Math.round(price / 6).toLocaleString('es-AR'))
        .replaceAll('{PRICE_PER_12}', Math.round(price / 12).toLocaleString('es-AR'));

    return (
        <div className={`plan ${selected === id ? 'selected' : ''}`} data-plan={id} onClick={() => onClick(id)}>
            {discount && discount !== 0 ? <div className="discount-badge">{discount}% OFF!</div> : null}
            <h3>{title}</h3>
            <p className="price" dangerouslySetInnerHTML={{ __html: priceHTML }} />
            <p className="payment-method" dangerouslySetInnerHTML={{ __html: renderExtraInfo() }} />
            {inscription ? <div class='inscription-bar'><p>INSCRIPCIÓN: ${inscription}</p></div> : null}
            {children}
            <input type="radio" name="plan" value={id} className="hide" checked={selected === id} required />                             
        </div>
    );
}

export default PlanOption;