const { normalize } = require('./array_normalizer');

function centroid(vectors) {

    const dimensions = vectors[0].length;

    const center = new Array(dimensions).fill(0);

    for (const vector of vectors) {

        for (let i = 0; i < dimensions; i++) {

            center[i] += vector[i];
        }
    }

    for (let i = 0; i < dimensions; i++) {

        center[i] /= vectors.length;
    }

    return normalize(center);
}

module.exports = {
    centroid
};