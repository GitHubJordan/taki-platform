import { useState } from "react";
import { register, RegisterData } from "../../services/auth";

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterData>({
    telefone: "",
    email: "",
    password: "",
    confirm: "",
    tipo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await register(form);
      window.location.href = "/login";
    } catch (err) {
      setError("Erro ao registrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="form-register shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-gray-100 mb-4">Registrar</h1>
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />
        <input
          type="password"
          name="confirm"
          placeholder="Confirme a senha"
          value={form.confirm}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        />
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="passageiro">Passageiro</option>
          <option value="motorista">Motorista</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}
