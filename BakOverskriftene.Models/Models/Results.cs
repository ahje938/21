namespace BakOverskriftene.Domain.Models {

    public class Results {

        public int Id { get; set; } //PK
        public int Score { get; set; }
        public int ModuleId { get; set; } //FK
        public int PlayerId { get; set; } //FK

        //Navigation Properties

        public Section Module { get; set; }
        public Player Player { get; set; }
    }
}
