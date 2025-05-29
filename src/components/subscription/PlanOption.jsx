function PlanOption({ id, title, price, extraInfo, discount, children }) {
    return (
        <div className="plan" data-plan={id}>
            {discount && <div className="discount-badge">{discount}</div>}
            <h3>{title}</h3>
            <p className="price" dangerouslySetInnerHTML={{ __html: price }} />
            {extraInfo.map((text, idx) => (
                <p key={idx} className="payment-method" dangerouslySetInnerHTML={{ __html: text }} />
            ))}
            {children}
        </div>
    );
}

export default PlanOption;