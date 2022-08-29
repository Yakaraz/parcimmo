import { identity } from 'ramda'
import Store from '../../redux/store'

describe('Redux :: Store', () => {
  it('merge the store middleware', () => {
    const store = Store('test', undefined, identity)
    expect(store.getState()).toBe('test')

    store.dispatch({ type: 'void' })

    expect(store.getState()).toBe('test')
  })
})
