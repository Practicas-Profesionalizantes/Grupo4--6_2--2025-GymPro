
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import gymInterior from '../../assets/images/1.webp';
import gymTraining from '../../assets/images/2.webp';
import personalTrainer from '../../assets/images/3.webp';
import './HomePage.css';

function HomePage() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const baseURL = `${window.location.protocol}//${window.location.hostname}:80`;
        axios.get(`${baseURL}/api/plans/get`)
            .then(res => setPlans(res.data.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="home-page">
            {/* Sección Hero */} 
            <section className="hero">
                <div className="hero-content">
                    <h1>TRANSFORMA TU CUERPO<br/>TRANSFORMA TU VIDA</h1>
                    <p>Únete a MundoForza y experimenta el mejor entrenamiento fitness disponible</p>
                    <Link to="/subscription" className="cta-button">ÚNETE AHORA</Link>
                </div>
            </section>

            {/* Sección Acerca de */} 
            <section className="about container">
                <div className="section-header">
                    <h2>BIENVENIDO A MUNDOFORZA</h2>
                    <p>La mejor experiencia fitness para todos los niveles</p>
                </div>
                <div className="about-content">
                    <div className="about-text">
                        <p>En MundoForza, creemos que el fitness no se trata solo de mejorar tu cuerpo, sino de construir una vida mejor. Nuestras instalaciones de vanguardia, entrenadores expertos y una comunidad de apoyo crean el entorno perfecto para que alcances tus objetivos.</p>
                        <p>Ya sea que estés comenzando tu viaje de acondicionamiento físico o buscando llevar tu entrenamiento al siguiente nivel, tenemos todo lo que necesitas para tener éxito.</p>
                    </div>
                    <div className="about-image">
                        <img src={gymInterior} alt="Interior moderno del gimnasio con varios equipos" />
                    </div>
                </div>
            </section>

            {/* Sección Servicios */}
            <section className="services">
                <div className="container">
                    <div className="section-header">
                        <h2>NUESTROS SERVICIOS</h2>
                        <p>Todo lo que necesitas para tu experiencia fitness</p>
                    </div>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="icon">
                                <i className='bx bx-dumbbell'></i>
                            </div>
                            <h3>Zona de Pesas</h3>
                            <p>Equipada con mancuernas, barras y equipos especializados para todo tu entrenamiento de fuerza.</p>
                        </div>
                        <div className="service-card">
                            <div className="icon">
                                <i className='bx bx-cycling'></i>
                            </div>
                            <h3>Zona de Cardio</h3>
                            <p>Incluye cintas, elípticas, bicicletas y máquinas de remo de última generación para entrenamientos cardiovasculares efectivos.</p>
                        </div>
                        <div className="service-card">
                            <div className="icon">
                                <i className='bx bx-user'></i>
                            </div>
                            <h3>Entrenamiento Personal</h3>
                            <p>Sesiones individuales con entrenadores certificados para acelerar tu progreso.</p>
                        </div>
                        <div className="service-card">
                            <div className="icon">
                                <i className='bx bx-group'></i>
                            </div>
                            <h3>Clases Grupales</h3>
                            <p>Clases energizantes como HIIT, yoga, ciclismo y más, dirigidas por instructores experimentados.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Planes de Membresía */}
            <section className="membership container">
                <div className="section-header">
                    <h2>PLANES DE MEMBRESÍA</h2>
                    <p>Encuentra el plan perfecto para tu camino fitness</p>
                </div>
                <div className="plans-container">
                    {(() => {
                        const plan = plans.find(e => e.id === 1);
                        if (!plan) return null;

                        return (
                            <div className="plan-card basic">
                                <div className="plan-header">
                                    <h3>${plan.name}</h3>
                                    <div className="price">
                                        ${plan.price.toLocaleString('es-AR')}<span>/mes</span>
                                    </div>
                                </div>
                                <div className="plan-features">
                                    <ul>
                                        <li>Acceso al gimnasio</li>
                                        <li>Equipamiento estándar</li>
                                        <li>Acceso a vestuarios</li>
                                        <li>2 pases para invitados al mes</li>
                                        <li>Planes de entrenamiento online</li>
                                    </ul>
                                </div>
                                <Link to="/subscription" className="plan-button">Elegir Plan</Link>
                            </div>
                        );
                    })()}

                    {(() => {
                        const plan = plans.find(e => e.id === 2);
                        if (!plan) return null;

                        return (
                            <div className="plan-card premium">
                                <div className="plan-tag">Más Popular</div>
                                <div className="plan-header">
                                    <h3>${plan.name}</h3>
                                    <div className="price">
                                        ${plan.price.toLocaleString('es-AR')}<span>/mes</span>
                                    </div>
                                </div>
                                <div className="plan-features">
                                    <ul>
                                        <li>Acceso 24/7 al gimnasio</li>
                                        <li>Todo el equipamiento</li>
                                        <li>4 clases grupales al mes</li>
                                        <li>1 sesión de entrenamiento personal</li>
                                        <li>Evaluación de estado físico</li>
                                        <li>Acceso a sauna y spa</li>
                                    </ul>
                                </div>
                                <Link to="/subscription" className="plan-button highlighted">Elegir Plan</Link>
                            </div>
                        );
                    })()}

                    {(() => {
                        const plan = plans.find(e => e.id === 3);
                        if (!plan) return null;

                        return (
                            <div className="plan-card elite">
                                <div className="plan-header">
                                    <h3>${plan.name}</h3>
                                    <div className="price">
                                        ${plan.price.toLocaleString('es-AR')}<span>/mes</span>
                                    </div>
                                </div>
                                <div className="plan-features">
                                    <ul>
                                        <li>Todo lo del Plan Premium</li>
                                        <li>Clases grupales ilimitadas</li>
                                        <li>4 sesiones personales</li>
                                        <li>Asesoría nutricional</li>
                                        <li>Servicio de locker VIP</li>
                                        <li>Acceso a todas las sedes</li>
                                    </ul>
                                </div>
                                <Link to="/subscription" className="plan-button">Elegir Plan</Link>
                            </div>
                        );
                    })()}
                 </div>
            </section>

            {/* Entrenamiento */}
            <section className="training">
                <div className="container">
                    <div className="split-content">
                        <div className="training-image">
                            <img src={gymTraining} alt="Clase grupal en acción" />
                        </div>
                        <div className="training-text">
                            <h2>ENTRENA CON LOS MEJORES</h2>
                            <p>Nuestros entrenadores profesionales están comprometidos a ayudarte a alcanzar tus metas con programas personalizados y apoyo constante.</p>
                            <ul className="training-benefits">
                                <li>Planes de entrenamiento personalizados</li>
                                <li>Guía nutricional</li>
                                <li>Seguimiento de progreso</li>
                                <li>Motivación y responsabilidad</li>
                            </ul>
                            <Link to="/subscription" className="cta-button secondary">Comenzar Entrenamiento</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonios */}
            <section className="testimonials container">
                <div className="section-header">
                    <h2>HISTORIAS DE MIEMBROS</h2>
                    <p>Escucha a nuestros miembros satisfechos</p>
                </div>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="quote">"MundoForza cambió completamente mi forma de ver el fitness. Los entrenadores son excepcionales y la comunidad es muy solidaria."</div>
                        <div className="author">- María S.</div>
                    </div>
                    <div className="testimonial-card">
                        <div className="quote">"He probado muchos gimnasios, pero ninguno se compara con la calidad del equipo y el ambiente de MundoForza."</div>
                        <div className="author">- Carlos T.</div>
                    </div>
                    <div className="testimonial-card">
                        <div className="quote">"El programa de entrenamiento personal me ayudó a perder 13 kilos en 3 meses. La mejor inversión que he hecho por mi salud."</div>
                        <div className="author">- Luciana M.</div>
                    </div>
                </div>
            </section>

            {/* Entrenamiento Personal */}
            <section className="personal-training">
                <div className="container">
                    <div className="split-content reverse">
                        <div className="pt-text">
                            <h2>ENTRENAMIENTO PERSONAL</h2>
                            <p>Lleva tu estado físico al siguiente nivel con nuestros entrenadores personales. Nuestros profesionales certificados diseñarán un programa a tu medida.</p>
                            <div className="trainer-stats">
                                <div className="stat">
                                    <span className="number">15+</span>
                                    <span className="label">Entrenadores Certificados</span>
                                </div>
                                <div className="stat">
                                    <span className="number">1000+</span>
                                    <span className="label">Historias de Éxito</span>
                                </div>
                                <div className="stat">
                                    <span className="number">10+</span>
                                    <span className="label">Años de Experiencia</span>
                                </div>
                            </div>
                        </div>
                        <div className="pt-image">
                            <img src={personalTrainer} alt="Entrenador personal ayudando a un cliente con la forma correcta" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Beneficios de la Salud */}
            <section className="health-benefits container">
                <div className="section-header">
                    <h2>BENEFICIOS PARA LA SALUD</h2>
                    <p>El ejercicio regular mejora tu bienestar general</p>
                </div>
                <div className="benefits-grid">
                    <div className="benefit-card">
                        <div className="benefit-icon">
                            <i className='bx bx-heart'></i>
                        </div>
                        <h3>Salud Cardiaca</h3>
                        <p>El ejercicio regular fortalece tu corazón y mejora la circulación.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">
                            <i className='bx bx-brain'></i>
                        </div>
                        <h3>Bienestar Mental</h3>
                        <p>La actividad física libera endorfinas que ayudan a reducir la ansiedad y la depresión.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">
                            <i className='bx bx-shield'></i>
                        </div>
                        <h3>Sistema inmunológico</h3>
                        <p>El ejercicio moderado fortalece el sistema inmunológico y disminuye el riesgo de enfermedades.</p>
                    </div>
                    <div className="benefit-card">
                        <div className="benefit-icon">
                            <i className='bx bx-bulb'></i>
                        </div>
                        <h3>Mejorar Energía</h3>
                        <p>La actividad física regular mejora la fuerza y ​​la resistencia muscular.</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact" id="contact">
                <div className="container">
                    <div className="section-header">
                        <h2>CONTACTANOS</h2>
                        <p>Estamos aqui para resolver tus preguntas</p>
                    </div>
                    <div className="contact-container">
                        <div className="contact-info">
                            <div className="contact-item">
                                <div className="icon">
                                    <i className='bx bx-map'></i>
                                </div>
                                <div className="info">
                                    <h4>Ubicación</h4>
                                    <p>123 Fitness Avenue<br/>Buenos Aires, Argentina</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="icon">
                                    <i className='bx bx-phone'></i>
                                </div>
                                <div className="info">
                                    <h4>Llamanos</h4>
                                    <p>+54 11 7236 4754</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="icon">
                                    <i className='bx bx-envelope'></i>
                                </div>
                                <div className="info">
                                    <h4>Email</h4>
                                    <p>info@mundoforza.com</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="icon">
                                    <i className='bx bx-time'></i>
                                </div>
                                <div className="info">
                                    <h4>Horarios</h4>
                                    <p>Lunes-Viernes: 6am - 11pm<br/>Sabado-Domingo: 8am - 8pm</p>
                                </div>
                            </div>
                        </div>
                        <div className="contact-form">
                            <form>
                                <div className="form-row">
                                    <div className="form-group">
                                        <input type="text" placeholder="Nombre Completo" required />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" placeholder="Correo Electrónico" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Asunto" />
                                </div>
                                <div className="form-group">
                                    <textarea placeholder="Tu mensaje" rows="5" required></textarea>
                                </div>
                                <button type="submit" className="submit-button">ENVIAR</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="map-section">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210147.39707924803!2d-58.573384549150484!3d-34.615743996279026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2sus!4v1683834324021!5m2!1sen!2sus" 
                    width="100%" 
                    height="450" 
                    style={{border: 0}}
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Gym Location">
                </iframe>
            </section>
        </div>
    )
}

export default HomePage;