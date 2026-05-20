$(document).ready(function(){
    $("#CNPJ").mask('00.000.000/0000-00', { reverse: true });
});

const ref = db.ref("Fornecedores");

let idcapturado = null;
$("#cancelar").hide();

$("#salvar").click(function (){
    let nome = $("#nome").val();
    let cnpj = $("#CNPJ").val();
    let email = $("#email").val();
    let estado = $("input[name='estado']:checked").val();

    if(nome === "" || email === "" || cnpj === "" || !estado){
        alert('Preencha todos os campos');
        return;
    }

    if (idcapturado) {//editar
        ref.child(idcapturado).update({ nome, email, cnpj, estado });
        idcapturado = null;
        $("#salvar").text("Salvar");

        $("#cancelar").hide();
        $("#salvar").removeClass("btn-success").addClass("btn-primary");
        $("#status"). text("");
    } else {//salvar
        ref.push({ nome, email, cnpj, estado});
    }

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
                    <button class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline-warning btn-sm" onclick="editar('${id}','${reg.nome}','${reg.cnpj}','${reg.email}','${reg.estado}')">
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

function editar(id, nome, cnpj, email, estado) {
    $("#nome").val(nome);
    $("#CNPJ").val(cnpj);
    $("#email").val(email);
    $("input[name='estado']:checked").val(estado);

    idcapturado = id;

    $("#cancelar").show();

    $("#salvar")
        .text("Atualizar")
        .removeClass("btn-primary")
        .addClass("btn-success");

    $("#status"). text("Editando registro...");
}