using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin()
    )
);

var app = builder.Build();

app.MapGet("/", () => "Prova Substitutiva");

//POST http://localhost:5151/aluno/cadastrar
app.MapPost("/aluno/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Aluno aluno) => {   
    ctx.Alunos.Add(aluno);
    ctx.SaveChanges();
    return Results.Created("", aluno);
});

//POST http://localhost:5151/imc/cadastrar
app.MapPost("/imc/cadastrar", ([FromBody] Imc imc, [FromServices] AppDataContext ctx) => {
    Aluno? aluno = ctx.Alunos.Find(imc.AlunoId);

    if(aluno is null){
        return Results.NotFound("Aluno não encontrado");
    }

    imc.Aluno = aluno;
    
    imc.ImcConta = imc.Peso / (imc.Altura * imc.Altura);

    if(imc.ImcConta < 18.5){
        imc.Classificacao = "Magreza";
    }
    else if(imc.ImcConta >= 18.5 && imc.ImcConta <= 24.9){
        imc.Classificacao = "Normal";
    }
    else if(imc.ImcConta >= 25 && imc.ImcConta <= 29.9){
        imc.Classificacao = "Sobrepeso";
    }
    else if(imc.ImcConta >= 30 && imc.ImcConta <= 39.9){
        imc.Classificacao = "Obesidade";
    }
    else{
        imc.Classificacao = "Obesidade Grave";
    }

    ctx.Imcs.Add(imc);
    ctx.SaveChanges();
    return Results.Created($"/aluno/{imc.ImcId}", imc);    
});

app.MapGet("/imc/listar", ([FromServices] AppDataContext ctx) => {
    var imcs = ctx.Imcs.Include(x => x.Aluno).ToList();
    if(imcs.Any()){
        return Results.Ok(imcs);
    }
    return Results.NotFound();
});

// FAZER LISTAR POR ALUNOO

app.MapPut("/imc/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] int id, [FromBody] Imc imcAlterado) => {
    Imc? imc = ctx.Imcs.Find(id);
    if(imc == null){
        return Results.NotFound("Imc não encontrado");
    }

    Aluno? aluno = ctx.Alunos.Find(imcAlterado.AlunoId);
    if(aluno == null){
        return Results.NotFound("Aluno não encontrado");
    }

    imc.Peso = imcAlterado.Peso;
    imc.Altura = imcAlterado.Altura;

    ctx.Imcs.Update(imc);
    ctx.SaveChanges();
    return Results.Ok(imc);
});

app.MapGet("/imc/listarporaluno/{nome}/{sobrenome}", ([FromServices] AppDataContext ctx, [FromRoute] string nome, [FromRoute] string sobrenome) => {
    Imc? imc = ctx.Imcs.
        Include(x => x.Aluno).
        FirstOrDefault(a => a.Aluno.Sobrenome == sobrenome && a.Aluno.Nome == nome);

    if(imc == null){
        return Results.NotFound("Imc não encontrado");
    }

    return Results.Ok(imc);
});

app.MapGet("/aluno/listar", ([FromServices] AppDataContext ctx) => {
    if(ctx.Alunos.Any()){
        return Results.Ok(ctx.Alunos.ToList());
    }
    return Results.NotFound("Nenhum aluno encontrado");
});

app.UseCors("Acesso Total");
app.Run();
