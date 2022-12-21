import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Config from '../Settings/Config'
import Unauthorized from '../Unauthorized/Unauthorized';
import './Users.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Users() {
    const[Users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [Id, setId] = useState();
    const navigate = useNavigate();

    const getUserId = id => {
      navigate('/User/View',{state:{Id:id}});
    }
    const getUserIdWithUpdate = (id, value) => {
        navigate('/User/View',{state:{Id:id, Value: value}});
    }

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }

    const deleteUser = () => {
        if(Id != sessionStorage.Id){
            console.log(Id,sessionStorage.Id)
            axios.delete(Config.api + `Users/${Id}`)
            .then(res=>{
               alert('User deleted Successfully!');
               window.location.reload();
            })
            .catch(err=> console.log(err))
        }
        else{
            alert('You can\'t delete yourself');
            window.location.reload();
        }
        
    }

    useEffect(()=>{
        axios.get(Config.api + 'Users')
        .then(res =>{
            setUsers(res.data)
        })
        .catch(err=> console.log(err))
    },[])
 
  return (
    <>
    {Config.isUserLoggedin ? 
        <>
        {Users.map( user=>(
        <div className="card mb-2" key={user.userId}>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-5'>
                        <p className="user-body"><b>{user.firstName +" "+ user.lastName}</b></p>
                        <p className="user-body">
                        <a href={"mailto:" + user.corpMail}><i className="add-role fa fa-envelope" aria-hidden="true"></i></a>
                        &nbsp;: {user.corpMail}
                        </p>
                        <p className="user-body">
                            <i className="fa fa-map-marker add-role" aria-hidden="true"></i>
                            &nbsp;: {user.location}
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <i class="fa fa-star text-warning" aria-hidden="true"></i>
                            &nbsp;: {user.grade}
                        </p>
                    </div>
                    <div className='col-2'>
                        <p><i className="fa fa-user" aria-hidden="true"></i> : {user.roles.roleName}</p>
                    </div>
                    <div className='col-5 d-flex justify-content-end'>
                        <div className=''>
                        <button className="btn btn-secondary me-2" onClick={()=>getUserId(user.userId)}> View </button>
                        <button className="btn btn-secondary me-2" onClick={()=>getUserIdWithUpdate(user.userId,false)}> Update </button>
                        <button className="btn btn-danger me-2"  onClick={() => {handleShow(user.userId)}}> Remove </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* DELETE ROLE MODAL */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="fa fa-trash-o fa-1x centered me-2" aria-hidden="true" style={{ color: "red" }}></i> Delete Role
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
            <p>Do you really want to delete this record? This process cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Confirm Delete
          </Button>
          </Modal.Footer>
            </Modal>
        </div>
        ))}
        </> : 
        <>
            <Unauthorized/>
        </>
    }
    </>
  )
}

export default Users