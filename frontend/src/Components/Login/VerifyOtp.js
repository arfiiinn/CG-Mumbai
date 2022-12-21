import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Verifyuser.css'
import cglogo from '../../images/cg-logo.png'
import Config from '../Settings/Config'
import {useNavigate ,useLocation} from 'react-router-dom'

function VerifyOtp() {
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
    IsVerified : false
});
const [inputOTP, setInputOTP] = useState(0);

  const location = useLocation();
  const userid = location.state.Id;
  const [error, setError] = useState("");

  useEffect(()=>{
    axios.get(Config.api + `Users/${userid}`)
    .then(res=>{setUser(
      {
       UserId : res.data.userId,   
       FirstName : res.data.firstName,
       LastName : res.data.lastName,
       PersonalMail : res.data.personalMail,
       CorpMail : res.data.corpMail,
       Gender : res.data.gender,
       MobileNumber : res.data.mobileNumber,
       DOB : res.data.dob,
       DOJ : res.data.doj,
       Grade : res.data.grade,
       Location : res.data.location,
       RoleId : res.data.roleId,
       Password : res.data.password,
       OTP : res.data.otp,
       IsVerified : res.data.isVerified
      }
    )
  })
    .catch(err => console.log(err))
     },[])

     const navigate = useNavigate();
     const getVerifiedId = (id) => {
      navigate('/setPassword',{state:{Id:id}});
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if(inputOTP.toString().trim().length !==0){

      if(inputOTP.toString().trim().length == 6){

        if(inputOTP == user.OTP){
          let verifiedUser = {
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
            Password : user.Password,
            OTP : 0,
            IsVerified : true
          }
          axios.put(Config.api + `Users/${userid}`, verifiedUser)
          .then(res=> {alert(" You are successfully verified!");
          getVerifiedId(user.UserId);
            window.location.href = '/setPassword';
          })
          .catch(err=> console.log("Error : " + err));
        }
        else {
          setError("OTP is incorrect!")
        }

      }
      else{
        setError("OTP should be six digit")
      }
  }
  else{
    setError("OTP cannot be empty")
  }

  }

  const handleChange = (e) => {
    setInputOTP(e.target.value);
    setError("");
  }

  return (
    <div className="card Verifyuser-card mx-auto">
    <form className='login-form'>
        <div className='login-body'>
        <h3 className='login-head'>
        <img src={cglogo} className="cg-logo mb-4" alt="Cg-Logo" />iTransform Learning</h3>
          <div class="alert alert-warning" role="alert" >
            We have sent a mail to {user.CorpMail}!!
        </div>
        <p className='pass-error'>{error}</p>
        <div class="form-floating">
          <input type="number" className="form-control" id="OTP" name="OTP" placeholder="OTP" onChange={handleChange}/>
          <label >OTP</label>
        </div>
        <center>
            <button type="submit" className="login-btn mt-3" onClick={handleSubmitClick}>Verify</button>
        </center>
        </div>
    </form>
    </div>

  )
}

export default VerifyOtp