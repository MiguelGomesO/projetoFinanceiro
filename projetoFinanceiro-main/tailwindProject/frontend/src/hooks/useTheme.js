import { useEffect, useState } from "react";

export default function useTheme () {
    const [darkMode, setDarkMode] = useState(() => {
        const tema = localStorage.getItem("tema");
        return tema === "dark" ? true : false;
    });

    useEffect(() => {
        if(darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("tema", "dark");            
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("tema", "light");
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode(prev => !prev);

    return [darkMode, toggleTheme];
}