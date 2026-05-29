import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();

            if (data.success) {
                login(data.user);
                if (data.user.role === 'admin') navigate('/admin');
                else navigate('/');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Falha na conexão com o servidor local.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-overlay"></div>
            <div className="login-card">
                <h2>Vision <span className="highlight">Car</span></h2>
                <p className="subtitle">Estética Automotiva Premium</p>
                
                {error && <div className="error-toast">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>E-mail</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Ex: admin@gmail.com"/>
                    </div>
                    <div className="input-group">
                        <label>Senha</label>
                        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required placeholder="••••••••"/>
                    </div>
                    <button type="submit" className="premium-btn" disabled={loading}>
                        {loading ? 'Entrando...' : 'LOGIN'}
                    </button>
                </form>
            </div>
        </div>
    );
}