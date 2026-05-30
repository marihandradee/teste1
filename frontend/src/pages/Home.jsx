import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import imagemPadrao from '../assets/servico-padrao.jpg';


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
                    <h1>Excelência em limpeza <span className="highlight">Automotiva</span></h1>
                    <p>Cuidado premium para quem valoriza cada detalhe do seu veículo.</p>
                    <button className="premium-btn" onClick={() => navigate('/agendamento')}>AGENDAR AGORA</button>
                </div>
            </section>

            <section id="servicos" className="services-section">
                <h2>Nossos <span className="highlight">Serviços</span></h2>
                <div className="services-grid">
                    {services.map(s => (
                       <div className="service-card" key={s.id}>
                        {/* 👇 Agora ele puxa a imagem salva direto do seu computador */}
{                        /* 👇 Força o uso da imagemPadrao se o banco mandar um texto vazio */}
                        <img src={s.imagem && s.imagem.trim() !== "" ? s.imagem : imagemPadrao} alt={s.nome} />    
                           <div className="card-body">
                                <h3>{s.nome}</h3>
                                <p>{s.descricao}</p>
                                <div className="card-meta">
                                    <span className="price">R$ {parseFloat(s.valor).toFixed(2)}</span>
                                    <span className="time"> {s.tempo_estimado}</span>
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
                    <img src="https://i.pinimg.com/1200x/a3/09/9f/a3099f884aa35f7fe79e49af9a6010a1.jpg" alt="Carro 1" />
                    <img src="https://i.pinimg.com/736x/3c/cb/f4/3ccbf48368e14c58e5b6a54659f3be5c.jpg" alt="Carro 2" />
                    <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400" alt="Carro 3" />
                </div>
            </section>
             {/* 📍 NOVA SEÇÃO DE LOCALIZAÇÃO */}
<section id="localizacao" className="location-section">
    <div className="location-container">
        
        {/* LADO ESQUERDO: Informações de Atendimento */}
        <div className="location-info">
            <h2> Nossa <span className="highlight">Localização</span></h2>
            <p className="location-brand">Vision Car Lava Rápido</p>
            <p className="location-desc">
                Na Vision Car, cuidamos do seu veículo com qualidade, rapidez e atenção aos detalhes. 
                Nossa equipe especializada oferece serviços completos de limpeza, higienização e estética automotiva para deixar seu carro sempre impecável.
            </p>
            
            <div className="info-details">
                <p><strong> Endereço:</strong> Rua Peixoto Gomide, 345 – São Paulo/SP</p>
                <p><strong> Telefone:</strong> (11) 98765-3456</p>
            </div>

            <div className="opening-hours">
                <h3>🕒 Horário de Funcionamento</h3>
                <ul>
                    <li><span>Segunda a Sexta:</span> <span>08h às 18h</span></li>
                    <li><span>Sábado:</span> <span>08h às 14h</span></li>
                    <li><span>Domingo:</span> <span className="closed">Fechado</span></li>
                </ul>
            </div>
        </div>

        {/* LADO DIREITO: Mapa do Google Maps Incorporado */}
        <div className="location-map">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975432657416!2d-46.6564942!3d-23.5613497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQwLjkiUyA0NsKwMzknMjMuNCJX!5e0!3m2!1spt-BR!2sbr!4v1717000000000!5m2!1spt-BR!2sbr"
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '12px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Localização Vision Car"
              ></iframe>
                 </div>

               </div>
              </section>
            <footer className="footer">
                <p>&copy; 2026 Vision Car - Estética Automotiva de Alta Performance.</p>
            </footer>
        </div>
    );
}