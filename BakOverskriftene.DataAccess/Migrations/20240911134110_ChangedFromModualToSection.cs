using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BakOverskriftene.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class ChangedFromModualToSection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Sections_ModuleId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Results_Sections_ModuleId",
                table: "Results");

            migrationBuilder.RenameColumn(
                name: "ModuleId",
                table: "Results",
                newName: "SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_Results_ModuleId",
                table: "Results",
                newName: "IX_Results_SectionId");

            migrationBuilder.RenameColumn(
                name: "ModuleId",
                table: "Questions",
                newName: "SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_Questions_ModuleId",
                table: "Questions",
                newName: "IX_Questions_SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Sections_SectionId",
                table: "Questions",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Sections_SectionId",
                table: "Results",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_Sections_SectionId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Results_Sections_SectionId",
                table: "Results");

            migrationBuilder.RenameColumn(
                name: "SectionId",
                table: "Results",
                newName: "ModuleId");

            migrationBuilder.RenameIndex(
                name: "IX_Results_SectionId",
                table: "Results",
                newName: "IX_Results_ModuleId");

            migrationBuilder.RenameColumn(
                name: "SectionId",
                table: "Questions",
                newName: "ModuleId");

            migrationBuilder.RenameIndex(
                name: "IX_Questions_SectionId",
                table: "Questions",
                newName: "IX_Questions_ModuleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_Sections_ModuleId",
                table: "Questions",
                column: "ModuleId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Results_Sections_ModuleId",
                table: "Results",
                column: "ModuleId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
