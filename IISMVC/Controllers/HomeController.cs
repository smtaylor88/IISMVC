using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IISMVC.Filters;
using IISMVC.Models;

namespace IISMVC.Controllers
{
    [CustomAuthenticationFilter]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";
            return View();
        }

        public ActionResult Index1()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";
            return View("Index-Orig");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }

        public ActionResult StevePage()
        {
            return View("StevePage");
        }

        [AllowAnonymous]
        public ActionResult ComputerExample()
        {
            CanvasModel model = new CanvasModel();
            return View("ComputerExample", model);
        }

        public ActionResult Resume()
        {
            return View("ResumeWebDev");
        }        
    }
}
