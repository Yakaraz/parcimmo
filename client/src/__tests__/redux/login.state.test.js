import * as Login from '../../redux/state/auth/login.state'

describe('Redux :: state :: auth :: login', () => {
  it('reduces to initial state by default', () => {
    const initialState = Login.default()

    expect(initialState).toEqual(Login.INITIAL_STATE)
  })

  it('reduces SUBMIT action', () => {
    const initialState = Login.default()
    const login = Login.logIn({ email: 'test@foo.bar', password: 'klhjkghj' })
    const state = Login.default(initialState, login)

    expect(state.submitting).toBe(true)
  })

  it('reduces REJECT action', () => {
    const initialState = Login.default()
    const reject = Login.reject()
    const state = Login.default(initialState, reject)

    expect(state.error).toBe(true)
    expect(state.submitting).toBe(false)
  })

  it('reduces GRANT action', () => {
    const initialState = Login.default()
    const grant = Login.grant()
    const state = Login.default(initialState, grant)

    expect(state.submitting).toBe(false)
  })
})
