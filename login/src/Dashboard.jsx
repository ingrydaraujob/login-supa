import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/login');
      } else {
        setUser(data.user);
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#111827] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-[#94A3B8] text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#111827] text-white">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header com efeito de vidro */}
        <header className="bg-[#1E293B]/80 backdrop-blur-md rounded-2xl shadow-lg border border-[#334155]/50 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <p className="text-[#94A3B8]">
                Bem-vindo, <span className="text-white font-medium">{user.email}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl text-white font-medium shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transform hover:translate-y-[-1px] transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sair</span>
              </span>
            </button>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="space-y-8">
          {/* Cartões de informação */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Bem-vindo",
                icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                content: "Este é seu painel de controle pessoal",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Status",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                content: "Sua conta está ativa e verificada",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                title: "Segurança",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                content: "Autenticação via Supabase",
                gradient: "from-purple-500 to-indigo-500"
              }
            ].map((card, index) => (
              <div 
                key={index} 
                className="bg-[#1E293B]/80 backdrop-blur-md rounded-2xl shadow-lg border border-[#334155]/50 p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${card.gradient} rounded-lg flex items-center justify-center shadow-lg mr-3 group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon} />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold">{card.title}</h2>
                </div>
                <p className="text-[#94A3B8]">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Painel principal */}
          <div className="bg-[#1E293B]/80 backdrop-blur-md rounded-2xl shadow-lg border border-[#334155]/50 p-8">
            <h2 className="text-2xl font-bold mb-6">Painel de Controle</h2>
            
            <div className="bg-[#111827]/50 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] border border-[#334155]/30">
              <div className="text-center max-w-md">
                <svg className="w-16 h-16 text-blue-500/70 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-xl font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Seu espaço personalizado
                </h3>
                <p className="text-[#94A3B8] mb-6">
                  Este dashboard foi criado especialmente para você. Aqui você pode gerenciar suas informações e acessar recursos exclusivos.
                </p>
                <div className="inline-flex bg-[#1E293B] rounded-lg p-1 text-sm text-[#94A3B8]">
                  <span className="px-3 py-1">Usuário: {user.email}</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-[#94A3B8] text-sm">
          <p>© 2025 • Todos os direitos reservados</p>
        </footer>
      </div>
    </div>
  );
}
