function semanticUnits(blocos) {

    const unidades = [];

    for (let i = 0; i < blocos.length; i++) {

        const bloco = blocos[i];

        for (const item of bloco.conteudo) {

            if (bloco.titulo !== null) {
                unidades.push({
                    indiceBloco: i,
                    titulo: bloco.titulo,
                    tipo: item.tipo,
                    texto: `${bloco.titulo}\n\n${item.texto}`,
                    barreiraEstrutural: bloco.barreiraEstrutural
                });
            } else {
                unidades.push({
                    indiceBloco: i,
                    titulo: bloco.titulo,
                    tipo: item.tipo,
                    texto: `${item.texto}`,
                    barreiraEstrutural: bloco.barreiraEstrutural
                });
            }
        }
    }

    return unidades;
}

module.exports = {
    semanticUnits
};