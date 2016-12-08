using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web.Http;

namespace AngularJSWebApiEmpty.Controllers
{
    public class EmailController : ApiController
    {
        public class RegistrationForm
        {
            public string name { get; set; }
            public string email { get; set; }
            public string phone { get; set; }
            public string otherinfo { get; set; }
            public string skills { get; set; }
            public bool ambassador1 { get; set; }
            public bool ambassador2 { get; set; }
            public List<string> interests { get; set; }
            public int? pledgeAmount { get; set; }
            public bool showSupport { get; set; }
        }

        //private SmtpClient GetSmtpClient()
        //{

        //    SmtpClient smtp = new SmtpClient("smtpout.asia.secureserver.net", 80);
        //    smtp.UseDefaultCredentials = false;
        //    smtp.Credentials = new NetworkCredential("support@ourriskplan.com", "Blues12345");
        //    smtp.EnableSsl = false;
        //    return smtp;
        //}

        // POST: api/Email
        public IHttpActionResult Post(RegistrationForm form)
        {

            //MailMessage m = new MailMessage();
            //m.From = new MailAddress(C_FROMEMAIL);
            //m.Subject = "Volunteer Inductions";
            //m.IsBodyHtml = true;


            //m.To.Clear();
            //m.To.Add(new MailAddress(item.EmailAddress, item.Firstname + " " + item.Surname));
            //m.Body = "<div style='font-family: Calibri, Geneva, Sans'>" +
            //         "Dear " + item.Firstname + ", <br/><br/>" +
            //         "To complete your induction and view our Code of Conduct please use the link below.<br/><br/>" +
            //         "<a href='" + link + "'>Code of Conduct</a><br/><br/>" +
            //         "Thanks,<br/>" +
            //         "<b>" + account.AccountName + "</b><br/>" +
            //         "<i><small>Our Risk Plan</small></i>";
            //GetSmtpClient().Send(m);


            var body = "<body>bHive website - Register Your Interest form submitted<br/><br/>";
            body += "Name : " + form.name + "<br/>";
            body += "Email : " + form.email + "<br/>";
            body += "Phone : " + form.phone + "<br/>";
            body += "Comments / Other Info : " + form.otherinfo + "<br/>";
            body += "<br/>";
            if(form.showSupport)
            {
                if (form.skills != null) body += "Skills : " + form.skills + "<br/><br/>";

                if (form.pledgeAmount != null && form.pledgeAmount != 0)
                {
                    if (form.pledgeAmount == -1)
                    {
                        body += "Hmmmm, I'm sure what I'd like to pledge yet.<br/><br/>";
                    }
                    else
                    {
                        body += "Pledged Amount : $" + form.pledgeAmount + (form.pledgeAmount == 2000 ? " (WOOHOO!)" : "") + "<br/><br/>";
                    }
                }


                if (form.ambassador1 || form.ambassador2) body += "As an ambassador :";
                if (form.ambassador1) body += "<br/><b>I would like to talk to you about some ideas</b><br/>";
                if (form.ambassador2) body += "<br/><b>I know someone who would be really interested in this</b><br/>";

                if (form.interests != null && form.interests.Count > 0)
                {
                    body += "<br/>I am interested in using bHive for : ";
                    form.interests.ForEach(o =>
                    {
                        body += o + "  |  ";
                    });
                }
            }

            body += "</body>";

            Email from = new Email("info@bhive.coop");
            string subject = "bHive : Expression of Interest";
            Content content = new Content("text/html", body);
            Email to = new Email("marcus@turncode.productions");
            Mail mail = new Mail(from, subject, to, content);
            
            dynamic sg = new SendGridAPIClient(ConfigurationManager.AppSettings.Get("EmailAPI"));
            sg.client.mail.send.post(requestBody: mail.Get());

            to = new Email("ian@liveecological.com.au");
            mail = new Mail(from, subject, to, content);
            sg.client.mail.send.post(requestBody: mail.Get());

            return Ok();
        }

    }
}
