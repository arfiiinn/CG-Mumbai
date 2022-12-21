using System.Threading.Tasks;

namespace Backend.Repositories
{
    public interface IEmailSender
    {
        Task<string> SendEmailAsync(string recipientEmail, string recipientFirstName, string Subject, string Body);
    }
}
