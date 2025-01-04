import type { GraphData } from './types';
import { GraphViewer } from './index';
import './styles.css';
import { generateSierpinskiGraph } from './utils/generators';

const graphViewer = new GraphViewer(document.querySelector('canvas')!);
await graphViewer.init();

const url = 'test/fixtures/triangle.json';
const initialData1: GraphData = await fetch(url).then((r) => r.json());

const initialData = generateSierpinskiGraph(5);

await graphViewer.setData(initialData);

//graphViewer.renderer.debugMemoryUsage();
// @ts-expect-error expose for debugging
window['graphViewer'] = graphViewer;
