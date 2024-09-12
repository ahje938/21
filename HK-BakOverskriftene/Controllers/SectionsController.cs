using BakOverskriftene.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakOverskriftene.Api.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class SectionController : ControllerBase {

        private readonly ApplicationDbContext _context;

        public SectionController(ApplicationDbContext context) {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSection([FromBody] Section section) {
            if (section == null || string.IsNullOrEmpty(section.Name)) {
                return BadRequest("Invalid section data.");
            }

            // Initialize an empty list of questions
            section.Questions = new List<Question>();

            _context.Sections.Add(section);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSectionById), new { id = section.Id }, section);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSectionById(int id) {
            var section = await _context.Sections
                .Include(s => s.Questions) // Include questions if needed
                .FirstOrDefaultAsync(s => s.Id == id);

            if (section == null) {
                return NotFound();
            }

            return Ok(section);
        }

        // Add additional endpoints as needed
    }
}
