namespace BakOverskriftene.Models.Models {

    public class Answer {

        public int Id { get; set; } //PK
        public string AnswerText { get; set; }
        public bool Correct { get; set; }
        public int QuestionId { get; set; } //FK

        //Navigation Properties

        public Question Question { get; set; }
    }
}
