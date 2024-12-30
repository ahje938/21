using BakOverskriftene.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakOverskriftene.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase {
        private readonly ApplicationDbContext _context;

        public PlayersController(ApplicationDbContext context) {
            _context = context;
        }

        // Method to fetch all players
        [HttpGet]
        public async Task<IActionResult> GetPlayers() {
            try {
                var players = await _context.Players.ToListAsync();
                return Ok(players);
            }
            catch (Exception ex) {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // Method to delete a player
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(string id) {
            try {
                var player = await _context.Players.FindAsync(id);
                if (player == null) {
                    return NotFound(new { message = "Player not found" });
                }

                _context.Players.Remove(player);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Player deleted successfully" });
            }
            catch (Exception ex) {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        // Method to add a player
        [HttpPost]
        public async Task<IActionResult> AddPlayer([FromBody] AddPlayerRequest request) {
            if (string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password)) {
                return BadRequest(new { message = "Username and password are required." });
            }

            var player = new Player {
                UserName = request.UserName,
                Email = request.Email,
                PasswordHash = new PasswordHasher<Player>().HashPassword(null, request.Password)
            };

            try {
                await _context.Players.AddAsync(player);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Player added successfully." });
            }
            catch (Exception ex) {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }

    public class AddPlayerRequest {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
