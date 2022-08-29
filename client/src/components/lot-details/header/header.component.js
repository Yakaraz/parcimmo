import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './header.style.scss'

export default () => {
  const id = useSelector(rootState => rootState.lotdetails.id)
  return (
    <div
      data-component="header"
      className="tabs is-toggle is-medium is-fullwidth"
    >
      <ul>
        <li>
          <NavLink activeClassName="active" to={`/bien/${id}/timeline`}>
            Timeline
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={`/bien/${id}/informations`}>
            Informations
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to={`/bien/${id}/actions`}>
            Actions et travaux
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
