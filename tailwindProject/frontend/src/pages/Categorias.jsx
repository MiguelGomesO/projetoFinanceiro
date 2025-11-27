import { useState } from "react";

export default function Categorias() {

    const [categorias, setCategorias] = useState(() => {
        return JSON.parse(localStorage.getItem("categorias")) || []
    });

    const [nome, setNome] = useState("");

    function salvarLocal(dados) {
        localStorage.setItem("categorias", JSON.stringify(dados));
    }

    function adicionarCategoria(){
        if (!nome.trim()) return;

        const nova = {
            id: Date.now(),
            nome
        };

        const novas = [...categorias, nova];
        setCategorias(novas);
        salvarLocal(novas);
        setNome("");
    }

    function excluirCategoria(){
        const novas = categorias.filter((c) => c.id !== id);
        setCategorias(novas);
        salvarLocal(novas);
    }

    return (
        <div className="space-y-6">

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Categorias</h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
                <input
                    type="text"
                    placeholder="Nome da Categoria"
                    className="p-2 border rounde-lg w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <button
                    onClick={adicionarCategoria}
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-500 dark:text-gray-100 border-gray-300 dark:border-gray-600 cursor-pointer"
                >
                    Adicionar
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <table className="w-full">
                    <thead>
                        <tr className="text-left border-b border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                            <th className="py-2">Categoria</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorias.map((c, i) => (
                            <tr key={c.id} className={`border-b last:border-none ${ i % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}`}>
                                <td className="py-2 text-gray-900 dark:text-gray-100">{c.nome}</td>
                                <td>
                                    <button
                                        onClick={() => excluirCategoria(c.id)}
                                        className="text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            
        </div>
    );
}