(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();let l;const y=new Array(128).fill(void 0);y.push(void 0,null,!0,!1);function S(n){return y[n]}let A=y.length;function M(n){A===y.length&&y.push(y.length+1);const e=A;return A=y[e],y[e]=n,e}function G(n){n<132||(y[n]=A,A=n)}function E(n){const e=S(n);return G(n),e}const T=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&T.decode();let L=null;function W(){return(L===null||L.byteLength===0)&&(L=new Uint8Array(l.memory.buffer)),L}function N(n,e){return n=n>>>0,T.decode(W().subarray(n,n+e))}let R=null;function X(){return(R===null||R.byteLength===0)&&(R=new Float32Array(l.memory.buffer)),R}let P=0;function B(n,e){const t=e(n.length*4,4)>>>0;return X().set(n,t/4),P=n.length,t}const O=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>l.__wbg_graph_free(n>>>0,1));class Y{__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,O.unregister(this),e}free(){const e=this.__destroy_into_raw();l.__wbg_graph_free(e,0)}constructor(e){const t=B(e,l.__wbindgen_malloc),r=P,s=l.graph_new(t,r);return this.__wbg_ptr=s>>>0,O.register(this,this.__wbg_ptr,this),this}set_graph(e){const t=B(e,l.__wbindgen_malloc),r=P;l.graph_set_graph(this.__wbg_ptr,t,r)}add_node(e,t,r,s,i){const a=B(i,l.__wbindgen_malloc),o=P;return l.graph_add_node(this.__wbg_ptr,e,t,r,s,a,o)!==0}add_edge(e,t,r,s,i){const a=B(i,l.__wbindgen_malloc),o=P;return l.graph_add_edge(this.__wbg_ptr,e,t,r,s,a,o)!==0}update_node(e,t,r,s,i){const a=B(i,l.__wbindgen_malloc),o=P;return l.graph_update_node(this.__wbg_ptr,e,t,r,s,a,o)!==0}update_edge(e,t,r){const s=B(r,l.__wbindgen_malloc),i=P;return l.graph_update_edge(this.__wbg_ptr,e,t,s,i)!==0}remove_node(e){return l.graph_remove_node(this.__wbg_ptr,e)!==0}remove_edge(e){return l.graph_remove_edge(this.__wbg_ptr,e)!==0}get_nodes(){const e=l.graph_get_nodes(this.__wbg_ptr);return E(e)}get_edges(){const e=l.graph_get_edges(this.__wbg_ptr);return E(e)}node_count(){return l.graph_node_count(this.__wbg_ptr)>>>0}edge_count(){return l.graph_edge_count(this.__wbg_ptr)>>>0}get_buffer(){const e=l.graph_get_buffer(this.__wbg_ptr);return E(e)}get_total_elements(){return l.graph_get_total_elements(this.__wbg_ptr)>>>0}get_buffer_info(){const e=l.graph_get_buffer_info(this.__wbg_ptr);return E(e)}get_edges_offset(){return l.graph_get_edges_offset(this.__wbg_ptr)>>>0}}async function I(n,e){if(typeof Response=="function"&&n instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(n,e)}catch(r){if(n.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",r);else throw r}const t=await n.arrayBuffer();return await WebAssembly.instantiate(t,e)}else{const t=await WebAssembly.instantiate(n,e);return t instanceof WebAssembly.Instance?{instance:t,module:n}:t}}function H(){const n={};return n.wbg={},n.wbg.__wbg_buffer_61b7ce01341d7f88=function(e){const t=S(e).buffer;return M(t)},n.wbg.__wbg_new_254fa9eac11932ae=function(){const e=new Array;return M(e)},n.wbg.__wbg_newwithbyteoffsetandlength_f113a96374814bb2=function(e,t,r){const s=new Float32Array(S(e),t>>>0,r>>>0);return M(s)},n.wbg.__wbg_push_6edad0df4b546b2c=function(e,t){return S(e).push(S(t))},n.wbg.__wbindgen_memory=function(){const e=l.memory;return M(e)},n.wbg.__wbindgen_number_new=function(e){return M(e)},n.wbg.__wbindgen_object_drop_ref=function(e){E(e)},n.wbg.__wbindgen_throw=function(e,t){throw new Error(N(e,t))},n}function Z(n,e){return l=n.exports,j.__wbindgen_wasm_module=e,R=null,L=null,l}async function j(n){if(l!==void 0)return l;typeof n<"u"&&(Object.getPrototypeOf(n)===Object.prototype?{module_or_path:n}=n:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),typeof n>"u"&&(n=new URL(""+new URL("webgpu_graph_renderer_bg-DTbrRzET.wasm",import.meta.url).href,import.meta.url));const e=H();(typeof n=="string"||typeof Request=="function"&&n instanceof Request||typeof URL=="function"&&n instanceof URL)&&(n=fetch(n));const{instance:t,module:r}=await I(await n,e);return Z(t,r)}class U{static toBuffer(e){const s=new Float32Array(2+e.nodes.length*7+e.edges.length*7);s[0]=e.nodes.length,s[1]=e.edges.length;let i=2;return e.nodes.forEach(a=>{const o=F(a.attributes.color);s.set([a.id,a.attributes.x,a.attributes.y,a.attributes.r,o.r,o.g,o.b],i),i+=7}),e.edges.forEach(a=>{const o=F(a.attributes.color);s.set([a.id,a.source,a.target,a.attributes.width,o.r,o.g,o.b],i),i+=7}),s}}function F(n){if(!n||n.length!==4&&n.length!==7||n[0]!=="#")return null;let e,t,r;n.length===4?(e=n[1]+n[1],t=n[2]+n[2],r=n[3]+n[3]):(e=n.substring(1,3),t=n.substring(3,5),r=n.substring(5,7));const s=parseInt(e,16)/255,i=parseInt(t,16)/255,a=parseInt(r,16)/255;return isNaN(s)||isNaN(i)||isNaN(a)?null:{r:s,g:i,b:a}}class k{pools=new Map;device;stats=new Map;totalAllocated=0;totalReused=0;constructor(e){this.device=e}getNearestSize(e){return Math.pow(2,Math.ceil(Math.log2(e)))}acquireBuffer(e,t){const r=this.getNearestSize(e),s=this.pools.get(r)||[];if(s.length>0){const a=s.pop(),o=this.stats.get(a);return o.timesReused++,this.totalReused++,a}this.totalAllocated++;const i=this.device.createBuffer({size:r,usage:t});return this.stats.set(i,{size:r,usage:t,timeCreated:Date.now(),timesReused:0}),i}releaseBuffer(e){const t=e.size;this.pools.has(t)||this.pools.set(t,[]),this.pools.get(t).push(e)}cleanupUnused(e=3e4){const t=Date.now();for(const[r,s]of this.pools){const i=s.filter(a=>{const o=this.stats.get(a);return t-o.timeCreated>e?(a.destroy(),this.stats.delete(a),!1):!0});this.pools.set(r,i)}}cleanup(){for(const[e,t]of this.pools)t.forEach(r=>r.destroy());this.pools.clear(),this.totalAllocated=0,this.totalReused=0}getPoolStats(){const e=Array.from(this.pools.entries()).map(([r,s])=>({size:r,availableCount:s.length,totalMemory:r*s.length})),t=Array.from(this.stats.entries()).map(([r,s])=>({size:s.size,timesReused:s.timesReused,ageMs:Date.now()-s.timeCreated}));return{pools:e,totalBuffers:this.stats.size,totalAllocated:this.totalAllocated,totalReused:this.totalReused,totalMemory:e.reduce((r,s)=>r+s.totalMemory,0),bufferStats:t,averageReuse:this.totalReused/this.stats.size||0}}}const Q=`#include "types.wgsl"

@binding(0) @group(0) var<uniform> uniforms: Uniforms;


// Node vertex shader
@vertex
fn vs_node(
  @location(0) element_type: f32,
  @location(1) position: vec2<f32>,
  @location(2) radius: f32,
  @location(3) color: vec3<f32>,
  @location(4) quad_pos: vec2<f32>,
  @location(5) quad_uv: vec2<f32>,
  @builtin(instance_index) instance_index: u32,
) -> VertexOutput {
  var output: VertexOutput;
  let world_pos = position + (quad_pos * radius);

  // Convert instance index to normalized depth
  // Using a large divisor to get small depth differences
  let depth = f32(instance_index) / 10000.0;

  output.position = uniforms.viewProj * vec4<f32>(world_pos, depth, 1.0);
  output.color = color;
  output.uv = quad_uv;
  output.radius = radius;
  return output;
}

// Edge vertex shader
@vertex
fn vs_edge(
  @location(0) type_id: f32,
  @location(1) sourceXY: vec2<f32>,
  @location(2) targetXY: vec2<f32>,
  @location(3) width: f32,
  @location(4) color: vec3<f32>,
  @location(5) position: vec2<f32>, // x=progress along line, y=side offset
  @builtin(instance_index) instance_index: u32,
) -> VertexOutput {
  var output: VertexOutput;

  let edge_vector = targetXY - sourceXY;
  // Calculate perpendicular vector
  let perp = normalize(vec2<f32>(-edge_vector.y, edge_vector.x));
  let depth = (f32(instance_index) + 10000.0) / 20000.0;

  // Position along edge + perpendicular offset scaled by width
  let pos = sourceXY + edge_vector * position.x + perp * position.y * width;

  output.position = uniforms.viewProj * vec4<f32>(pos, depth, 1.0);
  output.color = color;

  return output;
}
`,K=`#include "types.wgsl"

@fragment
fn fs_node(in: VertexOutput) -> @location(0) vec4<f32> {
  // Convert UV from [0,1] to [-1,1] range
  //let uv = in.uv * 2.0 - 1.0;

  // Smooth circle with anti-aliasing
  // let edgeWidth = 0.05 / in.radius;  // Adjust the 0.5 factor to taste
  // let alpha = 1.0 - smoothstep(1. - edgeWidth, 1.0, dist);

  // Convert UV from [0,1] to [-1,1] range
  let uv = in.uv * 2.0 - 1.0;
  // Calculate distance from center (0,0)
  let dist = length(uv);

  // Calculate one-pixel width in UV space
  let pixelWidth = length(fwidth(uv)) * 0.5;
  let edge = smoothstep(1.0 - pixelWidth, 1.0, dist);

  if (dist > 1.0 - pixelWidth * 0.5) {
    discard;
  }

  let alpha = 1.0 - edge;

  // // Discard nearly transparent pixels
  // if (alpha < 0.0000001) {
  //   discard;
  // }

  return vec4<f32>(in.color, alpha);
}


// Fragment shaders
@fragment
fn fs_node1(in: VertexOutput) -> @location(0) vec4<f32> {
    let uv = in.uv * 2.0 - 1.0;
    let dist = length(uv);
    let edgeWidth = 0.05 / in.radius;
    let alpha = 1.0 - smoothstep(1.0 - edgeWidth, 1.0, dist);
    return vec4<f32>(in.color, alpha);
}

@fragment
fn fs_edge(in: VertexOutput) -> @location(0) vec4<f32> {
   return vec4<f32>(in.color, 1.0);
}
`,$=`struct Uniforms {
  viewProj: mat4x4<f32>,
}

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) radius: f32,
  @location(1) color: vec3<f32>,
  @location(2) uv: vec2<f32>
}
`,V=n=>n.replace(/#include "([^"]+)"/g,(e,t)=>{if(t==="types.wgsl")return $;throw new Error(`Unknown include: ${t}`)}),J=()=>typeof window<"u"?window.devicePixelRatio:1;class D{constructor(e,t){this.canvas=e,this.graph=t}device;context;viewProjBuffer;bindGroup;quadBuffer;lineBuffer;depthTexture;combinedBuffer;combinedBufferSize;nodePipeline;edgePipeline;bufferPool;createLineBuffer(){const e=new Float32Array([0,-.5,0,.5,1,-.5,1,.5]);this.lineBuffer=this.device.createBuffer({size:e.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(this.lineBuffer.getMappedRange()).set(e),this.lineBuffer.unmap()}createDepthTexture(e,t){this.depthTexture=this.device.createTexture({size:{width:e,height:t},format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT})}createViewProjBuffer(e){this.viewProjBuffer=this.device.createBuffer({size:e.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!0}),new Float32Array(this.viewProjBuffer.getMappedRange()).set(e),this.viewProjBuffer.unmap()}createQuadBuffer(){const e=new Float32Array([-1,-1,0,0,1,-1,1,0,1,1,1,1,-1,-1,0,0,1,1,1,1,-1,1,0,1]);this.quadBuffer=this.device.createBuffer({size:e.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(this.quadBuffer.getMappedRange()).set(e),this.quadBuffer.unmap()}static isSupported(){return"gpu"in navigator}async init(e){const t=await navigator.gpu.requestAdapter();this.device=await t.requestDevice(),this.context=this.canvas.getContext("webgpu"),this.bufferPool=new k(this.device);const r=V(Q),s=V(K),i=J(),a=this.canvas.width=this.canvas.clientWidth*i,o=this.canvas.height=this.canvas.clientHeight*i;this.context.configure({device:this.device,format:navigator.gpu.getPreferredCanvasFormat(),alphaMode:"premultiplied"}),this.createQuadBuffer(),this.createLineBuffer(),this.createViewProjBuffer(e),this.createDepthTexture(a,o);const d=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});this.bindGroup=this.device.createBindGroup({layout:d,entries:[{binding:0,resource:{buffer:this.viewProjBuffer}}]});const c=this.device.createPipelineLayout({bindGroupLayouts:[d]}),u=this.device.createShaderModule({code:r}),f=this.device.createShaderModule({code:s});this.createNodePipeline(u,f,c),this.createEdgePipeline(u,f,c);const m=this.graph.get_buffer();this.combinedBufferSize=m.byteLength,this.combinedBuffer=this.device.createBuffer({size:this.combinedBufferSize,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.device.queue.writeBuffer(this.combinedBuffer,0,m)}createNodePipeline(e,t,r){this.nodePipeline=this.device.createRenderPipeline({layout:r,vertex:{module:e,entryPoint:"vs_node",buffers:[{arrayStride:28,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32"},{shaderLocation:1,offset:4,format:"float32x2"},{shaderLocation:2,offset:12,format:"float32"},{shaderLocation:3,offset:16,format:"float32x3"}]},{arrayStride:16,stepMode:"vertex",attributes:[{shaderLocation:4,offset:0,format:"float32x2"},{shaderLocation:5,offset:8,format:"float32x2"}]}]},fragment:{module:t,entryPoint:"fs_node",targets:[{format:navigator.gpu.getPreferredCanvasFormat(),blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less-equal"}})}createEdgePipeline(e,t,r){this.edgePipeline=this.device.createRenderPipeline({layout:r,vertex:{module:e,entryPoint:"vs_edge",buffers:[{arrayStride:36,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32"},{shaderLocation:1,offset:4,format:"float32x2"},{shaderLocation:2,offset:12,format:"float32x2"},{shaderLocation:3,offset:20,format:"float32"},{shaderLocation:4,offset:24,format:"float32x3"}]},{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:5,offset:0,format:"float32x2"}]}]},fragment:{module:t,entryPoint:"fs_edge",targets:[{format:navigator.gpu.getPreferredCanvasFormat(),blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-strip",stripIndexFormat:void 0},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}})}updateGraphData(){const e=this.graph.get_buffer();e.byteLength>this.combinedBufferSize&&(this.bufferPool.releaseBuffer(this.combinedBuffer),this.combinedBufferSize=e.byteLength,this.combinedBuffer=this.bufferPool.acquireBuffer(this.combinedBufferSize,GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)),this.device.queue.writeBuffer(this.combinedBuffer,0,e)}draw(){this.updateGraphData();const e=this.graph.node_count(),t=this.graph.edge_count(),r=this.graph.get_edges_offset();if(e===0&&t===0)return;const s=this.device.createCommandEncoder(),i=s.beginRenderPass({colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:.1,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this.depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});i.setPipeline(this.edgePipeline),i.setBindGroup(0,this.bindGroup),i.setVertexBuffer(0,this.combinedBuffer,r*4),i.setVertexBuffer(1,this.lineBuffer),i.draw(4,t),i.setPipeline(this.nodePipeline),i.setBindGroup(0,this.bindGroup),i.setVertexBuffer(0,this.combinedBuffer),i.setVertexBuffer(1,this.quadBuffer),i.draw(6,e),i.end(),this.device.queue.submit([s.finish()])}resize(e,t){this.depthTexture.destroy(),this.createDepthTexture(e,t),this.context.configure({device:this.device,format:navigator.gpu.getPreferredCanvasFormat(),alphaMode:"premultiplied"})}updateViewProj(e){this.device.queue.writeBuffer(this.viewProjBuffer,0,e)}debugMemoryUsage(){const e={combinedBuffer:this.combinedBufferSize,viewProj:64,quad:this.quadBuffer.size,line:this.lineBuffer.size,depth:this.canvas.width*this.canvas.height*4};console.log("GPU Buffer Sizes (bytes):",e),console.log("Total:",Object.values(e).reduce((t,r)=>t+r,0))}destroy=()=>{this.viewProjBuffer.destroy(),this.combinedBuffer.destroy(),this.quadBuffer.destroy(),this.lineBuffer.destroy(),this.depthTexture.destroy(),this.bufferPool.cleanup()}}class ee{position={x:0,y:0};zoom=1;width=0;height=0;maxZoom=1e3;minZoom=.001;zoomAroundPoint(e,t,r){const s=Math.max(this.minZoom,Math.min(this.maxZoom,this.zoom*e)),i=this.position.x+(t-this.width/2)*this.zoom,a=this.position.y-(r-this.height/2)*this.zoom,o=s/this.zoom;this.position.x=i-(i-this.position.x)*o,this.position.y=a-(a-this.position.y)*o,this.zoom=s}move(e,t){this.position.x-=e*this.zoom,this.position.y-=t*this.zoom}getScale(){return this.zoom*Math.min(this.width,this.height)/2}getViewProjMatrix(e){const t=this.getScale();return new Float32Array([1/(t*e),0,0,0,0,1/t,0,0,0,0,1,0,-this.position.x/(t*e),-this.position.y/t,0,1])}debugState(){console.log("Camera State:",{position:this.position,zoom:this.zoom,width:this.width,height:this.height})}}function te(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var q={exports:{}};(function(n){var e=Object.prototype.hasOwnProperty,t="~";function r(){}Object.create&&(r.prototype=Object.create(null),new r().__proto__||(t=!1));function s(d,c,u){this.fn=d,this.context=c,this.once=u||!1}function i(d,c,u,f,m){if(typeof u!="function")throw new TypeError("The listener must be a function");var v=new s(u,f||d,m),p=t?t+c:c;return d._events[p]?d._events[p].fn?d._events[p]=[d._events[p],v]:d._events[p].push(v):(d._events[p]=v,d._eventsCount++),d}function a(d,c){--d._eventsCount===0?d._events=new r:delete d._events[c]}function o(){this._events=new r,this._eventsCount=0}o.prototype.eventNames=function(){var c=[],u,f;if(this._eventsCount===0)return c;for(f in u=this._events)e.call(u,f)&&c.push(t?f.slice(1):f);return Object.getOwnPropertySymbols?c.concat(Object.getOwnPropertySymbols(u)):c},o.prototype.listeners=function(c){var u=t?t+c:c,f=this._events[u];if(!f)return[];if(f.fn)return[f.fn];for(var m=0,v=f.length,p=new Array(v);m<v;m++)p[m]=f[m].fn;return p},o.prototype.listenerCount=function(c){var u=t?t+c:c,f=this._events[u];return f?f.fn?1:f.length:0},o.prototype.emit=function(c,u,f,m,v,p){var w=t?t+c:c;if(!this._events[w])return!1;var h=this._events[w],b=arguments.length,_,g;if(h.fn){switch(h.once&&this.removeListener(c,h.fn,void 0,!0),b){case 1:return h.fn.call(h.context),!0;case 2:return h.fn.call(h.context,u),!0;case 3:return h.fn.call(h.context,u,f),!0;case 4:return h.fn.call(h.context,u,f,m),!0;case 5:return h.fn.call(h.context,u,f,m,v),!0;case 6:return h.fn.call(h.context,u,f,m,v,p),!0}for(g=1,_=new Array(b-1);g<b;g++)_[g-1]=arguments[g];h.fn.apply(h.context,_)}else{var x=h.length,z;for(g=0;g<x;g++)switch(h[g].once&&this.removeListener(c,h[g].fn,void 0,!0),b){case 1:h[g].fn.call(h[g].context);break;case 2:h[g].fn.call(h[g].context,u);break;case 3:h[g].fn.call(h[g].context,u,f);break;case 4:h[g].fn.call(h[g].context,u,f,m);break;default:if(!_)for(z=1,_=new Array(b-1);z<b;z++)_[z-1]=arguments[z];h[g].fn.apply(h[g].context,_)}}return!0},o.prototype.on=function(c,u,f){return i(this,c,u,f,!1)},o.prototype.once=function(c,u,f){return i(this,c,u,f,!0)},o.prototype.removeListener=function(c,u,f,m){var v=t?t+c:c;if(!this._events[v])return this;if(!u)return a(this,v),this;var p=this._events[v];if(p.fn)p.fn===u&&(!m||p.once)&&(!f||p.context===f)&&a(this,v);else{for(var w=0,h=[],b=p.length;w<b;w++)(p[w].fn!==u||m&&!p[w].once||f&&p[w].context!==f)&&h.push(p[w]);h.length?this._events[v]=h.length===1?h[0]:h:a(this,v)}return this},o.prototype.removeAllListeners=function(c){var u;return c?(u=t?t+c:c,this._events[u]&&a(this,u)):(this._events=new r,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=t,o.EventEmitter=o,n.exports=o})(q);var ne=q.exports;const re=te(ne);class se extends re{constructor(e,t){super(),this.canvas=e,this.camera=t,this.setupEventHandlers(),this.updateRect(),this.updateCameraDimensions(),window.addEventListener("resize",this.updateRect)}isDragging=!1;lastMouseX=0;lastMouseY=0;rect;devicePixelRatio=window.devicePixelRatio||1;updateCameraDimensions(){this.camera.width=this.canvas.width/this.devicePixelRatio,this.camera.height=this.canvas.height/this.devicePixelRatio}updateRect=()=>{this.rect=this.canvas.getBoundingClientRect(),this.updateCameraDimensions()};setupEventHandlers(){this.canvas.addEventListener("mousedown",this.onMouseDown),this.canvas.addEventListener("mousemove",this.onMouseMove),this.canvas.addEventListener("mouseup",this.onMouseUp),this.canvas.addEventListener("mouseleave",this.onMouseUp),this.canvas.addEventListener("wheel",this.onWheel,{passive:!1})}setXY(e){const{x:t,y:r}=this.getCanvasPosition(e);this.lastMouseX=t,this.lastMouseY=r}getCanvasPosition(e){const t=this.rect;return{x:e.clientX-t.left,y:e.clientY-t.top}}onMouseDown=e=>{this.isDragging=!0,this.setXY(e),this.canvas.style.cursor="grabbing"};onMouseMove=e=>{if(!this.isDragging){this.setXY(e);return}const{x:t,y:r}=this.getCanvasPosition(e),s=t-this.lastMouseX,i=r-this.lastMouseY;this.camera.move(s,-i),this.setXY(e),this.emit("update")};onMouseUp=()=>{this.isDragging=!1,this.canvas.style.cursor="grab"};onWheel=e=>{e.preventDefault();const{x:t,y:r}=this.getCanvasPosition(e),s=1+e.deltaY*.01;this.camera.zoomAroundPoint(s,t,r),this.emit("update")};destroy(){this.canvas.removeEventListener("mousedown",this.onMouseDown),this.canvas.removeEventListener("mousemove",this.onMouseMove),this.canvas.removeEventListener("mouseup",this.onMouseUp),this.canvas.removeEventListener("mouseleave",this.onMouseUp),this.canvas.removeEventListener("wheel",this.onWheel),window.removeEventListener("resize",this.updateRect)}}class ie{constructor(e){this.canvas=e,this.mouse=new se(e,this.camera),this.mouse.on("update",this.requestRedraw),this.camera.zoom=.2,this.resizeObserver=new ResizeObserver(t=>{for(const r of t){const{width:s,height:i}=r.contentRect;this.updateSize(s,i)}}),this.resizeObserver.observe(e)}graphManager;renderer;camera=new ee;mouse;resizeObserver;renderFrame=0;async init(){await j();const e=U.toBuffer({nodes:[],edges:[]});this.graphManager=new Y(e),D.isSupported()&&(this.renderer=new D(this.canvas,this.graphManager),await this.renderer.init(this.camera.getViewProjMatrix(this.getAspectRatio()))),this.updateSize()}updateSize(e=this.canvas.clientWidth,t=this.canvas.clientHeight){this.canvas.width=e,this.canvas.height=t,this.camera.width=e,this.camera.height=t,this.renderer&&(this.renderer.resize(e,t),this.redraw())}async setData(e){const t=U.toBuffer(e);this.graphManager.set_graph(t),this.requestRedraw()}getAspectRatio(){return this.canvas.width/this.canvas.height}requestRedraw=()=>{this.renderFrame=requestAnimationFrame(this.redraw)};redraw=()=>{const e=this.camera.getViewProjMatrix(this.getAspectRatio());this.renderer.updateViewProj(e),this.renderer.draw()};destroy(){this.resizeObserver.disconnect(),this.mouse.destroy(),cancelAnimationFrame(this.renderFrame)}}function oe(n){const e=[],t=[];let r=0,s=0;const i=100;[{x:-i,y:-i/2,color:"#ff0000"},{x:i,y:-i/2,color:"#00ff00"},{x:0,y:i,color:"#0000ff"}].forEach(({x:d,y:c,color:u})=>{e.push({id:r++,attributes:{x:d,y:c,r:5,color:u}})});for(let d=0;d<3;d++)t.push({id:s++,source:d,target:(d+1)%3,attributes:{width:.2,color:"#ffffff"}});function o(d,c,u,f){if(f===0)return;const m=e[d].attributes,v=e[c].attributes,p=e[u].attributes,w={x:(m.x+v.x)/2,y:(m.y+v.y)/2,color:"#888888"},h={x:(v.x+p.x)/2,y:(v.y+p.y)/2,color:"#888888"},b={x:(p.x+m.x)/2,y:(p.y+m.y)/2,color:"#888888"},_=r++,g=r++,x=r++;e.push({id:_,attributes:{...w,r:1}},{id:g,attributes:{...h,r:1}},{id:x,attributes:{...b,r:1}}),t.push({id:s++,source:_,target:g,attributes:{width:.1,color:"#666666"}},{id:s++,source:g,target:x,attributes:{width:.1,color:"#666666"}},{id:s++,source:x,target:_,attributes:{width:.1,color:"#666666"}}),o(d,_,x,f-1),o(_,c,g,f-1),o(x,g,u,f-1)}return o(0,1,2,n),{nodes:e,edges:t}}const C=new ie(document.querySelector("canvas"));await C.init();const ae=oe(5);await C.setData(ae);window.graphViewer=C;
