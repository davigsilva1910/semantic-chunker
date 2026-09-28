function structuralBlocks(arvore) {

    const blocos = [];

    // Percorre por cada nó da arvore de documentos 
    // A base inicial, os headings
    for (const no of arvore.filhos) {

        if (no.tipo === "HEADING") {

            // Insere os textos
            const bloco = {
                tipo: "STRUCTURAL_BLOCK",
                titulo: no.texto,
                conteudo: no.filhos
            };

            blocos.push(bloco);
        }
    }

    return blocos;
}

module.exports = {
    structuralBlocks
};