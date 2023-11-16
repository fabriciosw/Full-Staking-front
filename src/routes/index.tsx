import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAuthentication } from '../contexts/AuthenticationContext';
import Loader from '../components/Loader';
import Home from '../pages/Home';
import Error from '../pages/Error';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import SeeOnePost from '../pages/Posts/SeeOne';
import CreatePost from '../pages/Posts/Create';
import ManageCategories from '../pages/Categories/Manage';
import MyPosts from '../pages/Posts/My';

const AppRoutes: React.FunctionComponent = () => {
  const { authentication } = useAuthentication();

  const UserRoute = (children: React.ReactElement): React.ReactElement => {
    if (!authentication.isAuthenticated) return <Redirect to="/login" />;

    return children;
  };

  const AdminRoute = (children: React.ReactElement): React.ReactElement => {
    if (authentication.permission !== 'admin') return <Redirect to="/" />;

    return children;
  };

  return (
    <div className="d-flex">
      <div className="d-flex flex-column p-0 w-100">
        <main>
          <React.Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/login">{authentication.isAuthenticated ? <Redirect exact to="/" /> : <Login />}</Route>
              <Route path="/cadastro">{authentication.isAuthenticated ? <Redirect exact to="/" /> : <Signup />}</Route>

              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/criar-post">{UserRoute(<CreatePost />)}</Route>
              <Route path="/meus-posts">{UserRoute(<MyPosts />)}</Route>

              <Route path="/post/:postId">
                <SeeOnePost />
              </Route>

              <Route path="/categorias">{AdminRoute(<ManageCategories />)}</Route>

              <Route path="*">
                <Error />
              </Route>
            </Switch>
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default AppRoutes;
