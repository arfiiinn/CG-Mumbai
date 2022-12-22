import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import Config from '../Settings/Config';
import './Tasks.css'
import ReadmoreReadless from './ReadmoreReadless';
import Auth401 from "../../images/computer.png"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Unauthorized from '../Unauthorized/Unauthorized';

function TaskList(props) {
  const [tasklist, settasklist] = useState([]);
  const [taskname, settaskname] = useState('');
  const [taskstatus, settaskstatus] = useState();
  const [description, setdescription] = useState('');
  const [deadline, setdeadline] = useState();
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [assignmodal, setAssignmodal] = React.useState(false);
  const [documentname, setdocumentname] = useState();
  const [isfileselected, setisfileselected] = useState(false);
  const [taskid, settaskid] = useState();
  const [doj, setdoj] = useState();
  const [domain, setdomain] = useState();
  const [tid, settid] = useState();
  const [d, setd] = useState([]);
  const filedownload = (filename) => {
    axios.get(Config.api + `Tasks/DownloadFile?NameFile=${filename}`)
      .then(response => { console.log(response.request.responseURL); window.location.assign(response.request.responseURL); })
      .catch(err => alert(err))
  }
  const disableDates = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate();
    if (dd < 10) {
      dd = '0' + dd
    }
    mm = today.getMonth() + 1;
    if (mm < 10) {
      mm = '0' + mm
    }
    yyyy = today.getUTCFullYear();
    return yyyy + "-" + mm + "-" + dd;
  }
  const status = (s) => {
    let st;
    if (s == true) {
      st = "assigned";
    }
    else {
      st = "UnAssigned";
    }
    return st;
  }
  function setCorrectFormat(date) {
    var now = new Date(date);
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
      month = "0" + month;
    if (day < 10)
      day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    return today
  }
  const [show, setShow] = useState(false);
  const [Id, setId] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setId(id)
  }
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setisfileselected(true);
    console.log(isfileselected)
  }
  const handleassign = (e) => {
    e.preventDefault();
    const t = {
      domain: domain,
      date: doj,
      taskId: tid
    }
    console.log(t)
    axios.post(Config.api + `TaskAssigneds/all?domain=${t.domain}&date=${t.date}&taskid=${t.taskId}`)
      .then(res => { alert(res.data); window.location.reload() })
      .catch(err => alert(err))

  }
  const handleupdate = (e) => {
    e.preventDefault()
    const payload = {
      TaskId: taskid,
      TaskName: taskname,
      Deadline: deadline,
      CreatedBy: parseInt(sessionStorage.getItem('Id')),
      Description: description,
      TaskStatus: taskstatus,
      DocumentName: isfileselected ? file.name : documentname
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(isfileselected)
    if (isfileselected == true) {
      axios.post(Config.api + "Tasks/SaveFile", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          axios.put(Config.api + `Tasks/${taskid}`, payload)
            .then(response => { alert("task successfully updated"); window.location.reload(); })
            .catch(error => alert(error));
        })
        .catch(err => alert(err))
    }
    else {
      axios.put(Config.api + `Tasks/${taskid}`, payload)
        .then(response => { alert("task successfully updated"); window.location.reload(); })

        .catch(error => alert(error))
    }
  }
  useEffect(() => {
    axios.get(Config.api + 'Tasks')
      .then(res => settasklist(res.data))
      .catch(err => alert(err))

    axios.get(Config.api + 'Domains')
      .then(res => setd(res.data))
      .catch(err => alert(err))
  }, [])

  const handledelete = (id) => {
    axios.delete(Config.api + `Tasks/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    window.location.reload();
  }
  return (
    <>
      {Config.isUserLoggedin ?

        <div className='container mt-5 mb-5'>
          <div className='flex'>
            <div className="row">
              {tasklist.map(t =>
                <div className="col-md-6" key={t.taskId}>
                  <div className="card mb-4">
                    <h5 className="card-header">{t.taskName}</h5>
                    <div className="card-body p-4">
                      <p className="card-text desc">

                        {
                          t.description.length > 25 ?
                            <ReadmoreReadless limit={25}>
                              {t.description}
                            </ReadmoreReadless>
                            : <>{t.description}</>

                        }
                      </p>
                      <b>Document :</b> &nbsp;<a className='doc-link'
                        onClick={() => filedownload(t.documentName)}>{t.documentName}</a>
                      <h6><b>Deadline :</b> {new Date(t.deadline).toDateString()}</h6>
                      <div className='row'>
                        <div className='col-md-10'>
                          <button className="btn task-submit mt-2" onClick={() => {
                            setAssignmodal(t.taskId); settid(t.taskId);
                          }} disabled={t.taskStatus}><i class="fa fa-tasks"></i>
                            &nbsp;
                            {status(t.taskStatus)}
                          </button>
                        </div>
                        <div className='col-md-2 d-grid gap-3 d-md-flex justify-content-md-end icons-task fs-4 mt-2'>
                          <a href='#' onClick={() => {
                            setModalShow(t.taskId);
                            settaskname(t.taskName);
                            setdescription(t.description);
                            setdeadline(t.deadline);
                            settaskstatus(t.taskStatus);
                            setdocumentname(t.documentName);
                            settaskid(t.taskId);
                          }}>
                            <i className="far fa-edit skill-icon"></i>
                          </a>

                          <a href="#" onClick={() => handleShow(t.taskId)}>
                            <i className='fa fa-trash skill-delete'></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>





                  {/* Delete Task Modal */}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title> <i className="fa fa-trash-o fa-1x centered" aria-hidden="true" style={{ color: "red" }}></i> Delete Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <center>
                        <p>Do you really want to delete this record? This process cannot be undone.</p>
                      </center>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose} >
                        Close
                      </Button>
                      <Button variant="danger" onClick={() => handledelete(t.taskId)}>
                        Confirm Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>






                  {/* Update Task Modal */}
                  <Modal show={modalShow} onHide={() => setModalShow(false)}
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header style={{ backgroundColor: "#E8EDF9" }} closeButton>
                      <center>   <Modal.Title id="contained-modal-title-vcenter"><i className="far fa-edit skill-icon" style={{ color: "blue" }}></i>&nbsp;Update Task</Modal.Title></center>
                    </Modal.Header>

                    <Modal.Body>
                      <Form className="login-form" onSubmit={handleupdate}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-dark" >Task Name</Form.Label>
                          <Form.Control
                            id=""
                            type="text"
                            placeholder="Enter Task Name"
                            value={taskname}
                            onChange={e => settaskname(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label className="text-dark">Description</Form.Label>
                          <textarea name="comment" type="text"
                            rows="5" cols="70" id="description" value={description}
                            onChange={e => { setdescription(e.target.value) }} className='form-control' placeholder='Enter Description'
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label className="text-dark">Deadline</Form.Label>
                          <Form.Control
                            id=""
                            type="Date"
                            placeholder="Enter Deadline"
                            min={disableDates()}
                            value={setCorrectFormat(deadline)}
                            onChange={e => setdeadline(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label className="text-dark">Document</Form.Label>
                          <Form.Control
                            id=""
                            type="file"
                            ref={fileInput}
                            placeholder='Choose File'
                            onChange={handleFileChange}
                          />
                        </Form.Group>
                        <center>
                          <Button variant="primary" className="submit" type="submit" >
                            Update
                          </Button>
                        </center>
                      </Form>
                    </Modal.Body>
                  </Modal>






                  {/* Assign task modal */}
                  <Modal show={assignmodal} onHide={() => setAssignmodal(false)}
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header style={{ backgroundColor: "#E8EDF9" }} closeButton>
                      <Modal.Title id="contained-modal-title-vcenter"><i class="fa fa-tasks"></i> &nbsp; Assign Task</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <Form className="Assign-form" onSubmit={handleassign}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-dark" >Domain Name</Form.Label>
                          <select className="form-select" onChange={e => setdomain(e.target.value)}>
                            <option defaultValue={""}>Select Domain</option>
                            {d.map(u =>
                              <option value={u.domainId}>{u.domainName}</option>
                            )}
                          </select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label className="text-dark">Date of Joining</Form.Label>
                          <Form.Control
                            id=""
                            type="Date"
                            placeholder="Enter DOJ"
                            max={disableDates()}
                            onChange={e => setdoj(e.target.value)}
                          />
                        </Form.Group>

                        <center>
                          <Button variant="primary" className="submit" type="submit" >
                            Assign
                          </Button>
                        </center>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </div>

              )}
            </div>
          </div>

        </div>
        :
        <Unauthorized />
      } </>
  )
}

export default TaskList;