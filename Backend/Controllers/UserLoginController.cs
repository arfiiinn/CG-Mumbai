using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly CGDbContext _context;
        public UserLoginController(CGDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        #region Login Method API for Verified Users
        [AllowAnonymous]
        [HttpPost]
        ///<summary>Login Method to use Generated Token </summary> 
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            try
            {
                var user = Authenticate(userLogin);
                if (user != null)
                {
                    var rolename = _context.Role.Where(role => role.RoleId == user.RoleId).Select(role => role.RoleName);
                    var Token = Generate(user);
                    var role = new { token = Token, Role = user.RoleId , UserId = user.UserId, RoleName = rolename};
                    return Ok(role);
                }
                return NotFound("User Not found");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        #region Login Method API for New Users
        [HttpGet("/api/NewUser")]
        public async Task<ActionResult<User>> FirstTimeUserLogin(string Mail1, string Mail2, int roleId)
        {
            try
            {
                NewUserLogin user = new NewUserLogin()
                {
                    PersonalMail = Mail1,
                    CorpMail = Mail2,
                    RoleId = roleId
                };
                var NewUser = NewAuthenticate(user);
                if (NewUser != null)
                {
                        return NewUser;  
                }
                else
                {
                    return NotFound("User Not Found");
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Server error {e.Message}");
            }
        }
        #endregion

        #region Generate Token method
        ///<summary>Generate Token method</summary> 
        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                  new Claim(ClaimTypes.SerialNumber,Convert.ToString(user.UserId)),
                  new Claim(ClaimTypes.Role,user.RoleId.ToString()),
                  new Claim(ClaimTypes.Email,user.CorpMail)
            };

            var Token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], claims,
                expires: DateTime.Now.AddMinutes(60), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(Token);
        }
        #endregion

        #region Authenticate Verified-User Method
        ///<summary>Authenticate method</summary> 
        private User Authenticate(UserLogin userLogin)
        {
            var Currentuser = _context.User.FirstOrDefault(o => o.CorpMail == userLogin.CorpMail && o.Password == userLogin.Password && o.RoleId==userLogin.RoleId);

            if (Currentuser != null)
            {
                return Currentuser;
            }
            return null;
        }
        #endregion

        #region NewAuthenticate Method
        ///<summary>Authenticate method</summary> 
        private User NewAuthenticate(NewUserLogin userLogin)
        {
            var Currentuser = _context.User.FirstOrDefault(o => o.CorpMail == userLogin.CorpMail && o.PersonalMail == userLogin.PersonalMail && o.RoleId == userLogin.RoleId);

            if (Currentuser != null)
            {
                return Currentuser;
            }
            return null;
        }
        #endregion

        // #region VerifyOTP Method
        // ///<summary>VerifyOTP method</summary> 
        // private User VerifyOTP(UserLogin userLogin)
        // {

        //     var Currentuser = _context.User.FirstOrDefault(o => o.CorpMail == userLogin.CorpMail && o.OTP == userLogin.OTP);
        //     //User newUser = new User();

        //     //var v = true;

        //     if (Currentuser != null)
        //     {
        //         //newUser.isVerified = v;
        //         //_DbContext.SaveChanges();
        //         return Currentuser;
        //     }
        //     return null;
        // }
        // #endregion

    }
}

