import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/servicos')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.log("Aviso: Banco desconfigurado."));
    }, []);

    return (
        <div className="home-page">
            <section className="hero">
                <div className="hero-content">
                    <h1>Seu Carro com Brilho de <span className="highlight">Showroom</span></h1>
                    <p>O cuidado premium e detalhado que o seu veículo realmente merece.</p>
                    <button className="premium-btn" onClick={() => navigate('/agendamento')}>AGENDAR AGORA</button>
                </div>
            </section>

            <section id="servicos" className="services-section">
                <h2>Nossos <span className="highlight">Serviços</span></h2>
                <div className="services-grid">
                    {services.map(s => (
                        <div className="service-card" key={s.id}>
                            <img src={s.imagem || "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=500"} alt={s.nome} />
                            <div className="card-body">
                                <h3>{s.nome}</h3>
                                <p>{s.descricao}</p>
                                <div className="card-meta">
                                    <span className="price">R$ {parseFloat(s.valor).toFixed(2)}</span>
                                    <span className="time">⏱️ {s.tempo_estimado}</span>
                                </div>
                                <button className="premium-btn card-btn" onClick={() => navigate('/agendamento')}>Agendar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="gallery-section">
                <h2>Galeria <span className="highlight">Vision</span></h2>
                <div className="gallery-grid">
                    <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400" alt="Carro 1" />
                    <img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400" alt="Carro 2" />
                    <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400" alt="Carro 3" />
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2026 Vision Car - Estética Automotiva de Alta Performance.</p>
            </footer>
        </div>
    );
}