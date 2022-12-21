import axios from 'axios';
import React, { useEffect,useRef, useState } from 'react'
import cglogo from '../../images/cg-logo.png'
import Config from '../Settings/Config';


function TaskDetails() {
    const [taskname, settaskname] = useState('');
    const [description, setdescription] = useState('');
    const [deadline, setdeadline] = useState();
    const fileInput = useRef(null);
    const [file, setFile] = useState(null);
  
    
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
    const handlesubmit = (e) => {
        e.preventDefault()
        const payload = {
            TaskName: taskname,
            Deadline: deadline,
            CreatedBy: parseInt(sessionStorage.getItem('Id')),
            Description: description,
            TaskStatus: false,
            DocumentName: file.name
        }
        const formData = new FormData();
        formData.append("file", file);

        axios.post(Config.api+"Tasks/SaveFile",formData,{headers:{ 'Content-Type': 'multipart/form-data'}})
            .then(res => {
                axios.post(Config.api + 'Tasks', payload)
            .then(response =>{alert("task successfully created")
            window.location.href='/tasklist'})
            
               .catch(error => alert(error));})
            .catch(err => alert(err))

            
           
    }
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    return (
        <div className="card login-card mx-auto">
            <form className='login-form' onSubmit={handlesubmit}>
                <div className='login-body'>
                    <h3 className='login-head'>
                        <img src={cglogo} className="cg-logo mb-4" alt="Cg-Logo" />Task
                    </h3>
                    <div className="mb-3">
                        <label className="form-label login-label">Task Name : </label>
                        <input type="text" className="form-control" id="TaskName"
                            placeholder='Enter Task Name' onChange={e => { settaskname(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <div className="mb-3">
                            <label className="form-label login-label">Description : </label>
                            <textarea name="comment" type="text"
                                rows="5" cols="70" id="description" onChange={e => { setdescription(e.target.value) }} className='form-control' placeholder='Enter Description'>
                            </textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label login-label">Deadline : </label>
                            <input type="date" className="form-control" id="deadline" min={disableDates()}
                                onChange={e => { setdeadline(e.target.value) }} placeholder='Enter Deadline' />
                        </div>
                        <div className="mb-3">
                <label className="form-label login-label">Upload File</label>
                <div className='d-flex flex-row'>
                <input type="file" className="form-control"  ref={fileInput}
                 placeholder='Choose File'  onChange={handleFileChange}  />
                 </div>
            </div>

                    </div>
                    <center>
                        <button type="submit" className="login-btn mt-3">Submit</button>
                    </center>
                </div>
            </form>
        </div>
    )
}

export default TaskDetails