import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import LoginScreen from "./components/screens/LoginScreen";
import HomeScreen from "./components/screens/HomeScreen";
import LoadingSpinner from "./components/screens/LoadingSpinner";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simule a verificação de login (substitua pela sua lógica real)
    const checkLogin = async () => {
      // Exemplo: buscar token no localStorage
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomeScreen /> : <LoginScreen />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        {/* Redireciona qualquer rota desconhecida */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
