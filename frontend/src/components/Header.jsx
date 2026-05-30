import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Header.css';

// 👈 IMPORTANTE: Puxando o seu novo arquivo .jpg da pasta assets
import logoImg from '../assets/logo.png'; 

export default function Header() {
    const { user, logout, theme, toggleTheme } = useContext(AppContext);
    const [dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="main-header">
            <div className="header-container">
                <div className="logo-area" onClick={() => navigate('/')}>
                    
                    {/* Sua logo.jpg aplicada aqui */}
                    <img src={logoImg} alt="Logo Vision Car" className="logo-img" />
                    
                    <h1 className="logo-text">Vision <span className="highlight">Car</span></h1>
                </div>

                <nav className="nav-links">
                    {user?.role === 'admin' ? (
                        <>
                            <Link to="/admin">Dashboard</Link>
                            <Link to="/admin/servicos">Gerenciar Serviços</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/">Home</Link>
                            <a href="#servicos">Serviços</a>
                            {/* 👇 NOVO LINK ADICIONADO */}
                             <a href="#localizacao">Localização</a> 
                             <Link to="/agendamento">Agendamento</Link>
                        </>
                    )}
                </nav>

                <div className="actions-area">
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    {user && (
                        <div className="profile-wrapper">
                            <div className="avatar" onClick={() => setDropdown(!dropdown)}>
                                👤 <span className="avatar-name">{user.nome}</span>
                            </div>
                            {dropdown && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-info">
                                        <p className="user-name">{user.nome}</p>
                                        <p className="user-role">{user.role}</p>
                                    </div>
                                    <hr />
                                    <button onClick={() => { setDropdown(false); navigate(user.role === 'admin' ? '/admin' : '/'); }}>Meu Perfil</button>
                                    <button onClick={() => { setDropdown(false); logout(); navigate('/login'); }}>Sair</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}