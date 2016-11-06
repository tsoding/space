function vector_length(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

function vector_angle(v) {
    return Math.atan2(v[1], v[0]);
}

function vector_sum(v1, ...vs) {
    let result = v1.slice();

    vs.forEach(function(v) {
        result[0] += v[0];
        result[1] += v[1];
    });

    return result;
}

function angle_to_vector(angle) {
    return [Math.cos(angle),
            Math.sin(angle)];
}

function normalize_vector(v) {
    let l = vector_length(v);
    return [v[0] / l, v[1] / l];
}

function snap_with_direction(point, direction, width, height) {
    let adx = Math.abs(direction[0]);
    let ady = Math.abs(direction[1]);

    if (Math.random() * (adx + ady) <= adx) {
        if (direction[0] <= 0.0) {
            point[0] = width;
        } else {
            point[0] = 0;
        }
    } else {
        if (direction[1] <= 0.0) {
            point[1] = height;
        } else {
            point[1] = 0;
        }
    }
}

function negative_vector(vector) {
    return [-vector[0], -vector[1]];
}

function magnify_vector(vector, factor) {
    return [vector[0] * factor, vector[1] * factor];
}
