import test from 'ava';
import Graph from 'graph-core';
import { components, dfs } from '.';

test('algo::components', t => {
    const g = new Graph();
    t.is(Array.from(components(g)).length, 0);
    g.setVertex('a', 'Person');
    g.setVertex('b', 'Person');
    t.is(Array.from(components(g)).length, 2);
    g.setEdge('a', 'b', 'friends');
    t.is(Array.from(components(g)).length, 1);
    t.is(Array.from(components(g, 'friends')).length, 1);
    t.is(Array.from(components(g, 'foes')).length, 2);
    g.setVertex('c', 'Person');
    g.setEdge('c', 'b', 'foes');
    t.is(Array.from(components(g, 'friends')).length, 2);
    t.is(Array.from(components(g, 'foes')).length, 2);
});

test('algo::dfs', t => {
    const g = new Graph();
    t.is(Array.from(dfs(g, g.vertices())).length, 0);
    g.setVertex('a', 'Person');
    g.setVertex('b', 'Person');
    t.is(Array.from(dfs(g, g.vertices())).length, 2);
    t.is(Array.from(dfs(g, g.vertex('a'))).length, 1);
    g.setVertex('c', 'Person');
    g.setEdge('a', 'b', 'friends');
    g.setEdge('c', 'b', 'foes');
    let d = Array.from(dfs(g, g.vertex('a')).map(({id}) => id));
    t.deepEqual(d, ['b', 'a']);
    d = Array.from(dfs(g, g.vertex('a'), false).map(({id}) => id));
    t.deepEqual(d, ['a', 'b']);
    d = Array.from(dfs(g, g.vertex('a'), false, 'foes').map(({id}) => id));
    t.deepEqual(d, ['a']);
});