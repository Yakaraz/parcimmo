import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as LotDetails from '../../../redux/state/lot-details.state'
import Header from '../header'
import Sidebar from '../sidebar'
import './layout.style.scss'

export default ({ children, match }) => {
  const lotId = match.params.id

  const dispatch = useDispatch()
  const onMount = useCallback(
    () => dispatch(LotDetails.fetch(lotId)),
    [dispatch, lotId],
  )

  const onUnMount = useCallback(() => dispatch(LotDetails.clean()), [dispatch])

  useEffect(() => {
    onMount()
    return () => onUnMount()
  }, [onMount, onUnMount])

  return (
    <div data-component="layout" className="container is-fluid">
      <div className="columns is-variable is-4 is-multiline">
        <div className="column is-one-third">
          <Sidebar />
        </div>

        <div className="column">
          <Header match={match} />
          {children}
        </div>
      </div>
    </div>
  )
}
