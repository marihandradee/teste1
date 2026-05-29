import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const [appointments, setAppointments] = useState([]);

    const loadAll = () => {
        fetch('http://localhost:5000/api/agendamentos')
            .then(res => res.json())
            .then(data => setAppointments(data))
            .catch(err => console.log("Aviso: Banco desconfigurado"));
    };

    useEffect(() => { loadAll(); }, []);

    const handleAction = async (id, status) => {
        await fetch(`http://localhost:5000/api/agendamentos/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        loadAll();
    };

    return (
        <div className="admin-container">
            <h2>Painel Operacional — <span className="highlight">Pedidos Recebidos</span></h2>
            <div className="metrics-grid">
                <div className="metric-card"><h3>Agendamentos Hoje</h3><p>{appointments.length}</p></div>
                <div className="metric-card"><h3>Pendentes</h3><p>{appointments.filter(a => a.status === 'Pendente').length}</p></div>
                <div className="metric-card"><h3>Serviços Aceitos</h3><p>{appointments.filter(a => a.status === 'Aceito').length}</p></div>
            </div>

            <div className="orders-list">
                {appointments.map(a => (
                    <div className="order-card" key={a.id}>
                        <div className="order-details">
                            <h4>{a.cliente} — <span className="highlight">{a.servico_nome}</span></h4>
                            <p>Carro: {a.carro} | Placa: {a.placa}</p>
                            <p>Data: {a.data_agendamento.split('T')[0]} às {a.horario}</p>
                            <p>Status: <strong className={a.status.toLowerCase()}>{a.status}</strong></p>
                        </div>
                        {a.status === 'Pendente' && (
                            <div className="order-actions">
                                <button className="btn-accept" onClick={() => handleAction(a.id, 'Aceito')}>ACEITAR</button>
                                <button className="btn-deny" onClick={() => handleAction(a.id, 'Negado')}>NEGAR</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}