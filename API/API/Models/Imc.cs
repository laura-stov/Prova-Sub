namespace API.Models;

public class Imc{
    public int ImcId { get; set; }
    public double ImcConta { get; set; }
    public double Altura { get; set; }
    public double Peso { get; set; }
    public string Classificacao { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
    public int AlunoId { get; set; }
    public Aluno? Aluno { get; set; }
}