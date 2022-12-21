import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Config from '../Settings/Config'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Users from '../User/Users'
import Roles from '../RoleMaster/Roles'
import Unauthorized from '../Unauthorized/Unauthorized';


function Admin() {
    const [Admin, setAdmin] = useState([]);
    useEffect(()=>{
        axios.get(Config.api + `Users/${sessionStorage.getItem("Id")}`)
             .then( res => {
                setAdmin(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[])
  return (
    <>
        <div>
            <div className='sa-header'>
                <h2 className='welcome-head'>Hey there,<br/> Admin {Admin.firstName}!</h2>
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

export default Admin