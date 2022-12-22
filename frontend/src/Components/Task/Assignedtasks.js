import React from 'react'
import './Tasks.css'
import ReadmoreReadless from './ReadmoreReadless';

function Assignedtasks() {
  return (
    <div>
        <div className='container mt-5 mb-5'>
          <div className='flex'>
            <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4">
                    <h5 className="card-header">
                       
                        </h5>
                    <div className="card-body p-4">
                      <p className="card-text desc">

                        {
                        //   t.description.length > 25 ?
                        //     <ReadmoreReadless limit={25}>
                        //       {t.description}
                        //     </ReadmoreReadless>
                        //     : <>{t.description}</>

                        }
                      </p>
                      <b>Document :</b> &nbsp;<a href='#' className="doc-link"></a>
                      <h6><b>Deadline :</b>
                       </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              {/* )} */}
            </div>
          </div>
  )
}

export default Assignedtasks