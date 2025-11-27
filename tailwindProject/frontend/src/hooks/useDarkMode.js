import { useEffect, useState } from "react";

export default function useDarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const inicial = usuario?.darkMode ?? false
        setDarkMode(inicial);
        document.documentElement.classList.toggle("dark", inicial);
    }, []);

    const toggleDarkMode = async () => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const novo = !darkMode;
        setDarkMode(novo);
        document.documentElement.classList.toggle("dark", novo);

        if (usuario) {
            localStorage.setItem(
                "usuario",
                JSON.stringify({ ...usuario, darkMode: novo })
            );
        }

        await fetch(`http://localhost:3001/usuarios/${usuario.id}/darkmode`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ darkMode: novo })
        });
    };

    return [darkMode, toggleDarkMode];
}