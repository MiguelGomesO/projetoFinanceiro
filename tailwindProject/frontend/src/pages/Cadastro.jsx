import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [erro, setErro] = useState("");

    async function testeConexao() {
        try {
            const res = await fetch("http://localhost:3001/test");
            const data = await res.json();
            if (res.ok) {
                alert(`Conexão OK! Banco responde em: ${data.now}`);
            } else {
                alert(`Erro no teste de conexão: ${data.msg}`);
            }
        } catch (err) {
            alert("Não foi possível conectar ao backend!");
            console.error(err);
        }
    }

    async function handleCadastro() {

        if (!nome || !email || !password) {
            setErro("Todos os campos devem ser preenchidos");
            return;
        }

        if (password !== confirmarPassword) {
            setErro("As senhas não conferem!");
            return;
        }


        try {
            const res = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setErro(data.msg || "Erro ao cadastrar usuário");
                return;
            }

            alert("Usuário cadastrado com sucesso!");
            navigate("/login");
        } catch (err) {
            console.error(err);
            setErro("Erro ao conectar com o servidor!")
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5">
                <h1 className="text-2xl font-bold text-gray-900">Cadastro</h1>

                {erro && <p className="text-red-500">{erro}</p>}

                <input
                    type="text"
                    placeholder="Nome Completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />

                <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Confirme senha"
                    value={confirmarPassword}
                    onChange={(e) => setConfirmarPassword(e.target.value)}
                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleCadastro}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 cursor-pointer"
                >
                    Cadastrar
                </button>

                <p className="text-center text-gray-600">
                    Já tem conta?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}