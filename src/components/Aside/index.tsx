import React from 'react';
import { FaHome, FaPowerOff } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { HiMenu, HiDocumentDuplicate } from 'react-icons/hi';
import { BiCategory } from 'react-icons/bi';
import { MdOutlinePostAdd } from 'react-icons/md';
import { Button, Fade, styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { useHistory } from 'react-router';
import { IAuth, useAuthentication } from '../../contexts/AuthenticationContext';
import SessionsService from '../../services/sessions.service';
import './styles.scss';

const AsideTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    arrow
    placement="right"
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 300 }}
  />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 14,
  },
}));

const Aside = (): React.ReactElement => {
  const { authentication, setAuthentication } = useAuthentication();
  const history = useHistory();

  const handleOptionsPermission = (children: JSX.Element, permission?: 'none' | 'admin'): JSX.Element | string => {
    switch (permission) {
      case 'none':
        if (authentication?.permission === 'none' || authentication?.permission === 'admin') return children;
        return '';
      case 'admin':
        if (authentication?.permission === 'admin') return children;
        return '';
      default:
        return children;
    }
  };

  const handleLogout = (): void => {
    SessionsService.logoutUser();
    setAuthentication({} as IAuth);
  };

  return (
    <aside className="aside">
      <div className="aside__body">
        <HiMenu size={40} color="#4B5EFB" />

        <div className="aside__body__options">
          <AsideTooltip title="Home">
            <Button onClick={() => history.push('/')}>
              <FaHome size={26} color="#4B5EFB" />
            </Button>
          </AsideTooltip>

          <AsideTooltip title="Criar Post">
            <Button onClick={() => history.push('/criar-post')}>
              <MdOutlinePostAdd size={26} color="#4B5EFB" />
            </Button>
          </AsideTooltip>

          <AsideTooltip title="Meus Posts">
            <Button onClick={() => history.push('/meus-posts')}>
              <HiDocumentDuplicate size={26} color="#4B5EFB" />
            </Button>
          </AsideTooltip>

          {handleOptionsPermission(
            <AsideTooltip title="Gerenciar Categorias">
              <Button onClick={() => history.push('/categorias')}>
                <BiCategory size={26} color="#4B5EFB" />
              </Button>
            </AsideTooltip>,
            'admin'
          )}

          <div className="aside__body__options__division" />
          {authentication.isAuthenticated ? (
            <AsideTooltip title="Sair">
              <Button onClick={() => handleLogout()}>
                <FaPowerOff size={22} color="#4B5EFB" />
              </Button>
            </AsideTooltip>
          ) : (
            <AsideTooltip title="Login">
              <Button onClick={() => history.push('/login')}>
                <FiLogIn size={26} color="#4B5EFB" />
              </Button>
            </AsideTooltip>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
