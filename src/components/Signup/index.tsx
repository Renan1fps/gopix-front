import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CadastroContainer, CadastroForm, ErrorMessage, Input } from "./style";
import toast, { Toaster } from 'react-hot-toast';
import { api } from "../../services/api";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [document, setDocument] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !document || !password || !passwordConfirmation) {
            setError("Preencha todos os campos.");
            return;
        }
        if (password !== passwordConfirmation) {
            toast.error("As Senhas devem ser iguais!");
            return;
        }

        const { status, data } = await api.post<any>('/users', {email, password, document, role: 'ROLE_CUSTOMER'});

        if(status === 201){
            toast.success('Cadastro realizado com sucesso!');
            setTimeout(()=> {
                navigate("/login")
            }, 2000);
        }else{
            toast.error(data.message);
            return;
        }

    };

    return (
        <CadastroContainer>
            <CadastroForm onSubmit={handleCadastro}>
                <h2>Cadastro</h2>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Documento"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <Button type="submit">Cadastrar</Button>
            </CadastroForm>
            <Toaster/>
        </CadastroContainer>
    );
};

export default Signup;
