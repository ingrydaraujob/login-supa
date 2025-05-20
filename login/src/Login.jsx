import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem('');
    setCarregando(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setCarregando(false);

    if (error) {
      setMensagem(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#111827] flex items-center justify-center p-4">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Card principal com efeito de vidro */}
        <div className="bg-[#1E293B]/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
          <form onSubmit={handleLogin} className="p-8">
            {/* Cabeçalho */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Bem-vindo de volta
              </h1>
              <p className="mt-2 text-[#94A3B8]">Faça login na sua conta</p>
            </div>

            {/* Campos do formulário */}
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1E293B]/80 border border-[#334155] rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 text-white placeholder-[#94A3B8]/70"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#94A3B8] mb-2">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1E293B]/80 border border-[#334155] rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all duration-300 text-white placeholder-[#94A3B8]/70"
                  required
                />
              </div>
            </div>

            {/* Divisor */}
            <div className="my-6 border-t border-[#334155]"></div>

            {/* Botão de login */}
            <button 
              type="submit" 
              disabled={carregando}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-medium text-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transform hover:translate-y-[-1px] transition-all duration-300"
            >
              {carregando ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Entrando...</span>
                </span>
              ) : (
                <span>Entrar</span>
              )}
            </button>

            {/* Mensagem de erro */}
            {mensagem && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200 text-sm">
                {mensagem}
              </div>
            )}

            {/* Link para cadastro */}
            <div className="mt-6 text-center text-sm text-[#94A3B8]">
              Não tem uma conta?{' '}
              <a 
                href="/register" 
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors border-b border-blue-400/30 hover:border-blue-400 pb-0.5"
              >
                Cadastre-se agora
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}