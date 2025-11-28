import express from "express";
import pkg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o Neon
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // essencial para Neon
});

// Rotas
app.post("/register", async (req, res) => {
  const { nome, email, password } = req.body;
  if (!nome || !email || !password) return res.status(400).json({ msg: "Campos obrigatórios" });

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO usuarios (nome, email, senha, dark_mode) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, dark_mode",
      [nome, email, hash, false]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") return res.status(400).json({ msg: "Email já cadastrado!" });
    res.status(500).json({ msg: "Erro no cadastro", erro: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ msg: "Campos obrigatórios" });

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    const usuario = result.rows[0];
    if (!usuario) return res.status(401).json({ msg: "Usuário não encontrado" });

    const validePassword = await bcrypt.compare(password, usuario.senha);
    if (!validePassword) return res.status(401).json({ msg: "Senha incorreta!" });

    const { id, nome, email: usuarioEmail, dark_mode } = usuario;
    res.json({ id, nome, email: usuarioEmail, darkMode: dark_mode });
  } catch (err) {
    res.status(500).json({ msg: "Erro no login", erro: err.message });
  }
});

app.patch("/usuarios/:id/darkmode", async (req, res) => {
  const { id } = req.params;
  const { darkMode } = req.body;
  if (darkMode === undefined) return res.status(400).json({ msg: "Valor de dark_mode é obrigatório" });

  try {
    const resultado = await pool.query(
      "UPDATE usuarios SET dark_mode = $1 WHERE id = $2 RETURNING id, nome, email, dark_mode",
      [darkMode, id]
    );
    res.json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: "Erro ao atualizar dark mode", erro: err.message });
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, nome, email, dark_mode FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar usuários", erro: err.message });
  }
});

app.get("/transacoes/:usuarioID", async (req, res) => {
  const { usuarioID } = req.params;
  try {
    const resultado = await pool.query(
      "SELECT * FROM transacoes WHERE usuario_id = $1 ORDER BY data DESC",
      [usuarioID]
    );
    res.json(resultado.rows);
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar transações", erro: err.message });
  }
});

// Porta
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
