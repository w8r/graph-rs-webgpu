(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();let h;const w=new Array(128).fill(void 0);w.push(void 0,null,!0,!1);function E(n){return w[n]}let O=w.length;function L(n){O===w.length&&w.push(w.length+1);const e=O;return O=w[e],w[e]=n,e}function G(n){n<132||(w[n]=O,O=n)}function M(n){const e=E(n);return G(n),e}const U=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&U.decode();let S=null;function W(){return(S===null||S.byteLength===0)&&(S=new Uint8Array(h.memory.buffer)),S}function X(n,e){return n=n>>>0,U.decode(W().subarray(n,n+e))}let z=null;function N(){return(z===null||z.byteLength===0)&&(z=new Float32Array(h.memory.buffer)),z}let x=0;function P(n,e){const t=e(n.length*4,4)>>>0;return N().set(n,t/4),x=n.length,t}const R=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>h.__wbg_graph_free(n>>>0,1));class Y{__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,R.unregister(this),e}free(){const e=this.__destroy_into_raw();h.__wbg_graph_free(e,0)}constructor(e){const t=P(e,h.__wbindgen_malloc),s=x,r=h.graph_new(t,s);return this.__wbg_ptr=r>>>0,R.register(this,this.__wbg_ptr,this),this}set_graph(e){const t=P(e,h.__wbindgen_malloc),s=x;h.graph_set_graph(this.__wbg_ptr,t,s)}add_node(e,t,s,r,i){const u=P(i,h.__wbindgen_malloc),f=x;return h.graph_add_node(this.__wbg_ptr,e,t,s,r,u,f)!==0}add_edge(e,t,s,r,i){const u=P(i,h.__wbindgen_malloc),f=x;return h.graph_add_edge(this.__wbg_ptr,e,t,s,r,u,f)!==0}update_node(e,t,s,r,i){const u=P(i,h.__wbindgen_malloc),f=x;return h.graph_update_node(this.__wbg_ptr,e,t,s,r,u,f)!==0}update_edge(e,t,s){const r=P(s,h.__wbindgen_malloc),i=x;return h.graph_update_edge(this.__wbg_ptr,e,t,r,i)!==0}remove_node(e){return h.graph_remove_node(this.__wbg_ptr,e)!==0}remove_edge(e){return h.graph_remove_edge(this.__wbg_ptr,e)!==0}get_nodes(){const e=h.graph_get_nodes(this.__wbg_ptr);return M(e)}get_edges(){const e=h.graph_get_edges(this.__wbg_ptr);return M(e)}node_count(){return h.graph_node_count(this.__wbg_ptr)>>>0}edge_count(){return h.graph_edge_count(this.__wbg_ptr)>>>0}get_buffer(){const e=h.graph_get_buffer(this.__wbg_ptr);return M(e)}get_total_elements(){return h.graph_get_total_elements(this.__wbg_ptr)>>>0}get_buffer_info(){const e=h.graph_get_buffer_info(this.__wbg_ptr);return M(e)}get_edges_offset(){return h.graph_get_edges_offset(this.__wbg_ptr)>>>0}}async function I(n,e){if(typeof Response=="function"&&n instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(n,e)}catch(s){if(n.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",s);else throw s}const t=await n.arrayBuffer();return await WebAssembly.instantiate(t,e)}else{const t=await WebAssembly.instantiate(n,e);return t instanceof WebAssembly.Instance?{instance:t,module:n}:t}}function H(){const n={};return n.wbg={},n.wbg.__wbg_buffer_61b7ce01341d7f88=function(e){const t=E(e).buffer;return L(t)},n.wbg.__wbg_new_254fa9eac11932ae=function(){const e=new Array;return L(e)},n.wbg.__wbg_newwithbyteoffsetandlength_f113a96374814bb2=function(e,t,s){const r=new Float32Array(E(e),t>>>0,s>>>0);return L(r)},n.wbg.__wbg_push_6edad0df4b546b2c=function(e,t){return E(e).push(E(t))},n.wbg.__wbindgen_memory=function(){const e=h.memory;return L(e)},n.wbg.__wbindgen_number_new=function(e){return L(e)},n.wbg.__wbindgen_object_drop_ref=function(e){M(e)},n.wbg.__wbindgen_throw=function(e,t){throw new Error(X(e,t))},n}function Z(n,e){return h=n.exports,T.__wbindgen_wasm_module=e,z=null,S=null,h}async function T(n){if(h!==void 0)return h;typeof n<"u"&&(Object.getPrototypeOf(n)===Object.prototype?{module_or_path:n}=n:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),typeof n>"u"&&(n=new URL(""+new URL("webgpu_graph_renderer_bg-DTbrRzET.wasm",import.meta.url).href,import.meta.url));const e=H();(typeof n=="string"||typeof Request=="function"&&n instanceof Request||typeof URL=="function"&&n instanceof URL)&&(n=fetch(n));const{instance:t,module:s}=await I(await n,e);return Z(t,s)}class A{static toBuffer(e){const r=new Float32Array(2+e.nodes.length*7+e.edges.length*7);r[0]=e.nodes.length,r[1]=e.edges.length;let i=2;return e.nodes.forEach(u=>{const f=C(u.attributes.color);r.set([u.id,u.attributes.x,u.attributes.y,u.attributes.r,f.r,f.g,f.b],i),i+=7}),e.edges.forEach(u=>{const f=C(u.attributes.color);r.set([u.id,u.source,u.target,u.attributes.width,f.r,f.g,f.b],i),i+=7}),r}}function C(n){if(!n||n.length!==4&&n.length!==7||n[0]!=="#")return null;let e,t,s;n.length===4?(e=n[1]+n[1],t=n[2]+n[2],s=n[3]+n[3]):(e=n.substring(1,3),t=n.substring(3,5),s=n.substring(5,7));const r=parseInt(e,16)/255,i=parseInt(t,16)/255,u=parseInt(s,16)/255;return isNaN(r)||isNaN(i)||isNaN(u)?null:{r,g:i,b:u}}const k=`#include "types.wgsl"

@binding(0) @group(0) var<uniform> uniforms: Uniforms;

@vertex
fn main(
  // Instance attributes (node data)
  @location(0) id: f32,
  @location(1) node_pos: vec2<f32>,
  @location(2) node_radius: f32,
  @location(3) node_color: vec3<f32>,
  // Vertex attributes (quad)
  @location(4) quad_pos: vec2<f32>,
  @location(5) quad_uv: vec2<f32>
) -> VertexOutput {
  var output: VertexOutput;

  let world_pos = node_pos + (quad_pos * node_radius);

  output.position = uniforms.viewProj * vec4<f32>(world_pos, 0.0, 1.0);
  output.color = node_color;
  output.uv = quad_uv;
  output.radius = node_radius;

  return output;
}

// Node vertex shader
@vertex
fn vs_node(
  @location(0) element_type: f32,
  @location(1) position: vec2<f32>,
  @location(2) radius: f32,
  @location(3) color: vec3<f32>,
  @location(4) quad_pos: vec2<f32>,
  @location(5) quad_uv: vec2<f32>,
) -> VertexOutput {
  var output: VertexOutput;
  let world_pos = position + (quad_pos * radius);
  output.position = uniforms.viewProj * vec4<f32>(world_pos, 0.1, 1.0);
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
) -> VertexOutput {
  var output: VertexOutput;

  let edge_vector = targetXY - sourceXY;
  // Calculate perpendicular vector
  let perp = normalize(vec2<f32>(-edge_vector.y, edge_vector.x));

  // Position along edge + perpendicular offset scaled by width
  let pos = sourceXY + edge_vector * position.x + perp * position.y * width;

  output.position = uniforms.viewProj * vec4<f32>(pos, 0.5, 1.0);
  output.color = color;

  return output;
}
`,Q=`#include "types.wgsl"

@fragment
fn main(in: VertexOutput) -> @location(0) vec4<f32> {
  // Convert UV from [0,1] to [-1,1] range
  let uv = in.uv * 2.0 - 1.0;

  // Calculate distance from center (0,0)
  let dist = length(uv);

  // Smooth circle with anti-aliasing
  let edgeWidth = 0.1 / in.radius;  // Adjust the 0.5 factor to taste
  let alpha = 1.0 - smoothstep(1. - edgeWidth, 1.0, dist);

  return vec4<f32>(in.color, alpha);
}


// Fragment shaders
@fragment
fn fs_node(in: VertexOutput) -> @location(0) vec4<f32> {
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
`,K=`struct Uniforms {
  viewProj: mat4x4<f32>,
}

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) radius: f32,
  @location(1) color: vec3<f32>,
  @location(2) uv: vec2<f32>
}
`,F=n=>n.replace(/#include "([^"]+)"/g,(e,t)=>{if(t==="types.wgsl")return K;throw new Error(`Unknown include: ${t}`)}),$=()=>typeof window<"u"?window.devicePixelRatio:1;class V{constructor(e,t){this.canvas=e,this.graph=t}device;context;viewProjBuffer;bindGroup;quadBuffer;lineBuffer;depthTexture;combinedBuffer;combinedBufferSize;nodePipeline;edgePipeline;createLineBuffer(){const e=new Float32Array([0,-.5,0,.5,1,-.5,1,.5]);this.lineBuffer=this.device.createBuffer({size:e.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(this.lineBuffer.getMappedRange()).set(e),this.lineBuffer.unmap()}createDepthTexture(e,t){this.depthTexture=this.device.createTexture({size:{width:e,height:t},format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT})}createViewProjBuffer(e){this.viewProjBuffer=this.device.createBuffer({size:e.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!0}),new Float32Array(this.viewProjBuffer.getMappedRange()).set(e),this.viewProjBuffer.unmap()}createQuadBuffer(){const e=new Float32Array([-1,-1,0,0,1,-1,1,0,1,1,1,1,-1,-1,0,0,1,1,1,1,-1,1,0,1]);this.quadBuffer=this.device.createBuffer({size:e.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(this.quadBuffer.getMappedRange()).set(e),this.quadBuffer.unmap()}static isSupported(){return"gpu"in navigator}async init(e){const t=await navigator.gpu.requestAdapter();this.device=await t.requestDevice(),this.context=this.canvas.getContext("webgpu");const s=F(k),r=F(Q),i=$(),u=this.canvas.width=this.canvas.clientWidth*i,f=this.canvas.height=this.canvas.clientHeight*i;this.context.configure({device:this.device,format:navigator.gpu.getPreferredCanvasFormat(),alphaMode:"premultiplied"}),this.createQuadBuffer(),this.createLineBuffer(),this.createViewProjBuffer(e),this.createDepthTexture(u,f);const l=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});this.bindGroup=this.device.createBindGroup({layout:l,entries:[{binding:0,resource:{buffer:this.viewProjBuffer}}]});const o=this.device.createPipelineLayout({bindGroupLayouts:[l]}),a=this.device.createShaderModule({code:s}),d=this.device.createShaderModule({code:r});this.createNodePipeline(a,d,o),this.createEdgePipeline(a,d,o);const _=this.graph.get_buffer();this.combinedBufferSize=_.byteLength,this.combinedBuffer=this.device.createBuffer({size:this.combinedBufferSize,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.device.queue.writeBuffer(this.combinedBuffer,0,_)}createNodePipeline(e,t,s){this.nodePipeline=this.device.createRenderPipeline({layout:s,vertex:{module:e,entryPoint:"vs_node",buffers:[{arrayStride:28,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32"},{shaderLocation:1,offset:4,format:"float32x2"},{shaderLocation:2,offset:12,format:"float32"},{shaderLocation:3,offset:16,format:"float32x3"}]},{arrayStride:16,stepMode:"vertex",attributes:[{shaderLocation:4,offset:0,format:"float32x2"},{shaderLocation:5,offset:8,format:"float32x2"}]}]},fragment:{module:t,entryPoint:"fs_node",targets:[{format:navigator.gpu.getPreferredCanvasFormat(),blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}})}createEdgePipeline(e,t,s){this.edgePipeline=this.device.createRenderPipeline({layout:s,vertex:{module:e,entryPoint:"vs_edge",buffers:[{arrayStride:36,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32"},{shaderLocation:1,offset:4,format:"float32x2"},{shaderLocation:2,offset:12,format:"float32x2"},{shaderLocation:3,offset:20,format:"float32"},{shaderLocation:4,offset:24,format:"float32x3"}]},{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:5,offset:0,format:"float32x2"}]}]},fragment:{module:t,entryPoint:"fs_edge",targets:[{format:navigator.gpu.getPreferredCanvasFormat(),blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-strip",stripIndexFormat:void 0},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}})}updateGraphData(){const e=this.graph.get_buffer();e.byteLength>this.combinedBufferSize&&(this.combinedBuffer.destroy(),this.combinedBufferSize=e.byteLength,this.combinedBuffer=this.device.createBuffer({size:this.combinedBufferSize,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST})),this.device.queue.writeBuffer(this.combinedBuffer,0,e)}draw(){this.updateGraphData();const e=this.graph.node_count(),t=this.graph.edge_count(),s=this.graph.get_edges_offset();if(e===0&&t===0)return;const r=this.device.createCommandEncoder(),i=r.beginRenderPass({colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this.depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});i.setPipeline(this.edgePipeline),i.setBindGroup(0,this.bindGroup),i.setVertexBuffer(0,this.combinedBuffer,s*4),i.setVertexBuffer(1,this.lineBuffer),i.draw(4,t),i.setPipeline(this.nodePipeline),i.setBindGroup(0,this.bindGroup),i.setVertexBuffer(0,this.combinedBuffer),i.setVertexBuffer(1,this.quadBuffer),i.draw(6,e),i.end(),this.device.queue.submit([r.finish()])}resize(e,t){this.depthTexture.destroy(),this.createDepthTexture(e,t),this.context.configure({device:this.device,format:navigator.gpu.getPreferredCanvasFormat(),alphaMode:"premultiplied"})}updateViewProj(e){this.device.queue.writeBuffer(this.viewProjBuffer,0,e)}}class J{position={x:0,y:0};zoom=1;width=0;height=0;maxZoom=1e3;minZoom=.001;zoomAroundPoint(e,t,s){const r=Math.max(this.minZoom,Math.min(this.maxZoom,this.zoom*e)),i=this.position.x+(t-this.width/2)*this.zoom,u=this.position.y-(s-this.height/2)*this.zoom,f=r/this.zoom;this.position.x=i-(i-this.position.x)*f,this.position.y=u-(u-this.position.y)*f,this.zoom=r}move(e,t){this.position.x-=e*this.zoom,this.position.y-=t*this.zoom}getScale(){return this.zoom*Math.min(this.width,this.height)/2}getViewProjMatrix(e){const t=this.getScale();return new Float32Array([1/(t*e),0,0,0,0,1/t,0,0,0,0,1,0,-this.position.x/(t*e),-this.position.y/t,0,1])}debugState(){console.log("Camera State:",{position:this.position,zoom:this.zoom,width:this.width,height:this.height})}}function ee(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var j={exports:{}};(function(n){var e=Object.prototype.hasOwnProperty,t="~";function s(){}Object.create&&(s.prototype=Object.create(null),new s().__proto__||(t=!1));function r(l,o,a){this.fn=l,this.context=o,this.once=a||!1}function i(l,o,a,d,_){if(typeof a!="function")throw new TypeError("The listener must be a function");var v=new r(a,d||l,_),p=t?t+o:o;return l._events[p]?l._events[p].fn?l._events[p]=[l._events[p],v]:l._events[p].push(v):(l._events[p]=v,l._eventsCount++),l}function u(l,o){--l._eventsCount===0?l._events=new s:delete l._events[o]}function f(){this._events=new s,this._eventsCount=0}f.prototype.eventNames=function(){var o=[],a,d;if(this._eventsCount===0)return o;for(d in a=this._events)e.call(a,d)&&o.push(t?d.slice(1):d);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(a)):o},f.prototype.listeners=function(o){var a=t?t+o:o,d=this._events[a];if(!d)return[];if(d.fn)return[d.fn];for(var _=0,v=d.length,p=new Array(v);_<v;_++)p[_]=d[_].fn;return p},f.prototype.listenerCount=function(o){var a=t?t+o:o,d=this._events[a];return d?d.fn?1:d.length:0},f.prototype.emit=function(o,a,d,_,v,p){var m=t?t+o:o;if(!this._events[m])return!1;var c=this._events[m],b=arguments.length,y,g;if(c.fn){switch(c.once&&this.removeListener(o,c.fn,void 0,!0),b){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,a),!0;case 3:return c.fn.call(c.context,a,d),!0;case 4:return c.fn.call(c.context,a,d,_),!0;case 5:return c.fn.call(c.context,a,d,_,v),!0;case 6:return c.fn.call(c.context,a,d,_,v,p),!0}for(g=1,y=new Array(b-1);g<b;g++)y[g-1]=arguments[g];c.fn.apply(c.context,y)}else{var q=c.length,B;for(g=0;g<q;g++)switch(c[g].once&&this.removeListener(o,c[g].fn,void 0,!0),b){case 1:c[g].fn.call(c[g].context);break;case 2:c[g].fn.call(c[g].context,a);break;case 3:c[g].fn.call(c[g].context,a,d);break;case 4:c[g].fn.call(c[g].context,a,d,_);break;default:if(!y)for(B=1,y=new Array(b-1);B<b;B++)y[B-1]=arguments[B];c[g].fn.apply(c[g].context,y)}}return!0},f.prototype.on=function(o,a,d){return i(this,o,a,d,!1)},f.prototype.once=function(o,a,d){return i(this,o,a,d,!0)},f.prototype.removeListener=function(o,a,d,_){var v=t?t+o:o;if(!this._events[v])return this;if(!a)return u(this,v),this;var p=this._events[v];if(p.fn)p.fn===a&&(!_||p.once)&&(!d||p.context===d)&&u(this,v);else{for(var m=0,c=[],b=p.length;m<b;m++)(p[m].fn!==a||_&&!p[m].once||d&&p[m].context!==d)&&c.push(p[m]);c.length?this._events[v]=c.length===1?c[0]:c:u(this,v)}return this},f.prototype.removeAllListeners=function(o){var a;return o?(a=t?t+o:o,this._events[a]&&u(this,a)):(this._events=new s,this._eventsCount=0),this},f.prototype.off=f.prototype.removeListener,f.prototype.addListener=f.prototype.on,f.prefixed=t,f.EventEmitter=f,n.exports=f})(j);var te=j.exports;const ne=ee(te);class re extends ne{constructor(e,t){super(),this.canvas=e,this.camera=t,this.setupEventHandlers(),this.updateRect(),this.updateCameraDimensions(),window.addEventListener("resize",this.updateRect)}isDragging=!1;lastMouseX=0;lastMouseY=0;rect;devicePixelRatio=window.devicePixelRatio||1;updateCameraDimensions(){this.camera.width=this.canvas.width/this.devicePixelRatio,this.camera.height=this.canvas.height/this.devicePixelRatio}updateRect=()=>{this.rect=this.canvas.getBoundingClientRect(),this.updateCameraDimensions()};setupEventHandlers(){this.canvas.addEventListener("mousedown",this.onMouseDown),this.canvas.addEventListener("mousemove",this.onMouseMove),this.canvas.addEventListener("mouseup",this.onMouseUp),this.canvas.addEventListener("mouseleave",this.onMouseUp),this.canvas.addEventListener("wheel",this.onWheel,{passive:!1})}setXY(e){const{x:t,y:s}=this.getCanvasPosition(e);this.lastMouseX=t,this.lastMouseY=s}getCanvasPosition(e){const t=this.rect;return{x:e.clientX-t.left,y:e.clientY-t.top}}onMouseDown=e=>{this.isDragging=!0,this.setXY(e),this.canvas.style.cursor="grabbing"};onMouseMove=e=>{if(!this.isDragging){this.setXY(e);return}const{x:t,y:s}=this.getCanvasPosition(e),r=t-this.lastMouseX,i=s-this.lastMouseY;this.camera.move(r,-i),this.setXY(e),this.emit("update")};onMouseUp=()=>{this.isDragging=!1,this.canvas.style.cursor="grab"};onWheel=e=>{e.preventDefault();const{x:t,y:s}=this.getCanvasPosition(e),r=1-e.deltaY*.01;this.camera.zoomAroundPoint(r,t,s),this.emit("update")};destroy(){this.canvas.removeEventListener("mousedown",this.onMouseDown),this.canvas.removeEventListener("mousemove",this.onMouseMove),this.canvas.removeEventListener("mouseup",this.onMouseUp),this.canvas.removeEventListener("mouseleave",this.onMouseUp),this.canvas.removeEventListener("wheel",this.onWheel),window.removeEventListener("resize",this.updateRect)}}class ie{constructor(e){this.canvas=e,this.mouse=new re(e,this.camera),this.mouse.on("update",this.requestRedraw),this.camera.zoom=.2,this.resizeObserver=new ResizeObserver(t=>{for(const s of t){const{width:r,height:i}=s.contentRect;this.updateSize(r,i)}}),this.resizeObserver.observe(e)}graphManager;renderer;camera=new J;mouse;resizeObserver;renderFrame=0;async init(){await T();const e=A.toBuffer({nodes:[],edges:[]});this.graphManager=new Y(e),V.isSupported()&&(this.renderer=new V(this.canvas,this.graphManager),await this.renderer.init(this.camera.getViewProjMatrix(this.getAspectRatio()))),this.updateSize()}updateSize(e=this.canvas.clientWidth,t=this.canvas.clientHeight){this.canvas.width=e,this.canvas.height=t,this.camera.width=e,this.camera.height=t,this.renderer&&(this.renderer.resize(e,t),this.redraw())}async setData(e){const t=A.toBuffer(e);this.graphManager.set_graph(t),this.requestRedraw()}getAspectRatio(){return this.canvas.width/this.canvas.height}requestRedraw=()=>{this.renderFrame=requestAnimationFrame(this.redraw)};redraw=()=>{const e=this.camera.getViewProjMatrix(this.getAspectRatio());this.renderer.updateViewProj(e),this.renderer.draw()};destroy(){this.resizeObserver.disconnect(),this.mouse.destroy(),cancelAnimationFrame(this.renderFrame)}}const D=new ie(document.querySelector("canvas"));await D.init();const se="test/fixtures/triangle.json",oe=await fetch(se).then(n=>n.json());await D.setData(oe);
