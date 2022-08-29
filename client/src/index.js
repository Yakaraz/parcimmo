import { of } from 'ramda'
import React from 'react'
import ReactDOM from 'react-dom'
import { createEpicMiddleware } from 'redux-observable'
import Cookies from 'universal-cookie'
import history from './router/history'
import App from './components/app'
import rootEpic from './epics'
import mainReducer from './redux/state'
import { enterApp } from './redux/state/auth/login.state'
import Store from './redux/store'
import * as serviceWorker from './serviceWorker'
import './style/main.scss'
import { fetchApiWithErrors } from './utils/http.utils'

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    history,
    fetchApi: (path, options = {}) =>
      fetchApiWithErrors(process.env.REACT_APP_API_URL, path, options),
    cookies: new Cookies(),
  },
})

const store = Store(mainReducer(), of(epicMiddleware), mainReducer)
epicMiddleware.run(rootEpic)

store.dispatch(enterApp())

ReactDOM.render(<App store={store} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
