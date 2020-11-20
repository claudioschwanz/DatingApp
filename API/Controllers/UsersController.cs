using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<AppUser>> GetUsers()
        {
            var users = _context.Users.ToList();

            return users;
        }
        [HttpGet("{id}")]
        public ActionResult<AppUser> GetUserByID(int id)
        {
            var user = _context.Users.Find(id);

            return user;
        }
    }
}
