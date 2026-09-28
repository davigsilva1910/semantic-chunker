const fs = require('fs')
const { parse } = require('csv-parse/sync')
const { extractFeatures } = require('./structure/extractFeatures')
const { structuralContext } = require('./structure/structuralContext')
const { structuralClassifier } = require('./structure/structuralClassifier')
const { hierarchyBuilder } = require('./structure/hierarchyBuilder')
const { structuralBlocks } = require('./structure/structuralBlocks')
const { blockToText } = require('./structure/blockToText')
const { gerarEmbeddings } = require('./structure/embeddings')
const { semanticUnits } = require('./structure/semanticUnits')
const { centroid } = require('./structure/centroid')
const { semanticChunker } = require('./structure/semanticChunker')
const { finalizeChunks } = require('./structure/finalizeChunks')

async function main() {

    const conteudo = fs.readFileSync('documento_teste_estrutura_chunking.csv', 'utf-8')

    const conteudoEstruturado = parse(conteudo, {
        columns: true,
        skip_empty_lines: true
    })

    const retornosGerais = structuralContext(conteudoEstruturado)

    const result = conteudoEstruturado.map((registro, index) => {

        const features = extractFeatures(registro)

        const contexto = retornosGerais[index]

        const registroEnriquecido = {
            ...registro,
            ...features,
            ...contexto
        }

        const classifier = structuralClassifier(registroEnriquecido)

        return {
            ...registroEnriquecido,
            ...classifier
        }
    })

    const arvore = hierarchyBuilder(result);

    // console.dir(arvore, { depth: null });

    const blocosEstruturados = structuralBlocks(arvore)

    const unidadesSemanticas = semanticUnits(blocosEstruturados)

    const textos = unidadesSemanticas.map(unidade => unidade.texto)

    const embeddings = await gerarEmbeddings(textos)

    const chunks = semanticChunker(
        unidadesSemanticas,
        embeddings
    )

    const chunksFinais = finalizeChunks(chunks)

    console.dir(chunksFinais, { depth: null })

    // const centroide = centroid(embeddings)

    // console.log("Dimensão do centroide:", centroide.length)

    // console.log("Quantidade de embeddings:", embeddings.length)
    // console.log("Dimensão do primeiro embedding:", embeddings[0].length)

    // const blocoParaTexto = blockToText(blocosEstruturados)

    // const textos = blocoParaTexto.map(bloco => bloco.texto)

    // const embeddings = await gerarEmbeddings(textos)

    // console.dir(unidadesSemanticas, { depth: null })

    // console.log("Quantidade de embeddings:", embeddings.length)
    // console.log("Dimensão do primeiro embedding:", embeddings[0].length)

}

main()