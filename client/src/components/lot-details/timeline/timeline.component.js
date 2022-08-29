import { toLower } from 'ramda'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Timeline from '../../../redux/state/timeline.state'
import { formatDate } from '../../../utils/common.utils'
import Button from '../../widgets/button'
import Layout from '../layout'
import './timeline.style.scss'

export default ({ match }) => {
  // eslint-disable-next-line no-console
  const lotId = match.params.id
  const dispatch = useDispatch()
  const onMount = useCallback(
    () => dispatch(Timeline.fetch(lotId)),
    [dispatch, lotId],
  )

  const onUnMount = useCallback(() => dispatch(Timeline.clean()), [dispatch])

  useEffect(() => {
    onMount()
    return () => onUnMount()
  }, [onMount, onUnMount])

  const { visits, rentabledictionary } = useSelector(rootState => ({
    visits: rootState.timeline.visits,
    rentabledictionary: rootState.initialloading.dictionaries.rentable,
  }))

  return (
    <Layout match={match}>
      <div data-component="timeline" className="columns is-multiline">
        {visits.map(visit => (
          <div key={`visite-${visit.id}`} className="visit column is-12">
            <div className="visit--header">
              <h3>
                {formatDate(visit.createdAt)}
                &nbsp;&nbsp;<span className="dot">.</span>&nbsp;&nbsp;
                <small>
                  par <strong>{visit.author.username}</strong>
                </small>
              </h3>
            </div>
            <div className="visit--body is-flex">
              <div className="box is-flex-grow-3 is-flex-shrink-1">
                <p>Fiche visite</p>
                {visit.rentable && (
                  <p>
                    <small>{`Le bien est relouable ${toLower(
                      rentabledictionary[visit.rentable],
                    )}`}</small>
                  </p>
                )}
              </div>

              <Button
                className="is-flex-grow-1 is-flex-shrink-1"
                href={`/bien/${lotId}/visit/${visit.id}`}
              >
                Voir la fiche
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
