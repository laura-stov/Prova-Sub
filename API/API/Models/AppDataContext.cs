using Microsoft.EntityFrameworkCore;

namespace API.Models;

public class AppDataContext : DbContext{
    public DbSet<Aluno> Alunos { get; set; }
    public DbSet<Imc> Imcs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){
        optionsBuilder.UseSqlite("Data Source=banco.db");
    }
}