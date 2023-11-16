import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaBlog } from 'react-icons/fa';
import Text from '../../../components/Text';
import Section from '../../../components/Section';
import SessionsService from '../../../services/sessions.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import { useAuthentication } from '../../../contexts/AuthenticationContext';
import Input from '../../../components/Input';
import { useLoader } from '../../../contexts/LoaderContext';
import './styles.scss';

interface ILogin {
  email: string;
  password: string;
}

const Login: React.FunctionComponent = (): React.ReactElement => {
  const [loginForm, setLoginForm] = useState<ILogin>({ email: '', password: '' });
  const { setAuthentication } = useAuthentication();

  const { renderLoader } = useLoader();

  const handleSubmit = async (event: React.FormEvent, values: ILogin): Promise<void> => {
    event.preventDefault();
    renderLoader('show');
    const { email, password } = values;

    await SessionsService.loginUser(email, password)
      .then((decoded) => {
        const authorization = decoded.auth;

        setAuthentication({ isAuthenticated: true, permission: authorization });
        toastMsg(ToastType.Success, 'Logado com sucesso!');
      })
      .catch((error) => {
        if (error?.response?.data?.message === 'INVALID_CREDENTIALS')
          toastMsg(ToastType.Error, 'Email ou senha inválidos');
        else toastMsg(ToastType.Error, 'Ocorreu algum problema, tente novamente mais tarde');
      })
      .finally(() => {
        renderLoader('hide');
      });
  };

  return (
    <Section
      className="p-0 login d-flex justify-content-center align-items-center"
      title="Login"
      description="Faça seu login"
    >
      <div className="login__box">
        <Row className="mb-5 ">
          <Col md={12} className="d-flex flex-column justify-content-center align-items-center">
            <FaBlog size={40} color="#4b5efb" className="mb-4" />
            <Text as="h1" size="2rem" weight={800} color="#E0E5E9">
              Login
            </Text>
            <Text as="small" size="1.125rem" weight={300} color="#E0E5E9">
              Conecte-se à sua conta
            </Text>
            <Text as="small" size="1.125rem" weight={300} color="#E0E5E9">
              Não tem uma conta?{' '}
              <Link to="/cadastro" className="login__signup">
                Cadastre-se
              </Link>
            </Text>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <form onSubmit={(e) => handleSubmit(e, loginForm)} autoComplete="off">
              <Input
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                type="email"
                label="Email"
                fullWidth
                required
                sx={{ marginBottom: 6 }}
              />
              <Input
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                type="password"
                label="Senha"
                fullWidth
                required
              />
              <Button type="submit" variant="contained" fullWidth className="mt-5 login__box__submitBtn">
                Login
              </Button>
            </form>
          </Col>
        </Row>
      </div>
    </Section>
  );
};

export default Login;
