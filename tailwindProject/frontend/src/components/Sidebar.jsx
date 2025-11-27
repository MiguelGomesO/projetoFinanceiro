import { Link } from 'react-router-dom';

export default function Sidebar(){
    return (
        <aside className='w-64 bg-white shadow-lg p-4 flex flex-col'>
            <h2 className='text-2xl font-bold mb-6'> Menu </h2>

            <nav className="flex flex-col gap-4">
                <Link className="text-gray-700 hover:text-blue-600" to="/dashboard">
                    Dashboard
                </Link>

                <Link className="text-gray-700 hover:text-blue-600" to="/transacoes">
                    Transações
                </Link>

                <Link className="text-gray-700 hover:text-blue-600" to="/categorias">
                    Categorias 
                </Link>

                <Link className='text-gray-700 hover:text-blue-600' to="/relatorios">
                    Relatórios
                </Link>
            </nav>  
        </aside>
    );
}