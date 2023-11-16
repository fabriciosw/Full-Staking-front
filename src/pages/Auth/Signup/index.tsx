import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FaBlog } from 'react-icons/fa';
import Text from '../../../components/Text';
import Section from '../../../components/Section';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import Input from '../../../components/Input';
import UsersService from '../../../services/users.service';
import { useLoader } from '../../../contexts/LoaderContext';
import './styles.scss';

interface ISignup {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FunctionComponent = (): React.ReactElement => {
  const [signupForm, setSignupForm] = useState<ISignup>({ name: '', email: '', password: '' });

  const history = useHistory();

  const { renderLoader } = useLoader();

  const handleSubmit = (event: React.FormEvent, values: ISignup): void => {
    event.preventDefault();
    renderLoader('show');
    const { name, email, password } = values;

    UsersService.create(name, email, password)
      .then(() => {
        toastMsg(ToastType.Success, 'Conta criada, faça seu login!');
        history.push('/login');
      })
      .catch((error) => {
        if (error?.response?.data?.message === 'EMAIL_ALREADY_REGISTERED')
          toastMsg(ToastType.Error, 'Já existe uma conta com esse email');
        else toastMsg(ToastType.Error, 'Ocorreu algum problema');
      })
      .finally(() => {
        renderLoader('hide');
      });
  };

  return (
    <Section
      className="p-0 login d-flex justify-content-center align-items-center"
      title="Criar conta"
      description="Crie sua conta"
    >
      <div className="login__box">
        <Row className="mb-5 ">
          <Col md={12} className="d-flex flex-column justify-content-center align-items-center">
            <FaBlog size={40} color="#4b5efb" className="mb-4" />
            <Text as="h1" size="2rem" weight={800} color="#E0E5E9">
              Criar conta
            </Text>
            <Text as="small" size="1.125rem" weight={300} color="#E0E5E9">
              Crie sua conta e tenha acesso ao Blob Blog!
            </Text>
            <Text as="small" size="1.125rem" weight={300} color="#E0E5E9" className="mt-2">
              Já tem uma conta?{' '}
              <Link to="/login" className="login__signup">
                Fazer login
              </Link>
            </Text>
          </Col>
        </Row>
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <Col md={10} className="">
            <form onSubmit={(e) => handleSubmit(e, signupForm)} autoComplete="off">
              <Input
                value={signupForm.name}
                onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                label="Nome"
                fullWidth
                required
                inputProps={{
                  maxLength: 120,
                }}
                sx={{ marginBottom: 3 }}
              />
              <Input
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                type="email"
                label="Email"
                fullWidth
                required
                sx={{ marginBottom: 3 }}
              />
              <Input
                value={signupForm.password}
                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                type="password"
                label="Senha"
                fullWidth
                required
              />
              <Button type="submit" variant="contained" fullWidth className="mt-5 login__box__submitBtn">
                Cadastrar
              </Button>
            </form>
          </Col>
        </Row>
      </div>
    </Section>
  );
};

export default Signup;
