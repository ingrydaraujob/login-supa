import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  // Validar email básico
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Validações no frontend
    if (!email || !password || !confirmPassword) {
      setMessage('Por favor, preencha todos os campos');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setMessage('Por favor, insira um email válido');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('A senha deve ter no mínimo 6 caracteres');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        // Tratamento específico de erros
        let errorMessage = error.message;
        
        if (error.message.includes('already registered')) {
          errorMessage = 'Este email já está cadastrado. Tente fazer login!';
        } else if (error.message.includes('invalid') || error.message.includes('not valid')) {
          errorMessage = 'Email inválido. Verifique e tente novamente.';
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'Muitas tentativas. Aguarde alguns minutos.';
        }
        
        setMessage(errorMessage);
        setMessageType('error');
      } else {
        setMessage('✓ Conta criada com sucesso! Verifique seu email e faça login.');
        setMessageType('success');
        setTimeout(() => navigate('/login'), 2500);
      }
    } catch (err) {
      setMessage('Erro ao conectar. Verifique sua conexão.');
      setMessageType('error');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo com animação */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="w-full max-w-md mx-auto relative z-10 animate-scale-in">
        {/* Card principal com efeito de vidro */}
        <div className="card-glass shadow-2xl overflow-hidden border border-purple-500/20">
          <form onSubmit={handleRegister} className="p-8 sm:p-10">
            {/* Cabeçalho com ícone */}
            <div className="text-center mb-8 stagger-child stagger-1">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-2">
                Crie sua conta
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base">Junte-se a nossa comunidade hoje</p>
            </div>

            {/* Mensagem de sucesso ou erro */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg text-sm animate-fade-in flex items-start gap-2 border ${messageType === 'success'
                ? 'bg-green-500/10 border-green-500/30 text-green-200' 
                : 'bg-red-500/10 border-red-500/30 text-red-200'}`}>
                {messageType === 'success' ? (
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{message}</span>
              </div>
            )}

            {/* Campos do formulário */}
            <div className="space-y-5 stagger-child stagger-2">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-300 mb-2.5">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="w-full px-4 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 focus:bg-neutral-800/80 outline-none transition-all duration-300 text-white placeholder-neutral-500 font-medium"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-neutral-300 mb-2.5">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="w-full px-4 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-neutral-800/80 outline-none transition-all duration-300 text-white placeholder-neutral-500 font-medium"
                  required
                />
                <p className="mt-2 text-xs text-neutral-500 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                  </svg>
                  Mínimo de 6 caracteres
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-neutral-300 mb-2.5">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Confirmar Senha
                  </span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-neutral-800/50 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 focus:bg-neutral-800/80 outline-none transition-all duration-300 text-white placeholder-neutral-500 font-medium"
                  required
                />
              </div>
            </div>

            {/* Divisor */}
            <div className="my-6 border-t border-neutral-700/50"></div>

            {/* Botão de registro */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-lg text-white font-bold text-base shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:translate-y-[-2px] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none stagger-child stagger-3"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Criando conta...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Criar conta</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>

            {/* Link para login */}
            <div className="mt-6 text-center text-sm text-neutral-400 stagger-child stagger-4">
              Já tem uma conta?{' '}
              <a 
                href="/login" 
                className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 transition-all border-b border-purple-400/30 hover:border-purple-400/70 pb-0.5 relative"
              >
                Fazer login
              </a>
            </div>
          </form>
        </div>

        {/* Informação adicional */}
        <p className="text-center text-neutral-500 text-xs mt-6 animate-fade-in">
          Seus dados são protegidos e criptografados.
        </p>
      </div>
    </div>
  );
}