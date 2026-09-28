function normalize(vector) {

    const magnitude = Math.sqrt(
        vector.reduce(
            (acc, value) => acc + value * value,
            0
        )
    );

    return vector.map(
        value => value / magnitude
    );
}

module.exports = {
    normalize
};