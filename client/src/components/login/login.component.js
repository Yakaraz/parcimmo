import { pipe, tap } from 'ramda'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login as loginState } from '../../redux/state/auth'
import { isConnected } from '../../utils/roles.utils'
import './login.style.scss'

const LoginForm = ({ submitLogin, isLoading, login }) => (
  <div className="columns">
    <div className="column box is-5">
      <div className="main-title">
        <h2 className="has-text-centered">Parc Immo</h2>
      </div>
      <form id="login" onSubmit={submitLogin}>
        <div className="field">
          <div className="control">
            <input
              id="identifier"
              className={`input is-large ${login.error && 'is-danger'}`}
              type="text"
              placeholder="Identifiant"
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input
              className={`input is-large ${login.error && 'is-danger'}`}
              id="password"
              type="password"
              placeholder="Mot de passe"
            />
          </div>

          {login.error && (
            <p className="form-error help is-danger">
              Mauvais mot de passe / identifiant
            </p>
          )}
        </div>

        <div className="columns is-multiline">
          <div className="field column is-12 has-text-centered">
            <button
              type="submit"
              className={`button is-large is-rounded is-blue  ${
                isLoading ? 'is-loading' : ''
              }`}
            >
              Se connecter
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
)

// Layout :: Props -> React.Component
// eslint-disable-next-line react/prop-types
export default () => {
  const dispatch = useDispatch()

  const state = useSelector(reduxState => ({
    login: reduxState.auth.login,
    user: reduxState.auth.user,
    isLoading:
      reduxState.auth.login.submitting || reduxState.auth.user.fetching,
  }))

  const history = useHistory()

  // si jamais je suis deja connecté alors je repars d'où je viens
  useEffect(() => {
    if (isConnected(state.user)) {
      const { pathname } = history.location
      const { from } = history.location.state
      history.push(from, { from: pathname })
    }
  }, [state.user, history])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const submitLogin = useCallback(
    pipe(
      tap(e => e.preventDefault()),
      e => [
        e.target
          .querySelector('[data-is=login] form#login input#identifier')
          .value.trim(),
        e.target.querySelector(
          '[data-is=login] form#login input[type=password]',
        ).value,
      ],
      ([username, password]) => dispatch(loginState.logIn(username, password)),
    ),
    [dispatch],
  )

  return (
    <section className="section" data-is="login" id="login-component">
      <div className="login-container container is-fluid">
        <div className="columns is-variable is-5 is-vcentered">
          <div className="column is-9-desktop is-offset-3-desktop is-12">
            <LoginForm
              isLoading={state.isLoading}
              login={state.login}
              submitLogin={submitLogin}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
