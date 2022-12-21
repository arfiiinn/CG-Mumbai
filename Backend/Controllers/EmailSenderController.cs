using Backend.Data;
using Backend.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailSenderController : ControllerBase
    {
        private readonly CGDbContext _context;
        private readonly IEmailSender _emailSender;
        public EmailSenderController(IEmailSender emailSender, CGDbContext context)
        {
            _emailSender = emailSender;
            _context = context;
        }

        [HttpPost, Route("SendEmail")]
        #region Send Mail API
        ///<summary>Send Mail</summary> 
        public async Task<IActionResult> SendEmailAsync(string recipientEmail, string recipientFirstName, string Subject, string Body)
        {

            try
            {
                string messageStatus = await _emailSender.SendEmailAsync(recipientEmail, recipientFirstName, Subject, Body);
                return Ok(messageStatus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        #endregion

        #region Send OTP for Verifying First-Time Users
        [HttpPost, Route("/api/VerifyUser")]
        public async Task<IActionResult> SendOTP(int id)
        {
            string Subject = "OTP for Email Verification";
            var user = _context.User.Where(g => g.UserId == id).FirstOrDefault();
            string recipientEmail = user.CorpMail;
            string recipientFirstName = user.FirstName;
            var otp = GenerateOTP();
            string Body = $"<h3>Here's your One-Step-Verification Code, <br/>" +
                             $"OTP:<em> {otp} </em></h3>" +
                             $"<p>Kindly do not share this OTP with anybody.</p>";
            try
            {
                string messageStatus = await _emailSender.SendEmailAsync(recipientEmail, recipientFirstName, Subject, Body);
                user = _context.User.First(a => a.UserId == id);
                user.OTP = Convert.ToInt32(otp);
                _context.SaveChanges();
                return Ok(messageStatus);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
            }
        }
        #endregion

        #region Generate-OTP for Verification
        private string GenerateOTP()
        {
            string OTPLength = "6";
            string NewPassword = "";

            string AllowedChars = "1,2,3,4,5,6,7,8,9";

            char[] sep = { ',' };
            string[] arr = AllowedChars.Split(sep);
            string IDString = "";
            string temp = "";
            Random rand = new Random();
            for (int i = 0; i < Convert.ToInt32(OTPLength); i++)
            {
                temp = arr[rand.Next(0, arr.Length)];
                IDString += temp;
                NewPassword = IDString;
            }
            return NewPassword;
        }
        #endregion 


    }
}
