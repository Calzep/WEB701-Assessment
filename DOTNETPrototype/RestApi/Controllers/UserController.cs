using DataAccessLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ModelContext _context;
        private readonly IConfiguration _config;

        public UserController(ModelContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
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
        public async Task<ActionResult<LoginResultDTO>> Login([FromBody] LoginDTO login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == login.Email && u.Password == login.Password);
            if (user == null) return Unauthorized("Invalid email or password");
            string token = GenerateJwtToken(user);
            return Ok(new LoginResultDTO
            {
                Token = token,
                User = user,
            });
        }

        [Authorize]
        [HttpPost("add-tokens")]
        public async Task<ActionResult<UserModel>> UpdateTokens([FromBody] TokenRequestDTO request)
        {
            // Get user id from JWT
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return NotFound();

            user.Tokens += request.Amount;
            await _context.SaveChangesAsync();

            return Ok(user);
        }



        private string GenerateJwtToken(UserModel user)
        {
            var jwtSettings = _config.GetSection("Jwt");

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim("role", user.UserType ?? "member"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(int.Parse(jwtSettings["ExpiresMinutes"]!)),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
