namespace BakOverskriftene.Domain.Models {

    public class Question {

        public int Id { get; set; }
        public string QuestionText { get; set; } = string.Empty;
        public int ModuleId { get; set; } //FK

        //Navigation Properties

        public Section Module { get; set; }
        public List<Answer> Answers { get; set; } = new List<Answer>();
    }
}
