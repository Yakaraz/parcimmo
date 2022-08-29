import * as User from '../../redux/state//auth/user.state'
import { ANONYMOUS_ROLE, MODERATOR_ROLE, USER_ROLE } from '../../utils/roles.utils'

describe('Redux :: State :: User', () => {
  it('reduces to initial state by default', () => {
    const initialState = User.default()

    expect(initialState).toEqual(User.INITIAL_STATE)
  })

  it('reduces setTokenInfo action', () => {
    const initialState = User.default()
    const decodedToken = {
      id: '007',
      user: 'Jambon',
      roles: [MODERATOR_ROLE, USER_ROLE],
    }
    const state = User.default(initialState, User.setTokenInfo(decodedToken))

    expect(state).toEqual({
      id: '007',
      user: 'Jambon',
      roles: [MODERATOR_ROLE, USER_ROLE],
      fetching: false,
    })
  })
})
