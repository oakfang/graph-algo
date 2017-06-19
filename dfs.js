const { match, typeby } = require('xype');
const iter = require('itercol');

const Iterable = typeby(val => (typeof val === 'object') && val[Symbol.iterator]);
const normalize = match([
    [Iterable, iter],
    [x => iter([x])],
]);

module.exports = (graph, vertices, postorder=true, type) => {
    const visited = new Set();
    const dfsMapper = v => {
        visited.add(v);
        const out = Array.from(graph.outEdges(v.id)
                                    .filter(({type: edgeType}) =>
                                        type ? type === edgeType : true)
                                    .map(({target}) =>
                                        graph.vertex(target))
                                    .filter(v => !visited.has(v))
                                    .map(dfsMapper)
                                    .flatten());
        return postorder ? [...out, v] : [v, ...out];
    };
    return normalize(vertices)
            .filter(v => !visited.has(v))
            .map(dfsMapper)
            .flatten();
};