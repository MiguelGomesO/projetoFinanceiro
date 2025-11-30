import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Wallet, List, Sun, Moon } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";

export default function MainLayout() {
    const [darkMode, toggleDarkMode] = useDarkMode();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuarioID = usuario?.id;

    return (

        <div className="flex min-h-screen bg-gray-100 oveflow-x-hidden">

            <aside className="w-64 bg-white dark:bg-gray-700 shadow-lg p-6 space-y-5 flex-shink-0">

                <h1 className="text-2xl font-bold text-blue-600">
                    FinanceApp
                </h1>

                <nav className="space-y-4">
                    {[
                        { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
                        { to: "/transacoes", icon: List, label: "Transações" },
                        { to: "/categorias", icon: Wallet, label: "Categorias" }
                    ].map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className="flex items-center gap-3 p-2 rounded-lg font-medium bg-blue-600 dark:bg-blue-500 text-white dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-blue-600"
                        >
                            <Icon size={20} />
                            {label}
                        </NavLink>
                    ))}


            
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

            <main className="flex-1 p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-x-hidden">
                <Outlet context={{ usuarioID, darkMode}} />
            </main>

        </div>
    );
}