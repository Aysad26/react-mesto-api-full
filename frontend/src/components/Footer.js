import React from 'react'

function Footer() {
  const date = new Date()

  return (
    <footer className="footer page__section">
      <p className="footer__copyright">&copy; {date.getFullYear()} Mesto Russia</p>
    </footer>
  )
}

export default Footer