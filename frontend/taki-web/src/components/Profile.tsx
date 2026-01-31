import { useEffect, useState } from "react";
import { getProfile } from "../services/auth";

import type { UserProfile } from "../services/auth";

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    getProfile().then((profile) => setUser(profile)).catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Meu Perfil</h1>
        <p className="text-gray-950"><b>Email:</b> {user.email}</p>
        <p className="text-gray-950"><b>Tipo:</b> {user.tipo}</p>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
          Sair
        </button>
      </div>
    </div>
  );
}
