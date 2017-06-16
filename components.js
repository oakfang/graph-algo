module.exports = graph => {
    const visited = new Set();
    const chains = [];
    const dfs = (v, chain) => {
        if (!visited.has(v)) {
            visited.add(v);
            chain.push(v);
            for (const {target} of graph.outEdges(v.id)) {
                dfs(graph.vertex(target), chain);
            }
            for (const {origin} of graph.inEdges(v.id)) {
                dfs(graph.vertex(origin), chain);
            }
        }
        return chain;
    };
    for (const v of graph.vertices()) {
        const chain = dfs(v, []);
        if (chain.length) {
            chains.push(chain);
        }
    }
    return chains;
};