import React from 'react'
// import cglogo from '../../images/cg-logo.png'
import Config from '../Settings/Config'
import './Header.css'
function Header() {

  function logout() {
    sessionStorage.clear();
    window.location.reload();
    window.location.href='/';
  }

  return (
    <>
    {Config.isUserLoggedin ? 
    <div className='header'>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
    <div className="container">
      <a className="navbar-brand" href="#">iEval</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample07">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Task</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/changepass">Change password</a>
          </li>
          
        </ul>
            <div>
              <button className="btn btn-outline-light logout" onClick={logout}>Logout</button>
            </div>
      </div>
    </div>
  </nav>
  </div>
 : <></> } 
  </>
    
  )
}

export default Header