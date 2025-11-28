import { useState } from "react";

const API_URL = "https://projetofinanceirobackend.onrender.com";

export default function LoginTeste() {
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    async function testarBackend() {
        setErro("");
        setMensagem("");

        try {
            const res = await fetch(`${API_URL}/teste`);
            const data = await res.json();

            if (!res.ok) {
                setErro(data.msg || "Erro ao conectar ao backend");
                return;
            }

            setMensagem(data.msg || "Backend funcionando!");
        } catch (err) {
            console.error(err);
            setErro("Erro de conexão com o servidor");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Teste Backend</h1>

                <button
                    onClick={testarBackend}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg cursor-pointer"
                >
                    Testar Conexão
                </button>

                {mensagem && <p className="text-green-600 mt-4">{mensagem}</p>}
                {erro && <p className="text-red-600 mt-4">{erro}</p>}
            </div>
        </div>
    );
}
