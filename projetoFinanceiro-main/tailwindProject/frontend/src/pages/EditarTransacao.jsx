import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useTheme from "../hooks/useTheme";

export default function EditarTransacao() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [transacao, setTransacao] = useState(null);

    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem("transacoes")) || [];
        const encontrada = dados.find((t) => t.id === Number(id));
        setTransacao(encontrada);
    }, [id]);

    if (!transacao) return <p className="text-gray-700 dark:text-gray-300">Carregando...</p>;

    function salvaAlteracoes() {
        const dados = JSON.parse(localStorage.getItem("transacoes")) || [];

        const novos = dados.map((t) =>
            t.id === Number(id) ? transacao : t
        );

        localStorage.setItem("transacoes", JSON.stringify(novos));

        navigate("/transacoes");
    }

    function excluirTransacao() {
        const dados = JSON.parse(localStorage.getItem("transacoes")) || [];

        const novos = dados.filter((t) => t.id !== Number(id));

        localStorage.setItem("transacoes", JSON.stringify(novos));

        navigate("/transacoes");
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Editar Transação</h1>

            <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <label className="block">
                    <span className="text-gray-700 dark:text-gray-300">Tipo</span>
                    <select
                        className="mt-1 p-2 border rounded-lg w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        value={transacao.tipo}
                        onChange={(e) =>
                            setTransacao({ ...transacao, tipo: e.target.value })
                        }
                    >
                        <option value="entrada"> Entrada</option>
                        <option value="saida"> Saída</option>
                    </select>
                </label>

                <label className="block">
                    <span className="text-gray-700 dark:text-gray-300">Categoria</span>
                    <input
                        type="text"
                        className="mt-1 p-2 border rounded-xl w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        value={transacao.categoria}
                        onChange={(e) =>
                            setTransacao({ ...transacao, categoria: e.target.value })
                        }
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700 dark:text-gray-300">Valor</span>
                    <input
                        type="number"
                        className="mt-1 p-2 border rounded-xl w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        value={transacao.valor}
                        onChange={(e) =>
                            setTransacao({ ...transacao, valor: Number(e.target.value) })
                        }
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700 dark:text-gray-300">Data</span>
                    <input
                        type="date"
                        className="mt-1 p-2 border rounded-xl w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        value={transacao.data}
                        onChange={(e) =>
                            setTransacao({ ...transacao, data: e.target.value })
                        }
                    />
                </label>

                <div className="flex gap-4">
                    <button
                        onClick={salvaAlteracoes}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 cursor-pointer"
                    >
                        Salvar
                    </button>

                    <button
                        onClick={excluirTransacao}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 cursor-pointer"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}