using BakOverskriftene.Domain.Models.DTO_s;
using Microsoft.AspNetCore.Mvc;

namespace HK_BakOverskriftene.Controllers {

    [Route("api/[controller]")]
    [ApiController]

    public class CmsLoginController : ControllerBase {

        /// <summary>
        /// Hardcoded the username and password. Will need to put credentials in the database at some point. 
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [HttpPost("login")]
        public IActionResult Login([FromBody] CmsLoginDTO login) {
            // Hardcoded credentials
            const string hardcodedUsername = "admin";
            const string hardcodedPassword = "password123";

            if (login.Username == hardcodedUsername && login.Password == hardcodedPassword) {
                return Ok(new { message = "Login successful" });
            }

            return Unauthorized(new { message = "Invalid username or password" });
        }
    }
}
