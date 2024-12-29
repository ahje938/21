using BakOverskriftene.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakOverskriftene.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase {
        private readonly UserManager<Player> _userManager;

        public PlayersController(UserManager<Player> userManager) {
            _userManager = userManager;
        }

        // Method to fetch all players
        [HttpGet]
        public async Task<IActionResult> GetPlayers() {
            // Manually adding CORS headers
            Response.Headers.Add("Access-Control-Allow-Origin", "*"); // Allow all origins or specify your domain
            Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");

            var players = await _userManager.Users.ToListAsync();
            return Ok(players);
        }

        // Method to delete a player
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(string id) {
            // Manually adding CORS headers
            Response.Headers.Add("Access-Control-Allow-Origin", "*"); // Allow all origins or specify your domain
            Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");

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

        // Method to add a player
        [HttpPost]
        public async Task<IActionResult> AddPlayer([FromBody] AddPlayerRequest request) {
            // Manually adding CORS headers
            Response.Headers.Add("Access-Control-Allow-Origin", "*"); // Allow all origins or specify your domain
            Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");

            if (string.IsNullOrWhiteSpace(request.UserName) || string.IsNullOrWhiteSpace(request.Password)) {
                return BadRequest(new { message = "Username and password are required." });
            }

            var player = new Player { UserName = request.UserName, Email = request.Email };
            var result = await _userManager.CreateAsync(player, request.Password);

            if (result.Succeeded) {
                return Ok(new { message = "Player added successfully." });
            }

            return BadRequest(new {
                message = "Failed to add player",
                errors = result.Errors.Select(e => e.Description)
            });
        }
    }

    public class AddPlayerRequest {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
