import { useState , React, useEffect }from 'react'
import view from "../../images/view.png"
import hide from "../../images/hide.png"
import "./Password.css"
import Config from "../Settings/Config"
import axios from 'axios';
import Unauthorized from '../Unauthorized/Unauthorized'

function Password() {
    const [oldPasswordShown, setoldPasswordShown] = useState(false);
    const [newPasswordShown, setnewPasswordShown] = useState(false);
    const [confirmPasswordShown, setconfirmPasswordShown] = useState(false);
    const[oldEye, setoldEye] = useState(false);
    const[newEye, setnewEye] = useState(false);
    const[confirmEye, setconfirmEye] = useState(false);
    const[error,setError] = useState("");

    const togglePasswordold = () => {
        setoldPasswordShown(!oldPasswordShown);    
        setoldEye(!oldEye);
    };
    const togglePasswordnew = () => {
        setnewPasswordShown(!newPasswordShown);
        setnewEye(!newEye);
    };
    const togglePasswordconfirm = () => {
        setconfirmPasswordShown(!confirmPasswordShown);
        setconfirmEye(!confirmEye);
    };

    const [state, setState] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const[user,setUser] = useState({
        UserId : 0,
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
        IsVerified : true
    });

    useEffect( () => {
        axios.get(Config.api + `Users/${sessionStorage.getItem('Id')}`) 
        .then(response => response.data)
        .then(res => setUser(
            {
             UserId : res.userId,   
             FirstName : res.firstName,
             LastName : res.lastName,
             PersonalMail : res.personalMail,
             CorpMail : res.corpMail,
             Gender : res.gender,
             MobileNumber : res.mobileNumber,
             DOB : res.dob,
             DOJ : res.doj,
             Grade : res.grade,
             Location : res.location,
             RoleId : res.roleId,
             Password : res.password,
             OTP : res.otp,
             IsVerified : res.isVerified
        }
        ))
        .catch(error => console.log(error))
    } , []) 

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prevState) => ({
          ...prevState,
          [id]: value,
        }));
        setError("");
    };

    const updatePassword = (e) => {
        e.preventDefault();
        if((state.currentPassword.trim().length !== 0) && (state.newPassword.trim().length !== 0) && (state.confirmPassword.trim().length !== 0) )
        {
        if(state.currentPassword == user.Password)
        {
            if(state.newPassword == state.confirmPassword)
            {
                let userWithPassword = {
                 UserId : user.UserId,   
                 FirstName : user.FirstName,
                 LastName : user.LastName,
                 PersonalMail : user.PersonalMail,
                 CorpMail : user.CorpMail,
                 Gender : user.Gender,
                 MobileNumber : user.MobileNumber,
                 DOB : user.DOB,
                 DOJ : user.DOJ,
                 Grade : user.Grade,
                 Location : user.Location,
                 RoleId : user.RoleId,
                 Password : state.newPassword,
                 OTP : user.OTP,
                 IsVerified : user.IsVerified
                }
                setUser({Password : state.newPassword})
                if(state.newPassword != user.Password)
                {
                    axios.put(Config.api + `Users/${user.UserId}`, userWithPassword)
                    .then(res=> { 
                    alert('Password changed Successfully!')
                    sessionStorage.clear()
                    window.location.reload()
                    window.location.href="/";
                })
                    .catch(error => alert("Oops! Something went wrong." + error))
                }
                else{
                    e.preventDefault();
                    setError("Your new Password cannot be same as your Current Password!")
                }
            }
            else {
                e.preventDefault();
                setError("Passwords do not match!")
            }
       
        }
        else{
            e.preventDefault();
            setError("Old Password does not match!")
        }
    }
    else{
        setError("All fields are required!")
    }
    }
  return (
    <>
    {Config.isUserLoggedin ? 
    <div className="card pass-card mx-auto">
    <form className='login-form'>
        <div className='login-body'>
        <h3 className='login-head'>Change Password</h3>
        <p className="pass-error">{error}</p>
        <div className="mb-3 ">
            <label className="form-label login-label">Old Password</label>
            <div className='d-flex flex-row'>
            <input type={oldPasswordShown ? "text" : "password"} className="form-control" id="currentPassword"
            placeholder="Enter password" onChange={handleChange}/>
            <img className="eye" src={oldEye ? view : hide} alt="hide" onClick={togglePasswordold}></img>
            </div>
        </div>
        
        <div className="mb-3">
            <label className="form-label login-label">New Password</label>
            <div className='d-flex flex-row'>
            <input type={newPasswordShown ? "text" : "password"} className="form-control" id="newPassword"
            placeholder="Enter password" onChange={handleChange}/>
            <img className="eye" src={newEye ? view : hide} alt="hide" onClick={togglePasswordnew}></img>
            </div>
        </div>
        <div className="mb-3">
            <label className="form-label login-label">Confirm Password</label>
            <div className='d-flex flex-row'>
            <input type={confirmPasswordShown ? "text" : "password"} className="form-control"  id="confirmPassword"
            placeholder="Enter password" onChange={handleChange}/>
            <img className="eye" src={confirmEye ? view : hide} alt="hide" onClick={togglePasswordconfirm}></img>
            </div>
        </div>
        {/* <input type="checkbox" class="form-check-input" onClick={togglePassword}/> &nbsp; Show Password */}
        <center>
            <button type="submit" className="login-btn mt-3" onClick={updatePassword}>Change</button>
        <br/>
        </center>
        </div>
    </form>
    </div>: <> 
        <Unauthorized/>
    </>} </>
  )
}

export default Password