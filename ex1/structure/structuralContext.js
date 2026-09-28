function structuralContext(registros) {

    const contagem = registros
        .map(r => r.pagina)
        .reduce(
            (acc, pagina) => {
                acc[pagina] = (acc[pagina] || 0) + 1;
                return acc;
            },
            {}
        );

    const posicoes = {};

    const contextos = registros.map(registro => {

        const pagina = registro.pagina;

        posicoes[pagina] =
            (posicoes[pagina] || 0) + 1;

        const posicaoNaPagina =
            posicoes[pagina];

        const totalLinhasPagina =
            contagem[pagina];

        return {
            totalLinhasPagina,
            posicaoNaPagina,
            proporcaoNaPagina:
                posicaoNaPagina / totalLinhasPagina
        };
    });

    return contextos;
}

module.exports = {
    structuralContext
};