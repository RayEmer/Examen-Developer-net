using Microsoft.EntityFrameworkCore.Migrations;

namespace ExamenDeveloperAPI.Migrations
{
    public partial class AddCantidadToClienteArticulo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Cantidad",
                table: "ClienteArticulos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cantidad",
                table: "ClienteArticulos");
        }
    }
}
