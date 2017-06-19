module.exports = (graph, type) => {
    const visited = new Set();
    const dfsMapper = v => {
        visited.add(v);
        const out = Array.from(graph.allEdges(v.id)
                                    .filter(({type: edgeType}) =>
                                        type ? type === edgeType : true)
                                    .map(({origin, target}) =>
                                        graph.vertex(v.id === target ? origin : target))
                                    .filter(v => !visited.has(v))
                                    .map(dfsMapper));
        return [v, ...out];
    };
    return graph.vertices().filter(v => !visited.has(v)).map(dfsMapper);
};