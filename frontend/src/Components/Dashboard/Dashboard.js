import React from 'react'
import Config from '../Settings/Config'
import Admin from '../Admin/Admin'
import SuperAdmin from '../Super Admin/SuperAdmin'
import Candidate from '../Candidate/Candidate'
import Mentor from '../Mentor/Mentor'
import CapabilityTeam from '../CapabilityTeam/CapabilityTeam'
import Unauthorized from '../Unauthorized/Unauthorized'

function Dashboard() {
  if(Config.isUserLoggedin)
  {
    if(Config.Rolename === "Admin"){
    return (
      <Admin/>
    )}
    else if(Config.Rolename === "Super Admin"){
      return (
        <SuperAdmin/>
      )}
    else if(Config.Rolename === "Candidate"){
        return (
          <Candidate/>
        )}
    else if(Config.Rolename === "Mentor"){
      return (
        <Mentor/>
      )}
    else if(Config.Rolename === "Capability Team"){
      return (
        <CapabilityTeam/>
      )}
    else if(Config.Rolename === "Account Team"){
       return (
        <div>
          Account Team
        </div>
      )}
    else{
      return(
        <div>
          <div className='sa-header'>
                  <h2 className='welcome-head'>Hey there,<br/>{sessionStorage.getItem('email')}!</h2>
                  <p>Kindly contact the admin team to get tagged to a role!</p>
              </div>
        </div>
      )
    }
  }
  else {
    return(
      <Unauthorized/>
    )
  }
}

export default Dashboard