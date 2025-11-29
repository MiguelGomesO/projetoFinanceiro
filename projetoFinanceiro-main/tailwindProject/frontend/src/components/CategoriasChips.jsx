import { motion, scale } from "framer-motion";

const categorias = [
    "Alimentação",
    "Transporte",
    "Salário",
    "Lazer",
    "Casa",
    "Educação",
    "Outros"
];

export default function CategoriaChips({ categoriaSelecionada, setCategoriaSelecionada }) {
    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {categorias.map((cat) => {
                const ativo = categoriaSelecionada === cat;

                return (
                    <motion.button
                        key={cat}
                        whiletap={{ scale: 0.9 }}
                        onClick={() => setCategoriaSelecionada(cat)}
                        className={`
                            px-4 py-2 rounded-full text-sm cursor-pointer border
                            duration-200
                            ${ativo
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                            }    
                        `}
                    >
                        {cat}
                    </motion.button>
                );
            })}
        </div>
    );
}