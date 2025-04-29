import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate('/login');
      } else {
        setUser(data.user);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) {
    return <p className="text-white text-center mt-10">Carregando...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl mb-8">Bem-vindo, {user.email}!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded text-xl"
      >
        Sair
      </button>
    </div>
  );
}
