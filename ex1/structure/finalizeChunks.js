const { centroid } = require('./centroid');

function finalizeChunks(chunks) {

    return chunks.map(chunk => {

        const texto = [
            chunk.unidades[0].titulo,
            ...chunk.unidades.map(unidade => {
                const prefixo = `${unidade.titulo}\n\n`;

                return unidade.texto.replace(prefixo, '');
            })
        ].join('\n\n');

        const embedding = centroid(chunk.embeddings);

        return {
            texto,
            embedding,
            metadados: {
                indiceBloco: chunk.unidades[0].indiceBloco,
                titulo: chunk.unidades[0].titulo,
                quantidadeUnidades: chunk.unidades.length
            }
        };
    });
}

module.exports = {
    finalizeChunks
};