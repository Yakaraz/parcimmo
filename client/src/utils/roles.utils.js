import {
  both,
  compose,
  equals,
  intersection,
  isEmpty,
  not,
  pipe,
  prop,
} from 'ramda'

export const USER_ROLE = 'ROLE_USER'
export const ADMIN_ROLE = 'ROLE_ADMIN'
export const MODERATOR_ROLE = 'ROLE_MODERATOR'
export const ANONYMOUS_ROLE = 'ROLE_ANONYMOUS'

export const everyRoles = [USER_ROLE, ADMIN_ROLE, MODERATOR_ROLE]

// isConnected :: User -> Boolean
// export const isConnected = both(
//   compose(contains(__, everyRoles), prop('roles')),
//   compose(equals(false), prop('fetching')),
// )

export const isConnected = user =>
  both(
    pipe(prop('roles'), intersection(everyRoles), isEmpty, not),
    compose(equals(false), prop('fetching')),
  )(user)

export const isUser = equals(USER_ROLE)
export const isAdmin = equals(ADMIN_ROLE)
