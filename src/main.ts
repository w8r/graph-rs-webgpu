import type { GraphData } from './types';
import { GraphViewer } from './index';
import './styles.css';

const graphViewer = new GraphViewer(document.querySelector('canvas')!);
await graphViewer.init();

const url = 'test/fixtures/triangle.json';
const initialData: GraphData = await fetch(url).then((r) => r.json());

await graphViewer.setData(initialData);

//graphViewer.renderer.debugMemoryUsage();
window['graphViewer'] = graphViewer;
