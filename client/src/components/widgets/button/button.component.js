// Button :: Object -> React.Element
import React from 'react'
import { Link } from 'react-router-dom'
import './button.style.scss'

export default ({ className = '', children, href = '', ...restProps }) =>
  href ? (
    <Link
      to={href}
      data-component="Widget/Button"
      className={`button ${className}`}
      {...restProps}
    >
      {children}
    </Link>
  ) : (
    <button
      type="button"
      data-component="Widget/Button"
      className={`button ${className}`}
      {...restProps}
    >
      {children}
    </button>
  )
