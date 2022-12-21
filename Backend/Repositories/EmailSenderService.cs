using Backend.Repositories;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Net;
using System.Threading.Tasks;
using System;
using MailKit.Net.Smtp;
using Backend.Data;

namespace backend.Repositories
{
    public class EmailSenderService : IEmailSender
    {
        private readonly SmtpSettings _smtpSettings;
        public EmailSenderService(IOptions<SmtpSettings> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
        }

        public async Task<string> SendEmailAsync(string recipientEmail, string recipientFirstName, string Subject, string Body)
        {
            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(_smtpSettings.SenderEmail));
            message.To.Add(MailboxAddress.Parse(recipientEmail));
            message.Subject = Subject;
            message.Body = new TextPart("html")
            {
                Text = $"{Body}"
            };

            var client = new SmtpClient();

            try
            {
                await client.ConnectAsync(_smtpSettings.Server, _smtpSettings.Port, true);
                await client.AuthenticateAsync(new NetworkCredential(_smtpSettings.SenderEmail, _smtpSettings.Password));
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
                return "Email Sent Successfully!";
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                client.Dispose();
            }
        }
    }
}
