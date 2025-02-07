import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // Importa o arquivo CSS
import { FaPizzaSlice } from "react-icons/fa"; // Ícone de pizza

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@pizzaria.com" && senha === "q269c131") {
      navigate("/home");
    } else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="page-container">
      {/* Cabeçalho com título e ícone */}
      <header className="header">
        <FaPizzaSlice className="pizza-icon" />
        <h1 className="system-title">Sistema da Pizzaria</h1>
      </header>

      {/* Formulário de Login */}
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <div className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="login-input"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button className="login-button" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
