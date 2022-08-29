import React from 'react'
import Layout from '../layout'
import './actions.style.scss'

export default ({ match }) => {
  // eslint-disable-next-line no-console
  const lotId = match.params.id

  return (
    <Layout match={match}>
      <div data-component="timeline" className="columns is-multiline">
        Actions du lot: {lotId}
      </div>
    </Layout>
  )
}
