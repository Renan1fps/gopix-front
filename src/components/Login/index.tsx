import { useState } from "react";
import { Button, ErrorMessage, Input, LoginContainer, LoginForm, SignupLink } from "./style";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, status } = await api.post<any>('/users/login', { email, password });
    if (status === 200) {
      localStorage.setItem("token", data.token);
      setError("");
      navigate("/");
    }
    if (status === 403) {
      toast.error(data.message);
      return;
    }
    if (status === 400) {
      toast.error(data.message);
      return;
    }
    else {
      toast.error('Tivemos um problema, tente novamente mais tarde');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
        <SignupLink onClick={() => navigate('/cadastro')}>Ainda não tem uma conta? Cadastre-se</SignupLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;