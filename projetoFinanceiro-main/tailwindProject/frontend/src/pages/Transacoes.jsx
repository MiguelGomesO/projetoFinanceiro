import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Transacoes() {

    const navigate = useNavigate();

    const [transacoes, setTransacoes] = useState(() => {
        return JSON.parse(localStorage.getItem("transacoes")) || [];
    });

    const [tipoFiltro, setTipoFiltro] = useState("todos");
    const [categoriaFiltro, setCategoriaFiltro] = useState("todas") || [];

    const transacoesFiltros = transacoes.filter((t) => {
        const passarTipo = tipoFiltro === "todos" || t.tipo === tipoFiltro;
        const passarCategoria = categoriaFiltro === "todas" || t.categoria === categoriaFiltro;

        return passarTipo && passarCategoria;
    });

    const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    
    return (
        <div className="space-y-6 dark:text-gray-100">

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Transações</h1>

            <div className="flex gap-4">
                <select
                    className="p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    value={tipoFiltro}
                    onChange={(e) => setTipoFiltro(e.target.value)}
                >
                    <option value="todos">Todos</option>
                    <option value="entrada">Entradas</option>
                    <option value="saida">Saídas</option>
                </select>

                <select
                    className="p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                    value={categoriaFiltro}
                    onChange={(e) => setCategoriaFiltro(e.target.value)}
                >
                    <option value="todas">Todas as categorias</option>
                    {categorias.map((c) => (
                        <option key={c.id} value={c.nome}>{c.nome}</option>
                    ))}
                </select>


                <button
                    onClick={() => navigate("/transacoes/nova")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-400"
                >
                    Nova transação
                </button>

            </div>



            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <table className="w-full text-left">

                    <thead>
                        <tr className="border-b text-gray-600 dark:text-gray-300">
                            <th className="py-2">Data</th>
                            <th>Categoria</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {transacoesFiltros.map((t) => (
                            <tr key={t.id} className="border-b last:border-none">
                                <td className="py-2">{t.data}</td>
                                <td>{t.categoria}</td>
                                <td className={t.tipo === "entrada" ? "text-green-600" : "text-red-600"}> {t.tipo.charAt(0).toUpperCase() + t.tipo.slice(1)}</td>
                                <td>R$ {t.valor.toFixed(2).replace(".", ",")}</td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/transacoes/editar/${t.id}`)}
                                        className="text-blue-600 hover:underline dark:text-blue-400 cursor-pointer"
                                    >
                                        Editar
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