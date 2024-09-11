namespace BakOverskriftene.Domain.Models {

    public class Section {

        public int Id { get; set; } //PK
        public string Name { get; set; }

        //Navigation Properties

        public List<Results> Results { get; set; } = new List<Results>();
        public List<Question> Questions { get; set; } = new List<Question>();
    }
}
