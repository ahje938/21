namespace BakOverskriftene.Domain.Models {

    public class Results {

        public int Id { get; set; } //PK
        public int Score { get; set; }
        public int SectionId { get; set; } //FK
        public string PlayerId { get; set; } //FK

        //Navigation Properties

        public Section Section { get; set; }
        public Player Player { get; set; }
    }
}
