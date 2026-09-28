function structuralClassifier(registro) {
    const scores = {
        TITLE: 0,
        HEADING: 0,
        PARAGRAPH: 0,
        LIST: 0,
        TABLE: 0,
        UNKNOWN: 0
    };

    const features = registro.features;
    
    if (features.possuiPipe) {
        scores.TABLE += 5;
    }

    if (features.quantidadeColunas >= 2) {
        scores.TABLE += 3;
    }

    if(features.quantidadePalavras >=7) {
        scores.PARAGRAPH += 2
    }

    if(features.terminaComPontuacao) {
        scores.PARAGRAPH += 3;
    }

    if(features.quantidadePalavras <=6) {
        scores.HEADING +=2
    }

    if(!features.terminaComPontuacao) {
        scores.HEADING += 2
    }

    if(features.comecaComNumero) {
        scores.HEADING += 4
    }

    // Encontra o maior score
    const maiorScore = Object.entries(scores).reduce(
        (maiorAtual, atual) => {

            if (atual[1] > maiorAtual[1]) {
                return atual;
            }

            return maiorAtual;
        }
    );

    // Pega o nome da classificação
    const classificacao = maiorScore[0];

    return {
        classificacao,
        scores
    };
}

module.exports = {
    structuralClassifier
};