export default function Header(){
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Financeiro</h1>

            <div className="text-gray-600">
                Usuário Logado
            </div>
        </header>
    );
}