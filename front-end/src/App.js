import { STATE_LOGIN, STATE_SIGNUP } from './components/AuthForm';
import { EmptyLayout, LayoutRoute, MainLayout } from './components/Layout';
import PageSpinner from './components/PageSpinner';
import AuthPage from './pages/AuthPage';
import Landing from './components/Landing/Landing';
import RequireAuth from './components/RequireAuth';
import React from 'react';
import { toast } from 'react-toastify';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage = React.lazy(() => import('./pages/Dashboard/DashboardPage'));
const UserProfilePage = React.lazy(() => import('./pages/User/UserProfilePage'));
const TablePage = React.lazy(() => import('./pages/Car/TableListingPage'));
const CarProfilePage = React.lazy(() => import('./pages/Car/Profile/CarProfile'));
const AddCar = React.lazy(() => import('./pages/Car/AddCar/AddCar'));
const Garage = React.lazy(() => import('./pages/Garage/Garage'));
const AddEditPaper = React.lazy(() => import('./pages/Papers/AddEdit/AddEditPaper'));

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
          <Route path="/landing" exact component={Landing} />

          <MainLayout breakpoint={this.props.breakpoint}>
            <React.Suspense fallback={<PageSpinner />}>
              <Route path="/" exact component={RequireAuth(DashboardPage, ['user', 'app-admin', 'garage-admin'])} />
              <Route exact path="/tables" component={RequireAuth(TablePage, ['app-admin', 'garage-admin'])} />
              <Route exact path="/user-profile" component={RequireAuth(UserProfilePage, ['user', 'app-admin', 'garage-admin'])} />
              <Route exact path="/add/car" component={RequireAuth(AddCar, ['user'])} />
              <Route exact path="/car-profile/:id" component={RequireAuth(CarProfilePage, ['user', 'app-admin', 'garage-admin'])} />
              <Route exact path="/garages" component={RequireAuth(Garage, ['user', 'app-admin', 'garage-admin'])} />
              <Route exact path="/add/car/:id/paper" component={RequireAuth(AddEditPaper, ['user', 'app-admin', 'garage-admin'])} />
              <Route exact path="/renew/:type/car/:id" component={RequireAuth(AddEditPaper, ['user', 'app-admin', 'garage-admin'])} />
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
