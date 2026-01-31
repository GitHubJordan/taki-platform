import { useState } from "react";
import { login } from "../../services/auth";
import logo from "../../media/logo.jpeg";

interface LoginFormProps {
  onLogin?: (user: any) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token } = await login({ email, password });
      console.log("Token recebido:", token);
      onLogin?.(token);
      window.location.href = "/profile";
    } catch {
      setError("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-login shadow-lg rounded-xl p-8 w-full max-w-sm space-y-4"
    >
      <div className="mb-8 flex flex-col items-center">
        <img src={logo} alt="TAKI Logo" className="logo h-24" />
        <p className="text-text-100 text-gray-100 text-center mt-4 text-lg">O seu destino é importante</p>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-100">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-90 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-90 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <div className="text-center mt-4">
        <span className="text-gray-600">Não tem conta?</span>{" "}
        <a
          href="/register"
          className="text-blue-600 hover:underline font-semibold"
        >
          Cadastre-se
        </a>
      </div>
    </form>
  );
}
