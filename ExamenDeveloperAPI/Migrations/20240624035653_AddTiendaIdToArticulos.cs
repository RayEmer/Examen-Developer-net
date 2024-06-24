using Microsoft.EntityFrameworkCore.Migrations;

namespace ExamenDeveloperAPI.Migrations
{
    public partial class AddTiendaIdToArticulos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TiendaId",
                table: "Articulos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TiendaId",
                table: "Articulos");
        }
    }
}
