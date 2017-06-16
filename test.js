import test from 'ava';
import Graph from 'graph-core';
import { components, dfs } from '.';

test('algo::dfs', t => {
    const { g } = t.context;
    let d = dfs(g, g.vertex('foo'));
    console.log(JSON.stringify().map(({id}) => id), null, 2));
});