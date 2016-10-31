function vector_length(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

function normalize_vector(v) {
    let l = vector_length(v);
    return [v[0] / l, v[1] / l];
}
