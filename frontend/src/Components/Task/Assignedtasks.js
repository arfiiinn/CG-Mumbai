import React, { useEffect, useState } from 'react'
import './Tasks.css'

import axios from 'axios';
import Config from '../Settings/Config';
import ReadmoreReadless from './ReadmoreReadless';

function Assignedtasks() {
    const[tasks,settasks]=useState([]);

    const filedownload = (filename) => {
        axios.get(Config.api + `Tasks/DownloadFile?NameFile=${filename}`)
          .then(response => { console.log(response.request.responseURL); window.location.assign(response.request.responseURL); })
          .catch(err => alert(err))
      }
    useEffect(()=>{
        axios.get(Config.api+`TaskAssigneds/User/${sessionStorage.getItem('Id')}`)
        .then(res=>settasks(res.data))
        .catch(err=>console.log(err))
    })
  return (
    <div>
        <div className='container mt-5 mb-5'>
          <div className='flex'>
            <div className="row">
                {tasks.map(t=>
                <div className="col-md-6" key={t.taskAssignedId}>
                  <div className="card mb-4">
                    <h5 className="card-header">
                       {t.tasks.taskName}
                        </h5>
                    <div className="card-body p-4">
                      <p className="card-text desc">

                        {
                          t.tasks.description.length > 25 ?
                            <ReadmoreReadless limit={25}>
                              {t.tasks.description}
                            </ReadmoreReadless>
                            : <>{t.tasks.description}</>

                        }
                      </p>
                      <b>Document : </b> &nbsp;<a href='#' className="doc-link"  onClick={() => filedownload(t.tasks.documentName)}>{t.tasks.documentName}</a><br/>
                      <b>Deadline : </b>{new Date(t.tasks.deadline).toDateString()}
                       <h6><b>Score : </b>{t.scores}</h6>
                        </div>
                      </div>
                    </div>
                )}
                  </div>
                </div>

            </div>
          </div>
  )
}

export default Assignedtasks