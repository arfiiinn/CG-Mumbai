import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../../../Components/Skills/Mentor/ShowSkills.css'
import Config from '../../Settings/Config'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import edit from '../../../images/edit.png'


function ShowSkills() {

  const [Skills, setSkills] = useState([]);
  const [SkillName, setSkillName] = useState({ skillName: "" });  
  const [SkillId, setSkillId] = useState("");
  
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);

  const handleShowDelete = (id) => {
  setDeleteShow(true);
  setSkillId(id);
  } 

  const [updateShow, setUpdateShow] = useState(false);
  const handleUpdateClose = () => 
  {
    setUpdateShow(false);
    window.location.href= '/showskills';
  }
  const handleShowUpdate = (id,skillName) => {
    setUpdateShow(true);
    setSkillId(id);
    setSkillName(skillName);
  }

 
  const handlesearchChange = (e) => {
    setSkillName(e.target.value.toLowerCase());
    if (SkillName.skillName == null) {
      window.location.reload();
    }
  }
 
   
  const handlesearchSubmit = (e) => {
    e.preventDefault();
    axios.get(Config.api + `Skills/Search?SkillName=${SkillName}`)
      .then(response => { setSkills(response.data);})
      .catch(error => console.log(error))
      
  }
  
  const handleChange = (e) => {
    setSkillName({skillName : e.target.value});
    console.log(SkillName.skillName)

  }

  // PUT REQUEST TO UPDATE THE SKILLS
  function updateSkillhandler () {
    axios.put(Config.api + 'Skills/' + SkillId, {SkillId : SkillId, SkillName : SkillName}) 
    .then(response => response.data)
    .then(res => {alert("Updated Successfully")
    window.location.reload();
    })
    .catch(error => alert("Oops! Something went wrong."))
  }

  // DELETE REQUEST TO REMOVE A SKILL
  function deleteSkill() {
    axios.delete(Config.api + 'Skills/' + SkillId)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => {console.log(err); alert(err)})
  }
  
  // POST REQUEST TO ADD THE SKILLS - MENTOR
  const handleSubmitClick =(e) => {
    e.preventDefault();
    const skills = SkillName
    console.log(skills)
      axios.post(Config.api + 'Add/Skills',SkillName)
      .then(res=> {alert(" Skill Added !");
        window.location.href = '/showskills';
      })
      .catch(err=> console.log("Error : " + err));
  }

  //to show recently added skills
  const numDescending = [...Skills].sort((a, b) => b.skillId - a.skillId);  // if b-a > 0 then sort b before a
  console.log(numDescending);

  // GET REQUEST TO DISPLAY ALL THE SKILLS - MENTOR
  useEffect(() => {
        axios.get(Config.api + 'Skills') 
        .then(response => response.data)
        .then(res => setSkills(res))
        .catch(error => console.log(error))
        
    }, [])

  return (
     <div className="d-container ">
      <>
      {/* SHOW ALL SKILLS */}

      <div className="container mt-5 mb-5 ">
          <div className="d-flex justify-content-center">
            <h1 className='skill-label-heading mb-5'>Skills
            <a className='add-skill' onClick={handleShow}>
            <i className="fa fa-plus-circle  ms-3 "></i></a>
            </h1>
            <div className='container w-50 mb-3'>
            <form className="d-flex" role="search" onSubmit={handlesearchSubmit}>
              <input className="form-control me-2" type="search" placeholder="Search" onChange={handlesearchChange} />
              <button className="search-btn" type="submit" >Search</button>
            </form>
          </div>
      </div>
          <div className="row">
              {numDescending.map(skills => (
              <div className="col-lg-3 col-md-3 " key={skills.skillId}>
                <article className="card mb-3 skill-card p-3">
                  <div className="row no-gutters">
                    <div className="col-9">
                        <div className="m-1"> 
                          <p >{skills.skillName}</p>                     
                        </div>
                    </div>
                  <aside className="col-2">
                    <div>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-right mt-1 fs-5">        
                          <a href="#" onClick={() => handleShowUpdate(skills.skillId,skills.skillName) }> 
                            <i className="far fa-edit skill-icon"></i>
                          </a>                    
                          <a href="#">
                            <i className='fa fa-trash skill-delete' onClick={()=> handleShowDelete(skills.skillId) }></i>
                          </a>        
                      </div>
                    </div>
                  </aside>
                </div>
              </article> 
            </div>
        ))}
            </div>
      </div>
    </>

    {/* ADD SKILLS FORM */}

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto">
          <img src={edit} className="mb-2 me-2" alt="Cg-Logo" />
          Skills
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form className='login-form'>
      <div className="form-floating mb-3">
          <input type="text" className="form-control" id="skill"name="skill" placeholder="Add Skill"
           onChange={handleChange} />
          <label className="form-label">Enter Skill</label>
        </div>
      </form>
      </Modal.Body>
      <Modal.Footer>   
      <Button className="login-btn mt-3 text-center some" onClick={handleSubmitClick}>
          Add
      </Button>
      </Modal.Footer>
    </Modal>

    {/* UPDATE SKILLS FORM */}

    <Modal show={updateShow} onHide={handleUpdateClose}>
      <Modal.Header closeButton>
        <Modal.Title className="ms-auto">
          <img src={edit} className="mb-2 me-2" alt="Cg-Logo" />
          Update Skills
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form className='login-form' action = '/showskills'>
      <div className="form-floating mb-3">
          <input type="text" className="form-control" id="skill" name="skill"  placeholder='kk'
          defaultValue={SkillName} onChange={e => setSkillName(e.target.value)} />  
          <label className="form-label">Update Skill</label>
        </div>
      </form>
      </Modal.Body>
      <Modal.Footer>   
      <Button className="login-btn mt-3 text-center some" onClick={updateSkillhandler}>
          Update
      </Button>
      </Modal.Footer>
    </Modal>

    {/* DELETE ROLE MODAL */}

    <Modal show={deleteShow} onHide={handleDeleteClose}>
      <Modal.Header closeButton>
          <Modal.Title>
            <i className="fa fa-trash-o fa-1x centered me-2" aria-hidden="true" style={{ color: "red" }}></i> Delete Role
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p>Do you really want to delete this record? This process cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDeleteClose}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteSkill}>
          Confirm Delete
        </Button>
        </Modal.Footer>
    </Modal>

    </div>
  )
}

export default ShowSkills