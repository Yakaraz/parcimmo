/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as User from '../../redux/state/auth/user.state'
import * as Navbar from '../../redux/state/navbar.state'
import './navbar.style.scss'

export default () => {
  const dispatch = useDispatch()

  const toggleMenu = useCallback(
    () => dispatch(Navbar.toggleMenu()),
    [dispatch],
  )
  const logout = () => dispatch(User.logout())
  const onUnMount = useCallback(() => dispatch(Navbar.clean()), [dispatch])

  const open = useSelector(state => state.navbar.open)

  useEffect(() => {
    return () => onUnMount()
  }, [onUnMount])

  return (
    <nav
      data-component="navbar"
      className="navbar is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="/images/parcimmo-logo64x64-simple.svg" alt="logo" />
        </Link>
        <a
          role="button"
          tabIndex={0}
          className={`navbar-burger burger ${open && 'is-active'}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBurgerable"
          onClick={() => toggleMenu()}
          onKeyDown={() => {}}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div
        id="navbarBurgerable"
        className={`navbar-menu ${open && 'is-active'} `}
      >
        <div className="navbar-start">
          <div className="tabs is-large">
            <ul>
              <li className="is-active">
                <Link className="navbar-item" to="/">
                  Parc immobilier
                </Link>
              </li>
              <li>
                <Link className="navbar-item" to="/visites">
                  Visites
                </Link>
              </li>
              <li>
                <Link className="navbar-item" to="/actions">
                  Actions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                type="button"
                title="Aide"
                className="button nostyle-button"
              >
                <span className="icon info" />
              </button>
              <button
                type="button"
                title="Déconnexion"
                className="button nostyle-button"
                onClick={() => logout()}
              >
                <span className="icon logout" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
