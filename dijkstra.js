const { match, premitives } = require('xype');

const DEFAULT_WEIGHT_FN = () => 1;

const getId = match([
    [premitives.string, id => id],
    [({id}) => id]
]);

module.exports = (graph, origin, weigtFn=DEFAULT_WEIGHT_FN) => {
    const vid = getId(origin);
    const distances = {};
};