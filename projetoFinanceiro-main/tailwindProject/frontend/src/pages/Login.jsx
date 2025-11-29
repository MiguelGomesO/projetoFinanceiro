import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://projetofinanceirobackend.onrender.com";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");

    async function handleLogin() {
        setErro("");

        if (!email || !password) {
            setErro("Preencha todos os campos!");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setErro(data.msg || "Erro ao logar");
                return;
            }

            // Armazena os dados do usuário no localStorage (sem JWT)
            localStorage.setItem("usuario", JSON.stringify({
                id: data.id,
                nome: data.nome,
                darkMode: data.darkMode
            }));

            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setErro("Erro de conexão com o servidor");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Login</h1>

                {erro && <p className="text-red-600 mb-4">{erro}</p>}

                <div className="flex flex-col">
                    <label className="text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        autoComplete="on"
                        className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 dark:text-gray-300">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="*********"
                        className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg cursor-pointer"
                >
                    Entrar
                </button>

                <p className="text-center text-gray-600">
                    Não tem conta?{" "}
                    <span
                        onClick={() => navigate("/cadastro")}
                        className="text-blue-600 cursor-pointer hover:underline"
                    >
                        Cadastra-se
                    </span> 
                </p>
            </div>
        </div>
    );
}
