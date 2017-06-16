function doDfs(graph, vertex, visited, acc, postorder) {
    if (!visited.has(vertex)) {
        visited.add(vertex);
        if (!postorder) acc.push(vertex);
        for (const _v of
             graph.outEdges(vertex.id)
                  .map(({target}) => graph.vertex(target))) {
            doDfs(graph, vertex, visited, acc, postorder);
        }
        if (postorder) acc.push(vertex);
    }
}

module.exports = (graph, vertices, order='post') => {
    if (!vertices[Symbol.iterator]) {
        vertices = [vertices];
    }
    const visited = new Set();
    const acc = [];
    for (const v of vertices) {
        doDfs(graph, v, visited, acc, order === 'post');
    }
    return acc;
};