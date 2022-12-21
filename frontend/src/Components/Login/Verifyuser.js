import React,{useState, useEffect } from 'react'
import axios from 'axios'
import './Verifyuser.css'
import cglogo from '../../images/cg-logo.png'
import Config from '../Settings/Config'
import {useNavigate} from 'react-router-dom';

function Verifyuser() {
  const[SelectedRole, setSelectedRole] =useState("");
  const [Roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const[Error, setError] = useState("");
  const [state, setState] = useState({
    PersonalMail: "",
    CorpMail: "",
  });

  const getVerifiedId = (id) => {
      navigate('/otp',{state:{Id:id}});
  }
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setError("");
  };

  const handleRoleSelect = (e) =>{
    setSelectedRole(e.target.value)
  }

  useEffect(()=> {
    axios.get(Config.api + 'Roles')
        .then(response=>response.data)
        .then(res=> setRoles(res))
    .catch(err=> console.log(err))
},[])


  function sendotp(id) {
    axios.post(Config.api + `VerifyUser?id=${id}`)
      .then(res => { alert("Email sent successfully!"); window.location.reload();})
    .catch(err => alert("Oops! Something went wrong email wala"))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if((state.CorpMail.trim().length !== 0) && (state.PersonalMail.trim().length !== 0) && (SelectedRole.trim().length !== 0) ){
    const payload = {
      PersonalMail: state.PersonalMail,
      CorpMail: state.CorpMail, 
      RoleId: SelectedRole

    };

    axios.get(Config.api + `NewUser?Mail1=${payload.PersonalMail}&Mail2=${payload.CorpMail}&roleId=${payload.RoleId}`)
        .then(res => { 
          console.log(res.data.isVerified)
           if(res.data.isVerified === false){
           getVerifiedId(res.data.userId)
           sendotp(res.data.userId)
          }
          else{
            setError("You're already verified, please login!")
          }
        })
      .catch(err => alert("Oops! Something went wrong."))
    }
    else{
      setError("All fields are required!")
    }
}

  return (
    <div className="card Verifyuser-card mx-auto">
    <form className='login-form'>
        <div className='login-body'>
        <h3 className='login-head'>
        <img src={cglogo} className="cg-logo mb-4" alt="Cg-Logo"/>iTransform Learning</h3>
        <p className="pass-error">{Error}</p>
        <div className="input-group mb-3">
          <label className="input-group-text"><i className="fa fa-user" aria-hidden="true"></i></label>
          <select className="form-select" id="inputGroupSelect01" onChange = {handleRoleSelect}>
            
            <option defaultValue={"Select Role..."}>Select Role...</option>
            {Roles.map(r=>(
            <option id="RoleId"  key={r.roleId} value={r.roleId}>{r.roleName}</option>))}
          
          </select>
        </div>

        <div className="mb-3">
            <label className="form-label login-label">Email Id</label>
            <input type="email" id="PersonalMail" className="form-control" onChange={handleChange} placeholder='Enter personal email address'/>
        </div>
        <div className="mb-3">
            <label className="form-label login-label">Corp Id</label>
            <input type="email" id="CorpMail" className="form-control" onChange={handleChange} placeholder='Enter corp email address'/>
        </div>
        
        <center>
            <button type="submit" className="login-btn mt-3" onClick={handleSubmitClick}>Verify</button>
        <br/>
        Already Verified?<a href="/" className="login-link link-info mt-2"> Login</a></center>
        </div>
    </form>
    </div>

  )
}

export default Verifyuser