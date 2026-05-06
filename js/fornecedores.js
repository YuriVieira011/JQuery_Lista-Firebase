$(document).ready(function(){
    $("#CNPJ").mask('00.000.000/0000-00', { reverse: true });
});

const ref = db.ref("Fornecedores");

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

ref.on("value", dados_tabela => {
    $("#lista").empty();
    
    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>E-mail</th>
            <th>estado</th>
            <th colspan="2">Opções</th>
        </tr>
        `);

    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;

        $("#lista").append(`
            <tr>
                <td>${id}</td>
                <td>${reg.nome}</td>
                <td>${reg.cnpj}</td>
                <td>${reg.email}</td>
                <td>${reg.estado}</td>
                <td>
                    <button class="btn btn-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
            `);
    });
});

function limpar(){
    $("#nome").val("");
    $("#email").val("");
    $("#CNPJ").val("");
    $("input[name='estado']").prop('checked', false);
    $("#nome").focus();
    alert('Fornecedor cadastrado com sucesso!');
};