using DataAccessLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Security.Claims;

namespace RestApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServicePurchaseController : ControllerBase
    {
        private readonly ModelContext _context;

        public ServicePurchaseController(ModelContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ServicePurchaseModel>>> GetPurchases()
        {
            return await _context.ServicePurchases
                .Include(p => p.UserNavigation)
                .Include(p => p.ServiceNavigation)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<ServicePurchaseModel>> CreatePurchase([FromBody] ServicePurchaseDTO purchaseDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null) return NotFound();

            var service = await _context.Services.FirstOrDefaultAsync(s => s.Id == purchaseDto.Id);
            if (service == null) return NotFound();

            if (user.Tokens - service.TokenCost <= 0) return BadRequest("Insufficant funds");
            user.Tokens -= service.TokenCost;

            var purchase = new ServicePurchaseModel
            {
                User = userId,
                Service = purchaseDto.Id,
                Date = DateTime.UtcNow,
                Status = "pending",
                TemporalTokenCost = service.TokenCost,
            };
            _context.ServicePurchases.Add(purchase);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPurchases), new { id = purchase.Id }, purchase);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ApprovePurchase(int id)
        {
            var purchase = await _context.ServicePurchases.FindAsync(id);
            if (purchase == null) return NotFound();

            purchase.Status = "approved";
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
