import * as Navbar from '../../redux/state/navbar.state'

describe('Redusx :: State :: Navbar', () => {
  it('reduces to initial state by default', () => {
    const initialState = Navbar.default()

    expect(initialState).toEqual(Navbar.INITIAL_STATE)
  })
  it('reduces toggleMenu action', () => {
    const initialState = Navbar.default()
    const state = Navbar.default(initialState, Navbar.toggleMenu())
    expect(state).toEqual({
      open: true,
    })
    const state_1 = Navbar.default(state, Navbar.toggleMenu())
    expect(state_1).toEqual({
      open: false,
    })
  })
})
