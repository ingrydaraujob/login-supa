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
    <div className="min-h-screen w-full bg-gradient-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo com animação */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="w-full max-w-md mx-auto relative z-10 animate-scale-in">
        {/* Card principal com efeito de vidro */}
        <div className="card-glass shadow-2xl overflow-hidden border border-blue-500/20">
          <form onSubmit={handleLogin} className="p-8 sm:p-10">
            {/* Cabeçalho com ícone */}
            <div className="text-center mb-8 stagger-child stagger-1">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2">
                Bem-vindo de volta
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base">Acesse sua conta para continuar</p>
            </div>

            {/* Campos do formulário */}
            <div className="space-y-5 stagger-child stagger-2">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-300 mb-2.5">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    E-mail
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-neutral-800/80 outline-none transition-all duration-300 text-white placeholder-neutral-500 font-medium"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-neutral-300 mb-2.5">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Senha
                  </span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:bg-neutral-800/80 outline-none transition-all duration-300 text-white placeholder-neutral-500 font-medium"
                  required
                />
              </div>
            </div>

            {/* Divisor */}
            <div className="my-6 border-t border-neutral-700/50"></div>

            {/* Botão de login */}
            <button 
              type="submit" 
              disabled={carregando}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg text-white font-bold text-base shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:translate-y-[-2px] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none stagger-child stagger-3"
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
                <span className="flex items-center justify-center gap-2">
                  <span>Entrar</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>

            {/* Mensagem de erro com animação */}
            {mensagem && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200 text-sm animate-fade-in flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{mensagem}</span>
              </div>
            )}

            {/* Link para cadastro */}
            <div className="mt-6 text-center text-sm text-neutral-400 stagger-child stagger-4">
              Não tem uma conta?{' '}
              <a 
                href="/register" 
                className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all border-b border-blue-400/30 hover:border-blue-400/70 pb-0.5 relative"
              >
                Cadastre-se agora
              </a>
            </div>
          </form>
        </div>

        {/* Informação adicional */}
        <p className="text-center text-neutral-500 text-xs mt-6 animate-fade-in">
          Sua segurança é importante. Use uma senha forte.
        </p>
      </div>
    </div>
  );
}