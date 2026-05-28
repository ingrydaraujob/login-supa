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
      <div className="min-h-screen w-full bg-gradient-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-scale-in">
          <div className="relative w-16 h-16">
            <svg className="absolute inset-0 animate-spin h-16 w-16 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-neutral-400 text-lg font-medium">Carregando seu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-dark text-white">
      {/* Elementos decorativos de fundo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header com efeito de vidro */}
        <header className="card-glass shadow-lg p-6 sm:p-8 mb-8 border border-blue-500/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div className="flex items-center gap-4 stagger-child stagger-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Dashboard
                </h1>
                <p className="text-neutral-400 text-sm mt-1">Bem-vindo ao seu espaço pessoal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 stagger-child stagger-2">
              <div className="hidden sm:flex flex-col items-end">
                <p className="text-neutral-300 text-sm font-medium">
                  {user?.email}
                </p>
                <p className="text-neutral-500 text-xs">Usuário ativo</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg text-white font-semibold text-sm shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transform hover:translate-y-[-2px] transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sair</span>
              </button>
            </div>
          </div>

          {/* Aviso de email em dispositivo móvel */}
          <div className="sm:hidden mt-4 p-3 bg-neutral-800/50 rounded-lg text-xs text-neutral-400">
            Conectado como: <span className="text-neutral-200 font-medium">{user?.email}</span>
          </div>
        </header>

        {/* Seção principal */}
        <main className="space-y-8">
          {/* Cards de estatísticas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Bem-vindo",
                icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                content: "Seu dashboard personalizado está pronto para uso",
                gradient: "from-blue-500 to-cyan-500",
                number: "✓"
              },
              {
                title: "Status",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                content: "Sua conta está ativa e totalmente verificada",
                gradient: "from-green-500 to-emerald-500",
                number: "✓"
              },
              {
                title: "Segurança",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                content: "Autenticação segura via Supabase",
                gradient: "from-purple-500 to-indigo-500",
                number: "✓"
              }
            ].map((card, index) => (
              <div 
                key={index} 
                className="card-glass shadow-lg p-6 sm:p-8 border border-neutral-700/50 hover:border-neutral-600/50 stagger-child"
                style={{animationDelay: `${(index + 1) * 0.1}s`}}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.icon} />
                    </svg>
                  </div>
                  <span className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${card.gradient}`}>
                    {card.number}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">{card.content}</p>
              </div>
            ))}
          </div>

          {/* Painel principal com informações do usuário */}
          <div className="card-glass shadow-lg p-6 sm:p-10 border border-neutral-700/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Seu Espaço</h2>
            </div>
            
            <div className="bg-neutral-900/50 rounded-xl p-6 sm:p-10 flex flex-col items-center justify-center min-h-[300px] border border-neutral-800/50">
              <div className="text-center max-w-md">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mx-auto mb-6">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Seu espaço personalizado
                </h3>
                <p className="text-neutral-400 mb-6 text-sm sm:text-base leading-relaxed">
                  Este dashboard foi criado especialmente para você. Aqui você pode gerenciar suas informações e acessar todos os recursos exclusivos da plataforma.
                </p>
                <div className="inline-flex bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg px-4 py-3 text-sm sm:text-base text-neutral-300">
                  <span className="font-medium">📧 {user?.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cartão de ações rápidas */}
          <div className="card-glass shadow-lg p-6 sm:p-8 border border-neutral-700/50">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
              </svg>
              Ações Rápidas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Perfil", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                { label: "Configurações", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
                { label: "Ajuda", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:border-blue-500/50 hover:bg-neutral-800/80 transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon} />
                  </svg>
                  <span className="text-sm font-medium text-neutral-300 group-hover:text-white">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center text-neutral-500 text-xs sm:text-sm border-t border-neutral-800/50 pt-8">
          <p>© 2025 • Seu App. Todos os direitos reservados • Feito com ❤️</p>
        </footer>
      </div>
    </div>
  );
}
