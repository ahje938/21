using BakOverskriftene.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace HK_BakOverskriftene {
    public static class SeedData {
        public static async Task Initialize(IServiceProvider services, UserManager<Player> userManager, RoleManager<IdentityRole> roleManager) {
            var user = await userManager.FindByNameAsync("player1");  // Check if player exists

            if (user == null) {
                // Add dummy players (you can change the usernames and other details)
                var players = new List<Player>
                {
                    new Player { UserName = "player1", Email = "player1@example.com", SecretQuestion = "Pet's Name", SecretAnswer = "Fluffy" },
                    new Player { UserName = "player2", Email = "player2@example.com", SecretQuestion = "Mother's Maiden Name", SecretAnswer = "Smith" },
                    new Player { UserName = "player3", Email = "player3@example.com", SecretQuestion = "Favorite Color", SecretAnswer = "Blue" },
                    // Add more players as needed...
                };

                foreach (var player in players) {
                    var result = await userManager.CreateAsync(player, "Password123!");  // Use a simple password for seeding
                    if (result.Succeeded) {
                        // Assign the player role or any other logic you need
                        await userManager.AddToRoleAsync(player, "Player");
                    }
                }
            }
        }
    }
}
