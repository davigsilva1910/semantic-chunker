const { pipeline } = require('@xenova/transformers');

let extractor;

async function gerarEmbeddings(textos) {

    if (!extractor) {
        extractor = await pipeline(
            'feature-extraction',
            'Xenova/all-MiniLM-L6-v2'
        );
    }

    const embeddings = [];

    for (const texto of textos) {

        const output = await extractor(
            texto,
            {
                pooling: 'mean',
                normalize: true
            }
        );

        embeddings.push(
            Array.from(output.data)
        );
    }

    return embeddings;
}

module.exports = {
    gerarEmbeddings
};