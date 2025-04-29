import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Conta criada! Agora faça o login.');
      setTimeout(() => navigate('/login'), 2000); // redireciona depois de 2s
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="space-y-6 bg-gray-800 p-10 rounded-xl">
        <h2 className="text-2xl font-bold text-white text-center">Cadastro</h2>

        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
          Criar conta
        </button>

        {message && <p className="text-white mt-4">{message}</p>}

        <p className="text-white text-center mt-6">
          Já tem conta? <a href="/login" className="text-green-400 underline">Entrar</a>
        </p>
      </form>
    </div>
  );
}
