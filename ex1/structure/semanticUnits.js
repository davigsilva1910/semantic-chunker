function semanticUnits(blocos) {

    const unidades = [];

    for (let i = 0; i < blocos.length; i++) {

        const bloco = blocos[i];

        for (const item of bloco.conteudo) {

            unidades.push({
                indiceBloco: i,
                titulo: bloco.titulo,
                tipo: item.tipo,
                texto: `${bloco.titulo}\n\n${item.texto}`
            });
        }
    }

    return unidades;
}

module.exports = {
    semanticUnits
};