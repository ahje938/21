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

        [HttpGet]
        public async Task<IActionResult> GetAllSections() {
            var sections = await _context.Sections
                .Select(s => new SectionListDTO {
                    Id = s.Id,
                    SectionName = s.Name
                })
                .ToListAsync();

            return Ok(sections);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSection(int id) {
            var section = await _context.Sections.FindAsync(id);

            if (section == null) {
                return NotFound();
            }

            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSection(int id, [FromBody] Section updatedSection) {
            if (updatedSection == null || string.IsNullOrEmpty(updatedSection.Name)) {
                return BadRequest("Invalid section data.");
            }

            var section = await _context.Sections.FindAsync(id);
            if (section == null) {
                return NotFound();
            }

            section.Name = updatedSection.Name;
            await _context.SaveChangesAsync();

            return Ok(section);
        }
        [HttpGet("WithDetails")]
        public async Task<IActionResult> GetSectionsWithQuestionsAndAnswers() {
            var sections = await _context.Sections
                .Include(s => s.Questions)
                .ThenInclude(q => q.Answers)
                .Select(s => new SectionDetailsDTO {
                    Id = s.Id,
                    SectionName = s.Name,
                    Questions = s.Questions.Select(q => new QuestionDetailsDTO {
                        Id = q.Id,
                        QuestionText = q.QuestionText,
                        Answers = q.Answers.Select(a => new AnswerDetailsDTO {
                            Id = a.Id,
                            AnswerText = a.AnswerText,
                            IsCorrect = a.Correct
                        }).ToList()
                    }).ToList()
                })
                .ToListAsync();

            return Ok(sections);
        }



    }
}
