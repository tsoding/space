function is_pos(x) {
    return x > 0;
}

function is_neg(x) {
    return x < 0;
}

function is_zero(x) {
    return x === 0;
}

function snap_with_direction(point, direction, width, height) {
    // TODO: try to implement axis snapping without tables
    const snappers =
              [or(snap_axis(0, 0), snap_axis(1, 0)),
               or(snap_axis(0, width), snap_axis(1, 0)),
               or(snap_axis(0, width), snap_axis(1, height)),
               or(snap_axis(0, 0), snap_axis(1, height)),

               snap_axis(0, 0),
               snap_axis(1, 0),
               snap_axis(0, width),
               snap_axis(1, height),

               nothing()];
    snappers[kind_of_vector(direction)](point);
}

function kind_of_vector(vector) {
    return [[is_pos, is_pos],   // quadrants
            [is_neg, is_pos],
            [is_neg, is_neg],
            [is_pos, is_neg],

            [is_pos, is_zero],  // axis
            [is_zero, is_pos],
            [is_neg, is_zero],
            [is_zero, is_neg],

            [is_zero, is_zero]] // special case
        .findIndex(function(predicate) {
            return predicate[0](vector[0]) && predicate[1](vector[1]);
        });
}

function snap_axis(axis, value) {
    return function(point) {
        point[axis] = value;
    };
}

function or(f1, f2) {
    return function(x) {
        if (Math.random() * 2 < 1) {
            f1(x);
        } else {
            f2(x);
        }
    };
}

function nothing() {
    return function(x) {};
}
