import { useState, useEffect , React }from 'react'
import axios from 'axios'
import './Login.css'
import cglogo from '../../images/cg-logo.png'
import view from "../../images/view.png"
import hide from "../../images/hide.png"
import Config from "../Settings/Config"


function Login() {
    const[SelectedRole, setSelectedRole] =useState("");
    const [Roles, setRoles] = useState([]);
    const[Eye, setEye] = useState(false);
    const[Error, setError] = useState("");
    const togglePassword = () => {
        setEye(!Eye);
    };

    const [state, setState] = useState({
        CorpMail: "",
        Password: ""
        
      });

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


      const handleSubmitClick = (e) => {
        e.preventDefault();
       sessionStorage.removeItem('token');
       if((state.CorpMail.trim().length !== 0) && (state.Password.trim().length !== 0) && (SelectedRole.trim().length !== 0) ){
        const payload = {
          CorpMail: state.CorpMail,
          Password: state.Password, 
          RoleId: SelectedRole
        };

        axios.post(Config.api + "UserLogin", payload)
        .then((res) => {sessionStorage.setItem('token', res.data.token)
        console.log(res.data)
        sessionStorage.setItem('role',res.data.role)
        sessionStorage.setItem('email',payload.CorpMail)
        sessionStorage.setItem('Id',res.data.userId)
        sessionStorage.setItem('rolename',res.data.roleName)
              window.location.reload()
              window.location.href = "/dashboard";
            
            })
    
        .catch((err)=> {console.log(err)
        setError("Kindly check your credentials again.")
        setState({ CorpMail: '', Password: '' })
           })  
       }
       else{
        setError("All fields are required!")
       }
      };

  return (
    <div className="card login-card mx-auto">
    <form className='login-form'>
        <div className='login-body'>
        <h3 className='login-head'>
        <img src={cglogo} className="cg-logo mb-4" alt="Cg-Logo"/>iTransform Learning</h3>
        <p className="pass-error">{Error}</p>
        <div className="input-group mb-3">
          <label className="input-group-text"><i className="fa fa-user" aria-hidden="true"></i></label>
          <select className="form-select" id="inputGroupSelect01" onChange = {handleRoleSelect}>
            <option defaultValue={"Login as..."}>Login as...</option>
            {Roles.map(r=>(
            <option id="RoleId"  key={r.roleId} value={r.roleId}>{r.roleName}</option>))}
          
          </select>
        </div>


        <div className="mb-3">
            <label className="form-label login-label">Corp Id</label>
             <input type="email" className="form-control" id="CorpMail" value={state.CorpMail}
              onChange={handleChange}placeholder='Enter corp email address' required={true}/>
        </div>
        <div className="mb-3">
            <label className="form-label login-label">Password</label>
            <div className='d-flex flex-row'>
            <input type={Eye ? "text" : "password"} className="form-control" id="Password" required={true} value={state.Password} onChange={handleChange}placeholder="Enter password" />
            <img className="eye" src={Eye ? view : hide} alt="hide" onClick={togglePassword} ></img>
            </div>
        </div>
        <center>
            <button type="submit" className="login-btn mt-3" onClick={handleSubmitClick}>Login</button>
        <br/>
        <a href="/verify" className="login-link link-info">New User?</a></center>
        </div>
    </form>
    </div>
  )
}

export default Login