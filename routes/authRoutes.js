const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const [rows] = await db.execute('SELECT id, nome, email, role FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);
        if (rows.length > 0) {
            return res.json({ success: true, user: rows[0] });
        }
        return res.status(401).json({ success: false, message: 'E-mail ou senha incorretos.' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erro no banco de dados local.' });
    }
});

module.exports = router;