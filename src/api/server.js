import express from 'express';
import cors from 'cors';
// import OpenAI from "openai";

import pool from './db.js';

const app = express();
app.use(cors());
app.use(express.json({limit: '200mb'}))

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get('/api/getdata', async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT * FROM section_datas');
		res.json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Erro ao acessar o banco' });
	}
});

const PORT = process.env.API_PORT || 4000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));