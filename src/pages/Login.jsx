import "../dist/scss/pages/login.scss";

// Componentes de terceiros
import TextField from "@mui/material/TextField";

const Login = () => {
  return (
    <>
      <div className="container-login">
        <div className="content-form">
          <div className="container-title">
            <span className="title">Unites</span>
            <p className="description">Faça login para acessar a ferramenta</p>
          </div>
          <div className="container-inputs">
            <TextField label="Usuário" variant="standard" />
            <TextField label="Senha" variant="standard" />
            <span className="btn-newuser">Cadastre-se</span>
          </div>
          <button type="submit" className="btn-submit">
            Entrar
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
