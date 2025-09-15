using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer;
using Models;

namespace RestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ModelContext _context;

        public UserController(ModelContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserModel>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserModel>> Register([FromBody] UserModel newUser)
        {
            if (await _context.Users.AnyAsync(u => u.Email == newUser.Email))
                return BadRequest("Email already registered");

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUser);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserModel>> Login([FromBody] UserModel login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == login.Email && u.Password == login.Password);
            if (user == null) return Unauthorized("Invalid email or password");
            return Ok(user);
        }

        [HttpPut("{id}/tokens")]
        public async Task<IActionResult> UpdateTokens(int id, [FromBody] int amount)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            user.Tokens += amount;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
