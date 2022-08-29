/* eslint-disable no-shadow */
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as InitialLoading from '../../redux/state/initial-loading.state'
import InitializationError from './error'
import './initial-loading.style.scss'
import Logo from './logo'

export default ({ children }) => {
  const dispatch = useDispatch()

  const state = useSelector(state => state.initialloading)
  const onMount = useCallback(
    () => dispatch(InitialLoading.loadData()),
    [dispatch],
  )

  const onUnMount = useCallback(
    () => dispatch(InitialLoading.clean()),
    [dispatch],
  )

  useEffect(() => {
    onMount()
    return () => onUnMount()
  }, [onMount, onUnMount])

  if (state.ready) {
    return children
  }

  if (state.errored) {
    return <InitializationError />
  }

  return (
    <div data-component="InitialLoading">
      <div className="content">
        <Logo />
        <h1>{state.message}</h1>
      </div>
    </div>
  )
}
