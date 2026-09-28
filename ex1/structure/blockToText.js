function blockToText(blocos) {

    return blocos.map(bloco => {

        const conteudo = bloco.conteudo
            .map(item => item.texto)
            .join('\n\n');

        return {
            titulo: bloco.titulo,
            texto: `${bloco.titulo}\n\n${conteudo}`
        };
    });
}

module.exports = {
    blockToText
};