const ref = db.ref("Clientes");

$("#salvar").click(function (){
    let nome = $("#nome").val();
    let email = $("#email").val();

    if(nome === "" || email === ""){
        alert('Preencha todos os campos');
        return;
    }

    ref.push({nome , email});
    limpar();
});

function limpar(){
    $("#nome").val("");
    $("#email").val("");
    $("#nome").focus();
    alert('Cliente cadastrado com sucesso!');
};