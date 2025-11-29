import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Transacoes from "./pages/Transacoes";
import Categorias from "./pages/Categorias";
import Relatorios from "./pages/Relatorios";
import NovaTransacao from "./pages/NovaTransacao";
import EditarTransacao from "./pages/EditarTransacao";

import TestRechart from "./pages/TestRechart";

function App() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/cadastro" element={<Cadastro />}/>
                <Route path="/testrecharts" element={<TestRechart />} />
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard usuarioID={usuario?.id} />} />
                    <Route path="/transacoes" element={<Transacoes />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/relatorios" element={<Relatorios />} />
                    <Route path="/transacoes/nova" element={<NovaTransacao />} />
                    <Route path="/transacoes/editar/:id" element={<EditarTransacao />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
