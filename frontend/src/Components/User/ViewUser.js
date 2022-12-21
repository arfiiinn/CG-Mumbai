import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Config from '../Settings/Config'
import './Users.css'
import { useLocation } from 'react-router-dom'

function ViewUser() {
    const location = useLocation()
    const UserId = location.state.Id
    const Value = location.state.Value
    const [Roles, setRoles] = useState([]);
    const[SelectedRole, setSelectedRole] =useState(0); //Fetching selected Role from dropdown
    const[Gender, setGender] = useState(["Male","Female","Other"]) //For Gender Dropdown
    const[selectedGender,setSelectedGender] = useState(""); //Fetching selected Gender from dropdown
    const [mindate,setmindate]=useState(''); 
    const [isdisabled, setIsDisabled] = useState(true);
    const[Error, setError] = useState("");
    const [state, setState] = useState({
        UserId : UserId,
        FirstName : "",
        LastName : "",
        PersonalMail : "",
        CorpMail : "",
        Gender : "",
        MobileNumber : "",
        DOB : "",
        DOJ : "",
        Grade : "",
        Location : "",
        RoleId : "",
        Password : "",
        OTP : 0,
        IsVerified : true,
        Roles:[]
      });

   
    function setCorrectFormat(date){
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

    function disableDates(){
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
        setmindate(yyyy + "-" + mm + "-" + dd)
    }

    const handleRoleSelect = (e) =>{
        setSelectedRole(e.target.value)
      }

    const handleGenderSelect = (e) =>{
        setSelectedGender(e.target.value)
      }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
          ...prevState,
          [id]: value,
        }));
        setError("");
      };

    const handleSubmit = event =>{
        setIsDisabled(isdisabled => !isdisabled);
    };

    function handleSubmitClick(e){
        e.preventDefault();
       
        let updatedUser = {
            UserId : state.UserId,
            FirstName : state.FirstName,
            LastName : state.LastName,
            PersonalMail : state.PersonalMail,
            CorpMail : state.CorpMail,
            Gender : selectedGender,
            MobileNumber : state.MobileNumber,
            DOB : state.DOB,
            DOJ : state.DOJ,
            Grade : state.Grade,
            Location : state.Location,
            RoleId : SelectedRole,
            Password : state.Password,
            OTP :state.OTP,
            IsVerified : state.IsVerified
        }
        console.log(updatedUser)
        axios.put(Config.api + `Users/${UserId}`,updatedUser)
             .then(res=>{console.log(res)
            })
             .catch(err => setError('Could not update! Please try again later.'))
            window.location.href = '/dashboard';
    }

    useEffect(() => {
        axios.get(Config.api + `Users/${UserId}`) 
        .then(response => response.data)
        .then(res =>{setState(
            {
             UserId : res.userId,   
             FirstName : res.firstName,
             LastName : res.lastName,
             PersonalMail : res.personalMail,
             CorpMail : res.corpMail,
             Gender : res.gender,
             MobileNumber : res.mobileNumber,
             DOB : setCorrectFormat(res.dob),
             DOJ : setCorrectFormat(res.doj),
             Grade : res.grade,
             Location : res.location,
             RoleId : res.roleId,
             Password : res.password,
             OTP : res.otp,
             IsVerified : res.isVerified,
             Roles: res.roles
        })
        setSelectedRole(res.roleId);
        setSelectedGender(res.gender)
        })
        
        .catch(error => console.log(error))

        axios.get(Config.api + 'Roles')
            .then(response=>response.data)
            .then(res=> {
                setRoles(res);    
            })
        .catch(err=> console.log(err))

        disableDates();
        if(Value == false){
            setIsDisabled(false)
        }
        else{
            setIsDisabled(true)
        }
    },[])

  return (
    <div>
        <div className='m-5'>
             <button className='btn edit-user' onClick={handleSubmit}><i className="fas fa-edit"></i> Edit</button>
        <hr/>
            <form className='user-form'>
            <p className="pass-error">{Error}</p>
                <div className='row'>
                    <div className="col-6 mb-3">
                        <label>First Name</label>
                        <input type="text" className="form-control" id="FirstName" value={state.FirstName} 
                            placeholder="Enter First Name" onChange={handleChange} disabled={isdisabled}/>
                    </div>
                <div className="col-6 mb-3">
                    <label>Last Name</label>
                    <input type="text" className="form-control" id="FirstName" value={state.LastName} 
                        placeholder="Enter Last Name" onChange={handleChange} disabled={isdisabled}/>
                </div>
                </div>
                <div className='row'>
                    <div className="col-6 mb-3">
                        <label>Corp Mail</label>
                        <input type="email" className="form-control" id="CorpMail" value={state.CorpMail} 
                            placeholder="Enter CorpMail" onChange={handleChange} disabled={isdisabled}/>
                    </div>
                    <div className="col-6 mb-3">
                        <label for="FirstName">Personal Mail</label>
                        <input type="email" className="form-control" id="PersonalMail" value={state.PersonalMail} 
                            placeholder="Enter PersonalMail" onChange={handleChange} disabled={isdisabled}/>  
                    </div>
                </div>
                <div className='row'>
                    <div className="col-4 mb-3">
                        <label for="FirstName">Mobile No</label>
                        <input type="number" className="form-control" id="MobileNumber" value={state.MobileNumber} 
                            placeholder="Enter Mobile Number" onChange={handleChange} disabled={isdisabled}/>
                    </div>
                    <div className="col-4 mb-3">
                        <label for="FirstName">Location</label>
                        <input type="text" className="form-control" id="Location" value={state.Location} 
                            placeholder="Enter Location" onChange={handleChange} disabled={isdisabled}/>  
                    </div>
                    <div className="col-4 mb-3">
                        <label for="FirstName">Grade</label>
                        <input type="text" className="form-control" id="Grade" value={state.Grade} 
                            placeholder="Enter Grade" onChange={handleChange} disabled={isdisabled}/>  
                    </div>
                </div>
                <div className='row'>
                    <div className="col-6 mb-3">
                        <label>Gender</label>
                        <select className="form-select" onChange = {handleGenderSelect} disabled={isdisabled}>
                            <option defaultValue={state.Gender}>{state.Gender}</option>
                            {(Gender.filter(g => g !== state.Gender).map(g=> 
                                <option value={g}>{g}</option>))}   
                        </select>
                    </div>
                    <div className="col-6 mb-3">
                        <label for="FirstName">Role</label>
                        <select className="form-select" id="inputGroupSelect01" onChange = {handleRoleSelect} disabled={isdisabled}>
                            <option defaultValue={state.RoleId}>{state.Roles.roleName}</option>
                            {(Roles.filter(r=> r.roleId !== state.RoleId).map(r=>(
                            <option id="RoleId"  key={r.roleId} value={r.roleId}>{r.roleName}</option>)))}
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-6 mb-3">
                        <label>Date of Birth</label>
                        <input type="date" className="form-control" id="DOB" value={state.DOB} max={mindate} 
                            placeholder="Enter DOB" onChange={handleChange} disabled={isdisabled}/>
                    </div>
                    <div className="col-6 mb-3">
                        <label>Date of Joining</label>
                        <input type="date" className="form-control" id="DOJ" value={state.DOJ} max={mindate}
                            placeholder="Enter DOJ" onChange={handleChange} disabled={isdisabled}/>  
                    </div>
                </div>
                <center>
                    <button className='login-btn' style={{visibility: isdisabled ? 'hidden' : 'visible'}} onClick={handleSubmitClick}>Save Changes</button>
                </center>
            </form>
        </div>
    </div>
  )
}

export default ViewUser