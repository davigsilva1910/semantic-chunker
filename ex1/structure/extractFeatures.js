function extractFeatures(registro) {

    const texto = registro.texto.trim();

    const quantidadePalavras =
        texto === "" ? 0 : texto.split(/\s+/).length;

    const terminaComPontuacao = /[.!?:;]$/.test(texto); // Regex que procura qualquer um desses caracteres

    // const comecaComMaiuscula = /[A-Z]/.test(texto[0])
    const comecaComMaiuscula = /^\p{Lu}/u.test(texto); // ^ - Inicio do texto, \p{Lu} - Unicode maiuscula, u- habilita suporte unicode

    const comecaComNumero = /^\d+(?:\.\d+)*\.?(?:\s|$)/.test(texto);

    const possuiPipe = /\|/.test(texto)

    const quantidadeColunas = texto.split('|').length;

    return {
        texto,
        features: {
            quantidadeCaracteres: texto.length,
            quantidadePalavras,
            terminaComPontuacao,
            comecaComMaiuscula,
            comecaComNumero,
            possuiPipe,
            quantidadeColunas
        }
    };
}

module.exports = {
    extractFeatures
};