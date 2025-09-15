using DataAccessLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace RestApi.Controllers
{
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
        public async Task<ActionResult<ServicePurchaseModel>> CreatePurchase([FromBody] ServicePurchaseModel purchase)
        {
            purchase.Date = DateTime.UtcNow;
            purchase.Status = "pending";
            _context.ServicePurchases.Add(purchase);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPurchases), new { id = purchase.Id }, purchase);
        }

        [HttpPut("{id}/approve")]
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
