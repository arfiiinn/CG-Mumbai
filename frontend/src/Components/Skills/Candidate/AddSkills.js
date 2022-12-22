import axios from 'axios';
import React, { useEffect, useState} from 'react'
import Config from '../../Settings/Config';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../Candidate/addskills.css'
import edit from '../../../images/edit.png'
import tap from '../../../images/tap.png'
import Select from "react-select";

function AddSkills() {
  const [selectedOptions, setSelectedOptions] = useState("");
  const [Skills, setSkills] = useState([]);      //To fetch all the skills in the dropdown
  const [SkillId, setSkillId] = useState("");
  const [Ratings, setRatings] =  useState("");
  const [SkillSetId, setSkillSetId] = useState("");
  const [skillname, setSkillname] = useState([]);
  const [CandidateSkill , setCandiadteSkill] =  useState([]);   // To display the skills of the particular Candidate

  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleShowDelete = (id) => {
    setDeleteShow(true);
    setSkillSetId(id);
    console.log(id);
   } 

  const [updateShow, setUpdateShow] = useState(false);
  const handleUpdateClose = () => 
  {
     setUpdateShow(false);
     window.location.reload();
  }
  const handleShowUpdate = (sid,id,ratings) => {
    setUpdateShow(true);
    setSkillSetId(sid)
    setSkillId(id);
    setRatings(ratings);
   }

  // Put Request to Update the Ratings 
  function updateSkillhandler () {
    console.log(SkillSetId,SkillId,Ratings);
    axios.put(Config.api + 'CandidateSkills/' + SkillSetId, 
    { 
      SkillSetId : SkillSetId, 
      SkillId : SkillId, 
      UserId : sessionStorage.getItem('Id'),
      Ratings : Ratings
    }) 
    .then(response => response.data)
    .then(res => {alert("Skill Updated Successfully")
    window.location.reload();
    })
    .catch(error => alert("Oops! Something went wrong."))
  }
 
  // Delete Request to remove the Skills of the Candidate
  function deleteSkill() {
    axios.delete(Config.api + 'CandidateSkills/Skill/' + SkillSetId)
      .then(res => {
        console.log(res);
        window.location.reload();
        console.log(res);
      })
      .catch(err => {console.log(err); alert(err)})
  }

  // To update the progress bar based on the Ratings
  function getPercentage(Ratings)
  {
    const width = (Ratings / 10) * 100
    
    return width.toLocaleString() + "%";
    
  }

   // To update the color of progress bar based on the Ratings
  function assigncolor(Ratings)
  {
    let color = ["#FF6464", "orange", "#FFF38C","#0070ad", "green"]
    if (Ratings <= 2)
    {
      color = "#FF6464";
      return color;
    }
    if (Ratings <= 4)
    {
      color = "orange";
      return color;
    }
    if (Ratings <= 6)
    {
      color = "#FFF38C";
      return color;
    }
    if (Ratings <= 8)
    {
      color = "#0070ad";
      return color;
    }
    if (Ratings <= 10)
    {
      color = "green";
      return color;
    }
  }

  //search and select options
  let optionslist = []
  for (let i =0; i< skillname.length; i++){
      optionslist.push({ value: skillname[i].skillId, label: skillname[i].skillName });
  }

  function handleSelect(data){
    setSelectedOptions(data);
    setSkillId(data.value);
  }

  // To fetch the Skills in the dropdown 
  function fetchSkills() {
    axios.get(Config.api + 'Skills',Skills,skillname)
      .then(res => res.data)
      .then(res => { setSkills(res);setSkillname(res) })
      .catch(err => console.log(err))
    
  }
  // Post Request to Add the skills 
  const handleSubmitClick= (e) => {
    e.preventDefault();
    const payload = {
    UserId: sessionStorage.getItem('Id'),
    SkillId: SkillId,
    Ratings: Ratings
    };
    console.log(payload)
  const result = CandidateSkill.some(s => s.skillId == payload.SkillId);
  if(result == false)
  {
    axios.post(Config.api + 'CandidateSkills',payload) 
    .then(res=> {alert(" Skill Added Successfully!");
        window.location.reload();
        console.log(res);
    })
  }
  else{
    alert("Skill already exists!")
  }

  }
  const numDescending = [...CandidateSkill].sort((a, b) => b.ratings - a.ratings);  // if b-a > 0 then sort b before a
  console.log(numDescending);
  // Get Request to display the Skills of the particular Candidate
  useEffect(()=>{
    fetchSkills();    
    axios.get(Config.api + `CandidateSkills/User/${sessionStorage.getItem('Id')}`)
    .then(res => { 
     setCandiadteSkill(res.data);   
    })  
    .catch(err => console.log(err))
  },[])

  return (
    
  <>
  {/* SELECT SKILLS FORM */}

  {Config.isUserLoggedin ? 
        <div className="m-5">
          
    <div className="row">
      <div className="col-md-6 mt-3">
        <div className='card skill-add-card p-4 w-75'>
            <form className="">
              <div className="mb-3">
              <div className='choose-skills '>
                <img src={tap} alt="select" className='tap'/>
                <h4 className='skill-label-heading'>Choose Skills</h4>
              </div>
                    <Select
                      className="select"
                      options={optionslist}
                      placeholder="Select skill"
                      value={selectedOptions}
                      onChange={handleSelect}
                      isSearchable={true}
                      maxMenuHeight={150}
                    />
              </div>
              <div className='mb-3'>
              <select className="form-select"  onChange={e => setRatings(e.target.value)}>
                  <option defaultValue={"rateskill"}>Rate Yourself</option>
                  <option value="2">Novice</option>
                  <option value="4">Beginner</option>
                  <option value="6">Competent</option>
                  <option value="8">Proficient</option>
                  <option value="10">Expert</option>
              </select>
              <center>
                <button type="submit" className="btn login-btn mt-4" onClick={handleSubmitClick} >Submit</button>
              </center>
            </div>
          </form>
        </div>
      </div>

      {/* DISPLAY CANDIDATE SKILLS  */}

      <div className="col-md-6">
      <h4 style={{marginLeft:"27%"}} className="mb-4">Here are your skills</h4>
      <div className="container scroll">
         {numDescending.map (s => (
          <div className="col-lg-11 col-md-4" key={s.SkillSetId}>
            <article className="card mb-3 p-3 candidate-skills">
              <div className="row no-gutters">
                <div className="col-9">
                <div className="m-1">                            
                    <h6>{s.skills.skillName}</h6> 
                    <div className="row">
                        <div className='col-md-4'>
                          <h6>Proficiency</h6>
                        </div>
                        <div className="col-md-8 mt-1">
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" style={{width: getPercentage(s.ratings),backgroundColor:assigncolor(s.ratings)}}></div>
                        </div>
                        </div>
                    </div>                   
                </div>
                </div>
              <aside className="col-2">
                <div>
                  <div className="d-grid gap-3 d-md-flex justify-content-md-right mt-3 pt-3 fs-5">        
                      <a href="#" onClick={() => handleShowUpdate(s.skillSetId,s.skillId,s.ratings)}> 
                        <i className="far fa-edit skill-icon"></i>
                      </a>                    
                      <a href="#"  onClick={()=> handleShowDelete(s.skillSetId) }>
                        <i className='fa fa-trash skill-delete'></i>
                      </a>        
                  </div>
                </div>
              </aside>
            </div>
            </article> 
          </div>
       ))} 

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
          
        {/* UPDATE RATINGS FORM */}

        <Modal show={updateShow} onHide={handleUpdateClose}>
          <Modal.Header closeButton>
            <Modal.Title className="ms-auto">
              <img src={edit} className="mb-2 me-2" alt="Cg-Logo" />
              Update Ratings
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form className='login-form' action = '/addskills'>
            <div className="mb-3">
                <select className="form-select"  onChange={e => setRatings(e.target.value)} 
                id="ratings" name="ratings" defaultValue={Ratings}>
                  <option value="2">Novice</option>
                  <option value="4">Beginner</option>
                  <option value="6">Competent</option>
                  <option value="8">Proficient</option>
                  <option value="10">Expert</option>
                </select>
            </div>
          </form>
          </Modal.Body>
          <Modal.Footer>   
          <Button className="login-btn mt-2 mb-2 text-center some" onClick={updateSkillhandler}>
              Update
          </Button>
          </Modal.Footer>
        </Modal>

       </div>
      </div>
     </div>
    </div>
  :<></> }
  </>
  )
}

export default AddSkills