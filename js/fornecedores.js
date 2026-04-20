$(document).ready(function(){
    $("#CNPJ").mask('00.000.000/0000-00', { reverse: true });
});

const ref = db.ref("fornecedores");

$("#salvar").click(function (){
    let nome = $("#nome").val();
    let cnpj = $("#CNPJ").val();
    let email = $("#email").val();
    let estado = $("input[name='estado']:checked").val();

    if(nome === "" || email === "" || cnpj === "" || !estado){
        alert('Preencha todos os campos');
        return;
    }

    ref.push({nome , email, cnpj, estado});
    limpar();
});



function limpar(){
    $("#nome").val("");
    $("#email").val("");
    $("#CNPJ").val("");
    $("input[name='estado']").prop('checked', false);
    $("#nome").focus();
    alert('Fornecedor cadastrado com sucesso!');
};