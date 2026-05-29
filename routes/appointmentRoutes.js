const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Listar todos os agendamentos (Admin - com JOIN para pegar nome do cliente e do serviço)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT a.*, u.nome as cliente, s.nome as servico_nome 
            FROM agendamentos a
            JOIN usuarios u ON a.usuario_id = u.id
            JOIN servicos s ON a.servico_id = s.id
            ORDER BY a.data_agendamento DESC, a.horario DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Listar agendamentos de um cliente específico
router.get('/usuario/:id', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT a.*, s.nome as servico_nome 
            FROM agendamentos a
            JOIN servicos s ON a.servico_id = s.id
            WHERE a.usuario_id = ?
        `, [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Criar novo agendamento (Cliente)
router.post('/', async (req, res) => {
    const { usuario_id, servico_id, carro, placa, data_agendamento, horario } = req.body;
    try {
        await db.execute(
            'INSERT INTO agendamentos (usuario_id, servico_id, carro, placa, data_agendamento, horario, status) VALUES (?, ?, ?, ?, ?, ?, "Pendente")',
            [usuario_id, servico_id, carro, placa, data_agendamento, horario]
        );
        res.json({ success: true, message: 'Agendamento enviado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mudar status (Aceitar) ou Excluir (Negar)
router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (status === 'Negado') {
            await db.execute('DELETE FROM agendamentos WHERE id = ?', [id]);
            res.json({ message: 'Agendamento negado e removido.' });
        } else {
            await db.execute('UPDATE agendamentos SET status = ? WHERE id = ?', [status, id]);
            res.json({ message: `Agendamento marcado como ${status}.` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;