using BakOverskriftene.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakOverskriftene.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase {
        private readonly UserManager<Player> _userManager;

        public PlayerController(UserManager<Player> userManager) {
            _userManager = userManager;
        }

        // Method to fetch all players
        [HttpGet]
        public async Task<IActionResult> GetPlayers() {
            var players = await _userManager.Users.ToListAsync();
            return Ok(players);
        }

        // Method to delete a player
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(string id) {
            var player = await _userManager.FindByIdAsync(id);
            if (player == null) {
                return NotFound(new { message = "Player not found" });
            }

            var result = await _userManager.DeleteAsync(player);
            if (result.Succeeded) {
                return Ok(new { message = "Player deleted successfully" });
            }

            return BadRequest(new { message = "Failed to delete player" });
        }
        [HttpPost]
        public async Task<IActionResult> AddPlayer([FromBody] AddPlayerRequest request) {
            if (string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password)) {
                return BadRequest("Username and password are required.");
            }

            var player = new Player { UserName = request.UserName, Email = request.Email };
            var result = await _userManager.CreateAsync(player, request.Password);

            if (result.Succeeded) {
                return Ok(new { Message = "Player added successfully." });
            }

            return BadRequest(result.Errors);
        }
    }

    public class AddPlayerRequest {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

