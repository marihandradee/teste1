const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Listar todos os serviços
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM servicos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Adicionar novo serviço (Admin)
router.post('/', async (req, res) => {
    const { nome, descricao, valor, imagem, tempo_estimado } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO servicos (nome, descricao, valor, imagem, tempo_estimado) VALUES (?, ?, ?, ?, ?)',
            [nome, descricao, valor, imagem, tempo_estimado]
        );
        res.json({ id: result.insertId, nome, descricao, valor, imagem, tempo_estimado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Editar serviço existente (Admin)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, valor, imagem, tempo_estimado } = req.body;
    try {
        await db.execute(
            'UPDATE servicos SET nome = ?, descricao = ?, valor = ?, imagem = ?, tempo_estimado = ? WHERE id = ?',
            [nome, descricao, valor, imagem, tempo_estimado, id]
        );
        res.json({ message: 'Serviço atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Excluir serviço (Admin)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM servicos WHERE id = ?', [id]);
        res.json({ message: 'Serviço excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;