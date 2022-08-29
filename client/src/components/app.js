import React from 'react'
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import history from '../router/history'
import '../style/main.scss'
import { isConnected } from '../utils/roles.utils'
import InitialLoading from './initial-loading'
import Login from './login'
import Actions from './lot-details/actions'
import Informations from './lot-details/informations'
import Timeline from './lot-details/timeline'
import Lots from './lots'
import NavBar from './navbar'

/**
 * Component that will restrict route access
 */
function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(state => state.auth.user)

  return (
    <Route
      {...rest}
      render={props =>
        isConnected(user) ? (
          <InitialLoading>
            <NavBar />
            <Component {...props} />
          </InitialLoading>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

const App = ({ store }) => (
  <ReduxProvider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Lots} />

        <PrivateRoute
          name="Informations"
          path="/bien/:id/informations"
          component={Informations}
        />

        <PrivateRoute
          name="TimeLine"
          path="/bien/:id/timeline"
          component={Timeline}
        />

        <PrivateRoute
          name="Actions"
          path="/bien/:id/actions"
          component={Actions}
        />
      </Switch>
    </Router>
  </ReduxProvider>
)

export default App
