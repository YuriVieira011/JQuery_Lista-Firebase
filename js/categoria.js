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
    $("#informações").val("");
    $("#nome").focus();
    alert('Categoria cadastrada com sucesso!');
};