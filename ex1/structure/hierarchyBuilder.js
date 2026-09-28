function hierarchyBuilder(registros) {
    // raiz da arvore
    const documento = {
        tipo: "DOCUMENT",
        filhos: []
    };

    let contextoAtual = null;

    // Percorrendo por todos os registros
    for (const registro of registros) {
        // O que fazer quando encontra um HEADING
        if (registro.classificacao === "HEADING") {

            // Cria um nó 
            const no = {
                tipo: "HEADING",
                texto: registro.texto,
                filhos: []
            };

            documento.filhos.push(no); // Puxa para dentro da arvore documento

            contextoAtual = no; // Recebe o no como contexto atual

        }

        // Se encontrar um PARAGRAPH, coloca dentro do nó do HEADING
        if (registro.classificacao === "PARAGRAPH") {

            const no = {
                tipo: "PARAGRAPH",
                texto: registro.texto
            };

            // Se contexto atual existir já, coloca dentro do nó dele, caso não, adiciona direto no documento
            if (contextoAtual) {
                contextoAtual.filhos.push(no);
            } else {
                documento.filhos.push(no);
            }
        }

        // Mesma coisa do anterior        
        if (registro.classificacao === "TABLE") {

            const no = {
                tipo: "TABLE",
                texto: registro.texto
            };

            if (contextoAtual) {
                contextoAtual.filhos.push(no);
            } else {
                documento.filhos.push(no);
            }
        }
    }

    return documento
}

module.exports = {
    hierarchyBuilder
};