import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Wallet, List, PlusCircle, Sun, Moon } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";

export default function MainLayout() {
    const [darkMode, toggleDarkMode] = useDarkMode();

    return (

        <div className="flex min-h-screen bg-gray-100">

            <aside className="w-64 bg-white dark:bg-gray-700 shadow-lg p-6 space-y-5">

                <h1 className="text-2xl font-bold text-blue-600">
                    FinanceApp
                </h1>

                <nav className="space-y-4">
                    <NavLink
                        to="/dashboard"
                        className="flex items-center gap-3 p-2 rounded-lg font-medium bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-blue-600"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/transacoes"
                        className="flex items-center gap-3 p-2 rounded-lg font-medium bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-blue-600"
                    >
                        <List size={20} />
                        Transações
                    </NavLink>

                    <NavLink
                        to="/transacoes/nova"
                        className="flex items-center gap-3 p-2 rounded-lg font-medium bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-blue-600"
                    >
                        <PlusCircle size={20} />
                        Nova Transação
                    </NavLink>

                    <NavLink
                        to="/categorias"
                        className="flex items-center gap-3 p-2 rounded-lg font-medium bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-blue-600"
                    >
                        <Wallet size={20} />
                        Categorias
                    </NavLink>
                </nav>

                <div className="mt-10">
                    <button
                        onClick={toggleDarkMode}
                        className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 w-full justify-center"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        {darkMode ? "Claro" : "Escuro"}
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8 bg-white dark:bg-gray-800">
                <Outlet context={darkMode}/>
            </main>

        </div>
    );
}
