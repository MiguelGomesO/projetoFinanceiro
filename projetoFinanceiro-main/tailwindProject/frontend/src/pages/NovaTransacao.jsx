import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoriaChips from "../components/CategoriasChips";
import { FiCalendar, FiTag, FiDollarSign, FiArrowUp } from "react-icons/fi";

export default function NovaTransacao() {
    const navigate = useNavigate();

    const hoje = new Date().toISOString().slice(0, 10)
    const [tipo, setTipo] = useState("entrada");
    const [categoria, setCategoria] = useState("");
    const [valor, setValor] = useState("");
    const [data, setData] = useState("");
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const cat = JSON.parse(localStorage.getItem("categorias")) || [];
        setCategorias(cat);
    }, []);

    function salvar(e) {
        e.preventDefault();

        if (!data) {
            alert("Selecione uma data!");
            return;
        }

        if (!categoria) {
            alert("Selecione uma categoria!");
            return;
        }

        if (!valor || Number(valor) <= 0) {
            alert("Digite um valor válido!");
            return;
        }

        const nova = {
            id: Date.now(),
            data,
            categoria,
            tipo,
            valor: Number(valor)
        };

        const existentes = JSON.parse(localStorage.getItem("transacoes")) || []
        const atualizadas = [...existentes, nova];

        localStorage.setItem("transacoes", JSON.stringify(atualizadas));

        navigate("/transacoes");
    };

    return (
        <div className="max-w-full mx-auto">

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Nova Transação</h1>

                <button
                    onClick={() => navigate("/transacoes")}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg font-medium cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                >
                    Voltar
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-2xl space-y-5">
                <div className="flex flex-col gap-1">
                    <label className="font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FiCalendar /> Data
                    </label>
                    <input
                        type="date"
                        className="p-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FiTag /> Categoria
                    </label>
                    <CategoriaChips
                        categorias={categorias}
                        categoriaSelecionada={categoria}
                        setCategoriaSelecionada={setCategoria}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                        <FiArrowUp /> Tipo
                        </label>
                    <select
                        className="p-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                    >
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-semibold flex item-center gap-2 text-gray-700 dark:text-gray-300"> 
                        <FiDollarSign /> Valor
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="Ex: R$ 150,75"
                        required
                    />
                </div>

                <button
                    onClick={salvar}
                    className="w-full py-3 bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-500 mt-4"
                >
                    Salvar Transação
                </button>
            </div>

        </div>
    );
}