namespace BakOverskriftene.Models.Models {

    public class Question {

        public int Id { get; set; }
        public string QuestionText { get; set; } = string.Empty;
        public int ModuleId { get; set; } //FK

        //Navigation Properties

        public Module Module { get; set; }
        public List<Answer> Answers { get; set; } = new List<Answer>();
    }
}
