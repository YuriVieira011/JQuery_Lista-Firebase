const ref = db.ref("Categorias");

let idcapturado = null;
$("#cancelar").hide();

$("#salvar").click(function (){
    let nome = $("#nome").val();
    let informações = $("#informações").val();

    if(nome === "" || informações === ""){
        alert('Preencha todos os campos');
        return;
    }

    if (idcapturado) {//editar
        ref.child(idcapturado).update({ nome, informações });
        idcapturado = null;
        $("#salvar").text("Salvar");

        $("#cancelar").hide();
        $("#salvar").removeClass("btn-success").addClass("btn-primary");
        $("#status"). text("");
    } else {//salvar
        ref.push({ nome, informações });
    }

    limpar();
});

ref.on("value", dados_tabela => {
    $("#lista").empty();
    
    $("#lista").append(`
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Informações</th>
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
                <td>${reg.informações}</td>
                <td>
                    <button class="btn btn-outline-danger btn-sm">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-outline-warning btn-sm" onclick="editar('${id}','${reg.nome}','${reg.informações}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
            `);
    });
});

function limpar(){
    $("#nome").val("");
    $("#informações").val("");
    $("#nome").focus();
    alert('Categoria cadastrada com sucesso!');
};

function editar(id, nome, informações) {
    $("#nome").val(nome);
    $("#informações").val(informações);

    idcapturado = id;

    $("#cancelar").show();

    $("#salvar")
        .text("Atualizar")
        .removeClass("btn-primary")
        .addClass("btn-success");

    $("#status"). text("Editando registro...");
}