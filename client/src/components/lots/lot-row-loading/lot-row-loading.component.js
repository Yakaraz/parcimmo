import React from 'react'

const LotRowLoading = () => (
  <div className="columns is-gapless box is-vcentered is-row is-blinking">
    <div className="column ">
      <p className="loading-placeholder large" />
      <p className="loading-placeholder long" />
      <p className="loading-placeholder" />
    </div>
    <div className="column ">
      <p className="loading-placeholder large" />
      <p className="loading-placeholder" />
    </div>
    <div className="column ">
      <p className="loading-placeholder large" />
      <p className="loading-placeholder" />
      <p className="loading-placeholder" />
    </div>
    <div className="column ">
      <p className="loading-placeholder long large" />
    </div>
    <div className="column ">
      <p className="loading-placeholder large" />
    </div>
    <div className="column ">
      <p className="loading-placeholder long large" />
    </div>
  </div>
)

export default LotRowLoading
