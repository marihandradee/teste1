import React, { useState, useEffect } from 'react';
import './AdminServices.css';

export default function AdminServices() {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState({ id: null, nome: '', descricao: '', valor: '', imagem: '', tempo_estimado: '' });

    const loadServices = () => {
        fetch('http://localhost:5000/api/servicos')
            .then(res => res.json())
            .then(data => setServices(data));
    };

    useEffect(() => { loadServices(); }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        const method = form.id ? 'PUT' : 'POST';
        const url = form.id ? `http://localhost:5000/api/servicos/${form.id}` : 'http://localhost:5000/api/servicos';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        setForm({ id: null, nome: '', descricao: '', valor: '', imagem: '', tempo_estimado: '' });
        loadServices();
    };

    const handleDelete = async (id) => {
        if(confirm("Deseja realmente excluir este serviço?")) {
            await fetch(`http://localhost:5000/api/servicos/${id}`, { method: 'DELETE' });
            loadServices();
        }
    };

    return (
        <div className="services-crud-container">
            <h2>Gerenciamento de Serviços <span className="highlight">(CRUD)</span></h2>
            
            <form onSubmit={handleSave} className="crud-form">
                <input type="text" placeholder="Nome do Serviço" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} required />
                <input type="text" placeholder="Descrição" value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} required />
                <input type="number" placeholder="Valor" value={form.valor} onChange={e => setForm({...form, valor: e.target.value})} required />
                <input type="text" placeholder="URL da Imagem" value={form.imagem} onChange={e => setForm({...form, imagem: e.target.value})} required />
                <input type="text" placeholder="Tempo Estimado (Ex: 45 min)" value={form.tempo_estimado} onChange={e => setForm({...form, tempo_estimado: e.target.value})} required />
                <button type="submit" className="premium-btn">{form.id ? 'Atualizar' : 'Adicionar'}</button>
            </form>

            <div className="crud-list">
                {services.map(s => (
                    <div className="crud-item" key={s.id}>
                        <div>
                            <strong>{s.nome}</strong> — R$ {parseFloat(s.valor).toFixed(2)} ({s.tempo_estimado})
                        </div>
                        <div>
                            <button className="btn-edit" onClick={() => setForm(s)}>Editar</button>
                            <button className="btn-delete" onClick={() => handleDelete(s.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}