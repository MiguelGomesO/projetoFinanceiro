import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { openDB } from "../database/db.js";

export async function register(req, res) {
    const db = await openDB();
    const { name, email, password} = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await db.run(
        "INSERT INTO usuarios(nome, email, senha)"
        [name, email, hashed]
    );

    return res.json({ message: "Usuário cadastrado!"});
}

export async function login(req, res){
    const db = await openDB();
    const { email, password} = req.body;

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) return res.status(400).json({ error: "Usuário não encontrado"});

    const valid = await bcrypt.compare(password, user.password);

    if(!valid) return res.status(400).json({ error: "Senha incorreta"});

    const token = jwt.sign({ id: user.id}, "segredo123", { expiresIn: "1d"});

    return res.json({ message: "Logado!", token});
}