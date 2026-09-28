const { centroid } = require('./centroid');
const { cosineSimilarity } = require('./similarity');

function semanticChunker(unidades, embeddings) {

    const chunks = [];

    let chunkAtual = {
        unidades: [],
        embeddings: []
    };

    for (let i = 0; i < unidades.length; i++) {

        const unidadeAtual = unidades[i];
        const embeddingAtual = embeddings[i];

        if (chunkAtual.embeddings.length === 0) {

            chunkAtual.unidades.push(unidadeAtual);
            chunkAtual.embeddings.push(embeddingAtual);

            continue;
        }

        const ultimoIndiceBloco =
            chunkAtual.unidades[chunkAtual.unidades.length - 1].indiceBloco;

        if (unidadeAtual.indiceBloco !== ultimoIndiceBloco) {

            chunks.push(chunkAtual);

            chunkAtual = {
                unidades: [unidadeAtual],
                embeddings: [embeddingAtual]
            };

            continue;
        }

        const centroideAtual = centroid(chunkAtual.embeddings);

        const similaridadeComCentroide =
            cosineSimilarity(centroideAtual, embeddingAtual);

        const embeddingAnterior =
            chunkAtual.embeddings[chunkAtual.embeddings.length - 1];

        const similaridadeComAnterior =
            cosineSimilarity(embeddingAnterior, embeddingAtual);
            
        const scoreSemantico =
            (similaridadeComAnterior * 0.4) +
            (similaridadeComCentroide * 0.6);

        console.log(
            `Unidade ${i} → centroide: ${similaridadeComCentroide.toFixed(3)} | anterior: ${similaridadeComAnterior.toFixed(3)} | score: ${scoreSemantico.toFixed(3)}`
        );

        if (scoreSemantico >= 0.35) {

            chunkAtual.unidades.push(unidadeAtual);
            chunkAtual.embeddings.push(embeddingAtual);

        } else {

            chunks.push(chunkAtual);

            chunkAtual = {
                unidades: [unidadeAtual],
                embeddings: [embeddingAtual]
            };
        }
    }

    if (chunkAtual.unidades.length > 0) {
        chunks.push(chunkAtual);
    }

    return chunks;
}

module.exports = {
    semanticChunker
};