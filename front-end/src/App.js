import { STATE_LOGIN, STATE_SIGNUP } from './components/AuthForm';
import { EmptyLayout, LayoutRoute, MainLayout } from './components/Layout';
import PageSpinner from './components/PageSpinner';
import AuthPage from './pages/AuthPage';
import RequireAuth from './components/RequireAuth';
import React from 'react';
import { toast } from 'react-toastify';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import 'react-toastify/dist/ReactToastify.css';


const BadgePage = React.lazy(() => import('./pages/BadgePage'));
const ButtonPage = React.lazy(() => import('./pages/ButtonPage'));
const CardPage = React.lazy(() => import('./pages/CardPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('./pages/DropdownPage'));
const FormPage = React.lazy(() => import('./pages/FormPage'));
const InputGroupPage = React.lazy(() => import('./pages/InputGroupPage'));
const TablePage = React.lazy(() => import('./pages/TablePage'));
const WidgetPage = React.lazy(() => import('./pages/WidgetPage'));

toast.configure();
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <Switch>
          <LayoutRoute
            exact
            path="/login"
            layout={EmptyLayout}
            component={props => (
              <AuthPage {...props} authState={STATE_LOGIN} />
            )}
          />
          <LayoutRoute
            exact
            path="/signup"
            layout={EmptyLayout}
            component={props => (
              <AuthPage {...props} authState={STATE_SIGNUP} />
            )}
          />

          <MainLayout breakpoint={this.props.breakpoint}>
            <React.Suspense fallback={<PageSpinner />}>
              <Route path="/" exact component={RequireAuth(DashboardPage)} />
              <Route path="/buttons" exact component={RequireAuth(ButtonPage)} />
              <Route exact path="/cards" component={RequireAuth(CardPage)} />
              <Route exact path="/widgets" component={RequireAuth(WidgetPage)} />
              <Route exact path="/tables" component={RequireAuth(TablePage)} />
              <Route exact path="/badges" component={RequireAuth(BadgePage)} />
              <Route exact path="/dropdowns" component={RequireAuth(DropdownPage)} />
              <Route exact path="/forms" component={RequireAuth(FormPage)} />
              <Route exact path="/input-groups" component={RequireAuth(InputGroupPage)} />
            </React.Suspense>
          </MainLayout>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
