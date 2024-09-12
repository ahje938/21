﻿using BakOverskriftene.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakOverskriftene.Api.Controllers {

    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase {

        private readonly ApplicationDbContext _context;

        public QuestionsController(ApplicationDbContext context) {
            _context = context;
        }

        // POST: api/Questions/{sectionId}
        [HttpPost("{sectionId}")]
        public async Task<IActionResult> AddQuestion(int sectionId, [FromBody] QuestionCreateDTO questionDTO) {
            if (questionDTO == null || string.IsNullOrEmpty(questionDTO.QuestionText)) {
                return BadRequest("Invalid question data.");
            }

            if (questionDTO.SectionId != sectionId) {
                return BadRequest("Section ID mismatch.");
            }

            var section = await _context.Sections
                .Include(s => s.Questions)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) {
                return NotFound("Section not found.");
            }

            var question = new Question {
                QuestionText = questionDTO.QuestionText,
                SectionId = questionDTO.SectionId,
                Section = section
            };

            section.Questions.Add(question);

            try {
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetQuestionById), new { id = question.Id }, question);
            }
            catch (Exception ex) {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("section/{sectionId}")]
        public async Task<IActionResult> GetQuestionsBySection(int sectionId) {
            var section = await _context.Sections
                .Include(s => s.Questions)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) {
                return NotFound("Section not found.");
            }

            var questionDTOs = section.Questions
                .Select(q => new QuestionDisplayDTO {
                    Id = q.Id,
                    QuestionText = q.QuestionText
                })
                .ToList();

            return Ok(questionDTOs);
        }

        // GET: api/Questions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuestionById(int id) {
            var question = await _context.Questions.FindAsync(id);
            if (question == null) {
                return NotFound();
            }

            return Ok(question);
        }
    }
}
