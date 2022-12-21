import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Config from '../Settings/Config'
import './SuperAdmin.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Users from '../User/Users'
import Roles from '../RoleMaster/Roles'
import Unauthorized from '../Unauthorized/Unauthorized'


function SuperAdmin() {
    const [superAdmin, setSuperAdmin] = useState([]);
    useEffect(()=>{
        axios.get(Config.api + `Users/${sessionStorage.getItem("Id")}`)
             .then( res => {
                setSuperAdmin(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[])
  return (
    <>
        <div>
            <div className='sa-header'>
                <h2 className='welcome-head'>Hey there,<br/> Super Admin {superAdmin.firstName}!</h2>
            </div>
            <div className='sa-body'>
                <hr/>
                <Tabs
                    defaultActiveKey="users"
                    id="fill-tab-example"
                    className="mb-3 myClass"
                    fill
                    >
                    <Tab eventKey="users" title="Users">
                        <Users/>
                    </Tab>
                    <Tab eventKey="roles" title="Roles">
                        <Roles/>
                    </Tab>
                    <Tab eventKey="longer-tab" title="Tasks">
       
                    </Tab>
                    <Tab eventKey="contact" title="Candidates">
        
                    </Tab>
                </Tabs>
            </div>
        </div> 
    </> 
  )
}

export default SuperAdmin