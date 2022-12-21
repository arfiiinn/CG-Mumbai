import { useState , React, useEffect }from 'react'
import view from "../../images/view.png"
import hide from "../../images/hide.png"
import "./Password.css"
import Config from "../Settings/Config"
import axios from 'axios';
import {useNavigate ,useLocation} from 'react-router-dom'

function SetPassword() {

    const [newPasswordShown, setnewPasswordShown] = useState(false);
    const [confirmPasswordShown, setconfirmPasswordShown] = useState(false);
    const[newEye, setnewEye] = useState(false);
    const[confirmEye, setconfirmEye] = useState(false);
    const[error,setError] = useState("");

    const [state, setState] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const togglePasswordnew = () => {
        setnewPasswordShown(!newPasswordShown);
        setnewEye(!newEye);
    };
    const togglePasswordconfirm = () => {
        setconfirmPasswordShown(!confirmPasswordShown);
        setconfirmEye(!confirmEye);
    };

    const[user,setUser] = useState({
            UserId : "",
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

    const location = useLocation();
    const userid = location.state.Id

    useEffect( () => {
        axios.get(Config.api + `Users/${userid}`) 
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
        setError("")
      };

    const updatePassword = (e) => {
        e.preventDefault();
        if((state.newPassword.trim().length !== 0) && (state.confirmPassword.trim().length !== 0) )
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
            setUser({Password : state.newPassword});
            axios.put(Config.api + `Users/${user.UserId}`, userWithPassword)
            .then(res=> { alert('Password changed Successfully!') 
                sessionStorage.clear();
                window.location.href='/';
        })
            .catch(error => alert("Oops! Something went wrong." + error))
            window.location.reload()
    }
    else {
        e.preventDefault();
        setError("Passwords do not match!")
    }
}
else{
    setError("All fields are required!");
}
    }
  return (
    <div className="card pass-card mx-auto">
    <form className='login-form'>
        <div className='login-body'>
        <h3 className='login-head'>Set Password</h3>
        <p className="pass-error">{error}</p>
        <div className="mb-3">
            <label className="form-label login-label">New Password</label>
            <div className='d-flex flex-row'>
            <input type={newPasswordShown ? "text" : "password"} id="newPassword" className="form-control" onChange={handleChange} placeholder="Enter password" />
            <img className="eye" src={newEye ? view : hide} alt="hide" onClick={togglePasswordnew}></img>
            </div>
        </div>
        <div className="mb-3">
            <label className="form-label login-label">Confirm Password</label>
            <div className='d-flex flex-row'>
            <input type={confirmPasswordShown ? "text" : "password"} id="confirmPassword" onChange={handleChange} className="form-control" placeholder="Enter password" />
            <img className="eye" src={confirmEye ? view : hide} alt="hide" onClick={togglePasswordconfirm}></img>
            </div>
        </div>
        <center>
            <button type="submit" className="login-btn mt-3" onClick={updatePassword}> Set</button>
        <br/>
        </center>
        </div>
    </form>
    </div>
  )
}

export default SetPassword