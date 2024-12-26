using Microsoft.AspNetCore.Identity;

namespace BakOverskriftene.Domain.Models
{

    public class Player : IdentityUser
    { //Extend IdentityUser

        public string SecretQuestion { get; set; }
        public string SecretAnswer { get; set; }

        //Navigation Properties

        public List<Results> Results { get; set; } = new List<Results>();
    }
}
