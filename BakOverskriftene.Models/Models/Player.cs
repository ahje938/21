using BakOverskriftene.Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace BakOverskriftene.Models.Models {

    public class Player : IdentityUser { //Extend IdentityUser

        public int Id { get; set; } //PK
        public string UserName { get; set; }
        public string Password { get; set; }
        public string SecretQuestion { get; set; }
        public string SecretAnswer { get; set; }

        //Navigation Properties

        public List<Results> Results { get; set; } = new List<Results>();
    }
}
