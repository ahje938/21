using BakOverskriftene.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakOverskriftene.Api.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public AnswersController(ApplicationDbContext context) {
            _context = context;
        }

        // Create an answer
        // POST: api/answers/{questionId}
        [HttpPost("{questionId}")]
        public async Task<IActionResult> CreateAnswer(int questionId, [FromBody] AnswerDTO answerDto) {
            if (answerDto == null || string.IsNullOrEmpty(answerDto.AnswerText)) {
                return BadRequest("Invalid answer data.");
            }

            if (answerDto.QuestionId != questionId) {
                return BadRequest("Question ID mismatch.");
            }

            var question = await _context.Questions
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == questionId);

            if (question == null) {
                return NotFound("Question not found.");
            }

            var answer = new Answer {
                AnswerText = answerDto.AnswerText,
                Correct = answerDto.Correct,
                QuestionId = answerDto.QuestionId,
                Question = question
            };

            question.Answers.Add(answer);  // Associate answer with the question

            try {
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetAnswerById), new { id = answer.Id }, answer);
            }
            catch (Exception ex) {
                return StatusCode(500, "Internal server error");
            }
        }


        // Get answer by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnswerById(int id) {
            var answer = await _context.Answers.FindAsync(id);

            if (answer == null) {
                return NotFound();
            }

            return Ok(answer);
        }

        // Get all answers for a specific question
        [HttpGet("question/{questionId}")]
        public async Task<IActionResult> GetAnswersByQuestionId(int questionId) {
            var answers = await _context.Answers
                .Where(a => a.QuestionId == questionId)
                .ToListAsync();

            return Ok(answers);
        }
        // PUT: api/answers/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAnswer(int id, [FromBody] AnswerDTO answerDto) {
            if (answerDto == null || string.IsNullOrEmpty(answerDto.AnswerText)) {
                return BadRequest("Invalid answer data.");
            }

            var answer = await _context.Answers.FindAsync(id);
            if (answer == null) {
                return NotFound("Answer not found.");
            }

            answer.AnswerText = answerDto.AnswerText;
            answer.Correct = answerDto.Correct;

            try {
                await _context.SaveChangesAsync();
                return Ok(answer);
            }
            catch (Exception ex) {
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/answers/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnswer(int id) {
            var answer = await _context.Answers.FindAsync(id);
            if (answer == null) {
                return NotFound("Answer not found.");
            }

            _context.Answers.Remove(answer);

            try {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex) {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
