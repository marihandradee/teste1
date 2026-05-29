import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './Agendamento.css';

export default function Agendamento() {
    const { user } = useContext(AppContext);
    const [services, setServices] = useState([]);
    const [myAppointments, setMyAppointments] = useState([]);
    const [form, setForm] = useState({ servico_id: '', carro: '', placa: '', data_agendamento: '', horario: '' });
    const [msg, setMsg] = useState('');

    const fetchAppointments = () => {
        if (user) {
            fetch(`http://localhost:5000/api/agendamentos/usuario/${user.id}`)
                .then(res => res.json())
                .then(data => setMyAppointments(data));
        }
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/servicos')
            .then(res => res.json())
            .then(data => setServices(data));
        fetchAppointments();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...form, usuario_id: user.id };

        const res = await fetch('http://localhost:5000/api/agendamentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
            setMsg('Agendamento enviado com sucesso!');
            setForm({ servico_id: '', carro: '', placa: '', data_agendamento: '', horario: '' });
            fetchAppointments();
        }
    };

    return (
        <div className="agendamento-container">
            <h2>Solicitar <span className="highlight">Agendamento</span></h2>
            {msg && <div className="success-banner">{msg}</div>}
            
            <form onSubmit={handleSubmit} className="agendamento-form">
                <select value={form.servico_id} onChange={e => setForm({...form, servico_id: e.target.value})} required>
                    <option value="">Selecione o Serviço</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.nome} - R$ {s.valor}</option>)}
                </select>
                <input type="text" placeholder="Modelo do Carro" value={form.carro} onChange={e => setForm({...form, carro: e.target.value})} required />
                <input type="text" placeholder="Placa" value={form.placa} onChange={e => setForm({...form, placa: e.target.value})} required />
                <input type="date" value={form.data_agendamento} onChange={e => setForm({...form, data_agendamento: e.target.value})} required />
                <input type="time" value={form.horario} onChange={e => setForm({...form, horario: e.target.value})} required />
                <button type="submit" className="premium-btn">ENVIAR AGENDAMENTO</button>
            </form>

            <h3 style={{marginTop: '40px'}}>Meus <span className="highlight">Agendamentos</span></h3>
            <table className="premium-table">
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Carro</th>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {myAppointments.map(a => (
                        <tr key={a.id}>
                            <td>{a.servico_nome}</td>
                            <td>{a.carro} ({a.placa})</td>
                            <td>{a.data_agendamento.split('T')[0]}</td>
                            <td>{a.horario}</td>
                            <td><span className={`status-badge ${a.status.toLowerCase()}`}>{a.status}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}