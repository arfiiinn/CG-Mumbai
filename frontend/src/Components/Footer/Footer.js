import React from 'react'
import './Footer.css'
import FooterLogo from '../../images/footerlogo.png'

function Footer() {
  return (
  <div className="footer-bg">
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 my-3 mt-2">
          <div className="col-md-6 d-flex align-items-center">
            <img src={ FooterLogo} alt="footerlogo" className="footerlogo"/>
          <span className="mb-3 mb-md-0 text-muted">&nbsp; &copy; 2022 &nbsp;iTransform, All rights reserved.</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-muted" href="#"><i className="bi bi-facebook fs-4"></i></a></li>
          <li className="ms-3"><a className="text-muted" href="#"><i className="bi bi-instagram fs-4"></i></a></li>
          <li className="ms-3"><a className="text-muted" href="#"><i className="bi bi-twitter fs-4"></i></a></li>
        </ul>
      </footer>
    </div>
  </div>
  )
}

export default Footer