import { Card, Title, Grid, Text, Metric, Table, TableRow, TableHead, TableHeaderCell, TableBody, TableCell } from "@tremor/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

const API_URL = "https://projetofinanceirobackend.onrender.com";

export default function Transacoes() {
    const { usuarioID } = useOutletContext();
    const navigate = useNavigate();

    const [transacoes, setTransacoes] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [tipoFiltro, setTipoFiltro] = useState("todos");
    const [categoriaFiltro, setCategoriaFiltro] = useState("todas") || [];

    const transacoesFiltradas = transacoes.filter((transacao) => {
        const passarTipo = tipoFiltro === "todos" || transacao.tipo === tipoFiltro;
        const passarCategoria = categoriaFiltro === "todas" || transacao.categoria === categoriaFiltro;
        return passarTipo && passarCategoria;
    });

    const moeda = (num) => "R$ " + Number(num).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
    const data = (dat) => new Date(dat).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

    useEffect(() => {
        async function fetchTransacoes() {
            if (!usuarioID) return;

            try {
                const res = await fetch(`${API_URL}/transacoes/${usuarioID}`);
                const dados = await res.json();
                setTransacoes(dados)

                const categoriasUnicas = [...new Set(dados.map(t => t.categoria))].map((nome, index) => ({
                    id: index,
                    nome
                }));

                setCategorias(categoriasUnicas);
            } catch (err) {
                console.error("Erro ao buscar transações: ", err);
            }
        }

        fetchTransacoes();
    }, [usuarioID]);

    return (
        <div className="space-y-6 p-2 sm:p-4 max-w-full">

            <Title className="text-xl sm:text-2xl text-gray-900 dark:text-gray-100">Transações</Title>

            <Grid className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-3">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="p-4 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg shadow-md">
                        <Text className="text-gray-700 dark:text-gray-300 mb-2 font-serif">Tipo de Transação</Text>
                        <select
                            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                            value={tipoFiltro}
                            onChange={(e) => setTipoFiltro(e.target.value)}
                        >
                            <option value="todos">Todos</option>
                            <option value="entrada">Entradas</option>
                            <option value="saida">Saídas</option>
                        </select>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="p-4 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg shadow-md">
                        <Text className="mb-2 text-gray-700 dark:text-gray-100 font-serif">Categoria</Text>
                        <select
                            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                            value={categoriaFiltro}
                            onChange={(e) => setCategoriaFiltro(e.target.value)}
                        >
                            <option value="todas">Todas as categorias</option>
                            {categorias.map((c) => (
                                <option key={c.id} value={c.nome}>{c.nome}</option>
                            ))}
                        </select>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="p-4 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg shadow-md">
                        <Text className="md-2 mb-2 text-gray-700 dark:text-gray-100 font-serif">Adicionar Nova Transação</Text>
                        <button
                            onClick={() => navigate("/transacoes/nova")}
                            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition"
                        >
                            <PlusCircle />
                        </button>
                    </Card>
                </motion.div>
            </Grid>

            <Card className="rounded-xl shadow-lg overflow-hidden dark:bg-gray-900">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                <th className="py-3 px-4 text-left font-semibold">Tipo</th>
                                <th className="py-3 px-4 text-left font-semibold">Categoria</th>
                                <th className="py-3 px-4 text-left font-semibold">Valor</th>
                                <th className="py-3 px-4 text-left font-semibold">Data</th>
                                <th className="py-3 px-4 text-right font-semibold">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transacoesFiltradas.map((t) => (
                                <tr
                                    key={t.id}
                                    className="border-b last:border-0 dark:border-gray-800 
                                   hover:bg-gray-100/70 dark:hover:bg-gray-800/50
                                   transition-colors cursor-pointer"
                                >
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-2 py-1 rounded-md text-xs font-bold 
                                ${t.tipo === "entrada"
                                                    ? "bg-green-200 text-green-800 dark:bg-green-700/40 dark:text-green-300"
                                                    : "bg-red-200 text-red-800 dark:bg-red-700/40 dark:text-red-300"
                                                }`}
                                        >
                                            {t.tipo}
                                        </span>
                                    </td>

                                    <td className="py-3 px-4 text-gray-800 dark:text-gray-300">
                                        {t.categoria}
                                    </td>

                                    <td className="py-3 px-4 font-semibold text-gray-900 dark:text-gray-200">
                                        {moeda(t.valor)}
                                    </td>

                                    <td className="py-3 px-4 text-gray-700 dark:text-gray-400">
                                        {data(t.data)}
                                    </td>

                                    <td className="py-3 px-4 text-right">
                                        <button
                                            onClick={() => navigate(`/transacoes/editar/${t.id}`)}
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}