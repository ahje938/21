using BakOverskriftene.Domain.Models;

namespace BakOverskriftene.Models.Models {

    public class Module {

        public int Id { get; set; } //PK
        public string Name { get; set; }

        //Navigation Properties

        public List<Results> Results { get; set; } = new List<Results>();
        public List<Question> Questions { get; set; } = new List<Question>();
    }
}
