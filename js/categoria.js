const ref = db.ref("Categorias");

$("#salvar").click(function (){
    let nome = $("#nome").val();
    let informações = $("#informações").val();

    if(nome === "" || informações === ""){
        alert('Preencha todos os campos');
        return;
    }

    ref.push({nome , informações});
    limpar();
});

function limpar(){
    $("#nome").val("");
    $("#informações").val("");
    $("#nome").focus();
    alert('Categoria cadastrada com sucesso!');
};