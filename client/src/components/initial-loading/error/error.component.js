import React from 'react'
import { useDispatch } from 'react-redux'
import { reload } from '../../../redux/state/initial-loading.state'
import './error.style.scss'

export default () => {
  const dispatch = useDispatch()

  const onClick = () => dispatch(reload())

  return (
    <div id="initialization-error">
      <div className="wrapper">
        <div className="infoBox">
          <p>
            <span className="highlighted">Une erreur est survenue</span> lors de
            l&apos;installation de l&apos;application.
          </p>
          <br />
          <p>
            Cliquez sur le bouton &ldquo;Recommencer l&apos;installation&rdquo;
            pour{' '}
            <span className="highlighted">
              relancer l&apos;installation des données
            </span>{' '}
            nécessaires au bon fonctionnement de l&apos;application.{' '}
          </p>
          <button type="button" onClick={onClick}>
            recommencer l&apos;installation
          </button>
        </div>
      </div>
    </div>
  )
}
