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
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="relative">
          {/* Efeitos de gradiente para background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-3xl"></div>
          
          {/* Card principal */}
          <form 
            onSubmit={handleLogin} 
            className="relative bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl"
          >
            {/* Cabeçalho */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Bem-vindo de volta
              </h1>
              <p className="mt-2 text-gray-400">Faça login na sua conta</p>
            </div>

            {/* Campos do formulário */}
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-white placeholder-gray-400/70"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-white placeholder-gray-400/70"
                  required
                />
              </div>
            </div>

            {/* Divisor */}
            <div className="my-6 border-t border-gray-700/50"></div>

            {/* Botão de login */}
            <button 
              type="submit" 
              disabled={carregando}
              className={`w-full px-6 py-4 rounded-xl font-medium text-white transition-all ${carregando 
                ? 'bg-blue-700/70 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg hover:shadow-blue-500/20'}`}
            >
              {carregando ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </span>
              ) : 'Entrar'}
            </button>

            {/* Mensagem de erro */}
            {mensagem && (
              <div className="mt-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-200 text-sm">
                {mensagem}
              </div>
            )}

            {/* Link para cadastro */}
            <div className="mt-6 text-center text-sm text-gray-400">
              Não tem uma conta?{' '}
              <a 
                href="/register" 
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
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