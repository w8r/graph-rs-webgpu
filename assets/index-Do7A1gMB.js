(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();let d;const w=new Array(128).fill(void 0);w.push(void 0,null,!0,!1);function E(n){return w[n]}let O=w.length;function L(n){O===w.length&&w.push(w.length+1);const e=O;return O=w[e],w[e]=n,e}function G(n){n<132||(w[n]=O,O=n)}function M(n){const e=E(n);return G(n),e}const U=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&U.decode();let S=null;function W(){return(S===null||S.byteLength===0)&&(S=new Uint8Array(d.memory.buffer)),S}function q(n,e){return n=n>>>0,U.decode(W().subarray(n,n+e))}let A=null;function N(){return(A===null||A.byteLength===0)&&(A=new Float32Array(d.memory.buffer)),A}let x=0;function P(n,e){const t=e(n.length*4,4)>>>0;return N().set(n,t/4),x=n.length,t}const z=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>d.__wbg_graph_free(n>>>0,1));class X{__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,z.unregister(this),e}free(){const e=this.__destroy_into_raw();d.__wbg_graph_free(e,0)}constructor(e){const t=P(e,d.__wbindgen_malloc),r=x,i=d.graph_new(t,r);return this.__wbg_ptr=i>>>0,z.register(this,this.__wbg_ptr,this),this}set_graph(e){const t=P(e,d.__wbindgen_malloc),r=x;d.graph_set_graph(this.__wbg_ptr,t,r)}add_node(e,t,r,i,s){const f=P(s,d.__wbindgen_malloc),u=x;return d.graph_add_node(this.__wbg_ptr,e,t,r,i,f,u)!==0}add_edge(e,t,r,i,s){const f=P(s,d.__wbindgen_malloc),u=x;return d.graph_add_edge(this.__wbg_ptr,e,t,r,i,f,u)!==0}update_node(e,t,r,i,s){const f=P(s,d.__wbindgen_malloc),u=x;return d.graph_update_node(this.__wbg_ptr,e,t,r,i,f,u)!==0}update_edge(e,t,r){const i=P(r,d.__wbindgen_malloc),s=x;return d.graph_update_edge(this.__wbg_ptr,e,t,i,s)!==0}remove_node(e){return d.graph_remove_node(this.__wbg_ptr,e)!==0}remove_edge(e){return d.graph_remove_edge(this.__wbg_ptr,e)!==0}get_nodes(){const e=d.graph_get_nodes(this.__wbg_ptr);return M(e)}get_edges(){const e=d.graph_get_edges(this.__wbg_ptr);return M(e)}node_count(){return d.graph_node_count(this.__wbg_ptr)>>>0}edge_count(){return d.graph_edge_count(this.__wbg_ptr)>>>0}get_buffer(){const e=d.graph_get_buffer(this.__wbg_ptr);return M(e)}get_total_elements(){return d.graph_get_total_elements(this.__wbg_ptr)>>>0}get_buffer_info(){const e=d.graph_get_buffer_info(this.__wbg_ptr);return M(e)}get_edges_offset(){return d.graph_get_edges_offset(this.__wbg_ptr)>>>0}}async function Y(n,e){if(typeof Response=="function"&&n instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(n,e)}catch(r){if(n.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",r);else throw r}const t=await n.arrayBuffer();return await WebAssembly.instantiate(t,e)}else{const t=await WebAssembly.instantiate(n,e);return t instanceof WebAssembly.Instance?{instance:t,module:n}:t}}function I(){const n={};return n.wbg={},n.wbg.__wbg_buffer_61b7ce01341d7f88=function(e){const t=E(e).buffer;return L(t)},n.wbg.__wbg_new_254fa9eac11932ae=function(){const e=new Array;return L(e)},n.wbg.__wbg_newwithbyteoffsetandlength_f113a96374814bb2=function(e,t,r){const i=new Float32Array(E(e),t>>>0,r>>>0);return L(i)},n.wbg.__wbg_push_6edad0df4b546b2c=function(e,t){return E(e).push(E(t))},n.wbg.__wbindgen_memory=function(){const e=d.memory;return L(e)},n.wbg.__wbindgen_number_new=function(e){return L(e)},n.wbg.__wbindgen_object_drop_ref=function(e){M(e)},n.wbg.__wbindgen_throw=function(e,t){throw new Error(q(e,t))},n}function H(n,e){return d=n.exports,F.__wbindgen_wasm_module=e,A=null,S=null,d}async function F(n){if(d!==void 0)return d;typeof n<"u"&&(Object.getPrototypeOf(n)===Object.prototype?{module_or_path:n}=n:console.warn("using deprecated parameters for the initialization function; pass a single object instead")),typeof n>"u"&&(n=new URL("/assets/webgpu_graph_renderer_bg-Cb7KpHAr.wasm",import.meta.url));const e=I();(typeof n=="string"||typeof Request=="function"&&n instanceof Request||typeof URL=="function"&&n instanceof URL)&&(n=fetch(n));const{instance:t,module:r}=await Y(await n,e);return H(t,r)}class C{static toBuffer(e){const i=new Float32Array(2+e.nodes.length*7+e.edges.length*7);i[0]=e.nodes.length,i[1]=e.edges.length;let s=2;return e.nodes.forEach(f=>{const u=R(f.attributes.color);console.log(u),i.set([f.id,f.attributes.x,f.attributes.y,f.attributes.r,u.r,u.g,u.b],s),s+=7}),e.edges.forEach(f=>{const u=R(f.attributes.color);i.set([f.id,f.source,f.target,f.attributes.width,u.r,u.g,u.b],s),s+=7}),i}}function R(n){if(!n||n.length!==4&&n.length!==7||n[0]!=="#")return null;let e,t,r;n.length===4?(e=n[1]+n[1],t=n[2]+n[2],r=n[3]+n[3]):(e=n.substring(1,3),t=n.substring(3,5),r=n.substring(5,7));const i=parseInt(e,16)/255,s=parseInt(t,16)/255,f=parseInt(r,16)/255;return isNaN(i)||isNaN(s)||isNaN(f)?null:{r:i,g:s,b:f}}const Z=`#include "types.wgsl"

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
`,k=`#include "types.wgsl"

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
`,V=n=>n.replace(/#include "([^"]+)"/g,(e,t)=>{if(t==="types.wgsl")return K;throw new Error(`Unknown include: ${t}`)}),Q=()=>typeof window<"u"?window.devicePixelRatio:1;class ${constructor(e,t){this.canvas=e,this.graph=t}device;context;viewProjBuffer;bindGroup;quadBuffer;lineBuffer;depthTexture;combinedBuffer;combinedBufferSize;nodePipeline;edgePipeline;createLineBuffer(){const e=new Float32Array([0,-.5,0,.5,1,-.5,1,.5]);this.lineBuffer=this.device.createBuffer({size:e.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(this.lineBuffer.getMappedRange()).set(e),this.lineBuffer.unmap()}createDepthTexture(){this.depthTexture=this.device.createTexture({size:{width:this.canvas.width,height:this.canvas.height},format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT})}createViewProjBuffer(e){this.viewProjBuffer=this.device.createBuffer({size:e.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,mappedAtCreation:!0}),new Float32Array(this.viewProjBuffer.getMappedRange()).set(e),this.viewProjBuffer.unmap()}createQuadBuffer(){const e=new Float32Array([-1,-1,0,0,1,-1,1,0,1,1,1,1,-1,-1,0,0,1,1,1,1,-1,1,0,1]);this.quadBuffer=this.device.createBuffer({size:e.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(this.quadBuffer.getMappedRange()).set(e),this.quadBuffer.unmap()}async init(e){const t=await navigator.gpu.requestAdapter();this.device=await t.requestDevice(),this.context=this.canvas.getContext("webgpu");const r=V(Z),i=V(k),s=Q();this.canvas.width=this.canvas.clientWidth*s,this.canvas.height=this.canvas.clientHeight*s,this.context.configure({device:this.device,format:navigator.gpu.getPreferredCanvasFormat(),alphaMode:"premultiplied"}),this.createQuadBuffer(),this.createLineBuffer(),this.createViewProjBuffer(e),this.createDepthTexture();const f=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]});this.bindGroup=this.device.createBindGroup({layout:f,entries:[{binding:0,resource:{buffer:this.viewProjBuffer}}]});const u=this.device.createPipelineLayout({bindGroupLayouts:[f]}),l=this.device.createShaderModule({code:r}),o=this.device.createShaderModule({code:i});this.createNodePipeline(l,o,u),this.createEdgePipeline(l,o,u);const a=this.graph.get_buffer();this.combinedBufferSize=a.byteLength,this.combinedBuffer=this.device.createBuffer({size:this.combinedBufferSize,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.device.queue.writeBuffer(this.combinedBuffer,0,a)}createNodePipeline(e,t,r){this.nodePipeline=this.device.createRenderPipeline({layout:r,vertex:{module:e,entryPoint:"vs_node",buffers:[{arrayStride:28,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32"},{shaderLocation:1,offset:4,format:"float32x2"},{shaderLocation:2,offset:12,format:"float32"},{shaderLocation:3,offset:16,format:"float32x3"}]},{arrayStride:16,stepMode:"vertex",attributes:[{shaderLocation:4,offset:0,format:"float32x2"},{shaderLocation:5,offset:8,format:"float32x2"}]}]},fragment:{module:t,entryPoint:"fs_node",targets:[{format:navigator.gpu.getPreferredCanvasFormat(),blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha"}}}]},primitive:{topology:"triangle-list"},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}})}createEdgePipeline(e,t,r){this.edgePipeline=this.device.createRenderPipeline({layout:r,vertex:{module:e,entryPoint:"vs_edge",buffers:[{arrayStride:36,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32"},{shaderLocation:1,offset:4,format:"float32x2"},{shaderLocation:2,offset:12,format:"float32x2"},{shaderLocation:3,offset:20,format:"float32"},{shaderLocation:4,offset:24,format:"float32x3"}]},{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:5,offset:0,format:"float32x2"}]}]},fragment:{module:t,entryPoint:"fs_edge",targets:[{format:navigator.gpu.getPreferredCanvasFormat(),blend:{color:{srcFactor:"src-alpha",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-strip",stripIndexFormat:void 0},depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}})}updateGraphData(){const e=this.graph.get_buffer();e.byteLength>this.combinedBufferSize&&(this.combinedBuffer.destroy(),this.combinedBufferSize=e.byteLength,this.combinedBuffer=this.device.createBuffer({size:this.combinedBufferSize,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST})),this.device.queue.writeBuffer(this.combinedBuffer,0,e)}draw(){this.updateGraphData();const e=this.graph.node_count(),t=this.graph.edge_count(),r=this.graph.get_edges_offset(),i=this.device.createCommandEncoder(),s=i.beginRenderPass({colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:this.depthTexture.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}});s.setPipeline(this.edgePipeline),s.setBindGroup(0,this.bindGroup),s.setVertexBuffer(0,this.combinedBuffer,r*4),s.setVertexBuffer(1,this.lineBuffer),s.draw(4,t),s.setPipeline(this.nodePipeline),s.setBindGroup(0,this.bindGroup),s.setVertexBuffer(0,this.combinedBuffer),s.setVertexBuffer(1,this.quadBuffer),s.draw(6,e),s.end(),this.device.queue.submit([i.finish()])}updateViewProj(e){this.device.queue.writeBuffer(this.viewProjBuffer,0,e)}}class J{position={x:0,y:0};zoom=1;width=0;height=0;maxZoom=10;minZoom=.1;zoomAroundPoint(e,t,r){const i=this.screenToWorld(t,r);this.zoom=Math.min(this.maxZoom,Math.max(this.minZoom,this.zoom*e));const s=this.screenToWorld(t,r);this.position.x+=i.x-s.x,this.position.y+=i.y-s.y}move(e,t){this.position.x-=e*this.zoom,this.position.y-=t*this.zoom}worldToScreen(e,t){return{x:(e-this.position.x)*this.zoom+this.width/2,y:this.height/2-(t-this.position.y)*this.zoom}}screenToWorld(e,t){return{x:(e-this.width/2)/this.zoom+this.position.x,y:-(t-this.height/2)/this.zoom+this.position.y}}getScale(){return this.zoom*Math.min(this.width,this.height)/2}getViewProjMatrix(e){const t=this.getScale();return new Float32Array([1/(t*e),0,0,0,0,1/t,0,0,0,0,1,0,-this.position.x/(t*e),-this.position.y/t,0,1])}debugState(){console.log("Camera State:",{position:this.position,zoom:this.zoom,width:this.width,height:this.height})}}function ee(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var T={exports:{}};(function(n){var e=Object.prototype.hasOwnProperty,t="~";function r(){}Object.create&&(r.prototype=Object.create(null),new r().__proto__||(t=!1));function i(l,o,a){this.fn=l,this.context=o,this.once=a||!1}function s(l,o,a,h,v){if(typeof a!="function")throw new TypeError("The listener must be a function");var _=new i(a,h||l,v),p=t?t+o:o;return l._events[p]?l._events[p].fn?l._events[p]=[l._events[p],_]:l._events[p].push(_):(l._events[p]=_,l._eventsCount++),l}function f(l,o){--l._eventsCount===0?l._events=new r:delete l._events[o]}function u(){this._events=new r,this._eventsCount=0}u.prototype.eventNames=function(){var o=[],a,h;if(this._eventsCount===0)return o;for(h in a=this._events)e.call(a,h)&&o.push(t?h.slice(1):h);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(a)):o},u.prototype.listeners=function(o){var a=t?t+o:o,h=this._events[a];if(!h)return[];if(h.fn)return[h.fn];for(var v=0,_=h.length,p=new Array(_);v<_;v++)p[v]=h[v].fn;return p},u.prototype.listenerCount=function(o){var a=t?t+o:o,h=this._events[a];return h?h.fn?1:h.length:0},u.prototype.emit=function(o,a,h,v,_,p){var m=t?t+o:o;if(!this._events[m])return!1;var c=this._events[m],b=arguments.length,y,g;if(c.fn){switch(c.once&&this.removeListener(o,c.fn,void 0,!0),b){case 1:return c.fn.call(c.context),!0;case 2:return c.fn.call(c.context,a),!0;case 3:return c.fn.call(c.context,a,h),!0;case 4:return c.fn.call(c.context,a,h,v),!0;case 5:return c.fn.call(c.context,a,h,v,_),!0;case 6:return c.fn.call(c.context,a,h,v,_,p),!0}for(g=1,y=new Array(b-1);g<b;g++)y[g-1]=arguments[g];c.fn.apply(c.context,y)}else{var D=c.length,B;for(g=0;g<D;g++)switch(c[g].once&&this.removeListener(o,c[g].fn,void 0,!0),b){case 1:c[g].fn.call(c[g].context);break;case 2:c[g].fn.call(c[g].context,a);break;case 3:c[g].fn.call(c[g].context,a,h);break;case 4:c[g].fn.call(c[g].context,a,h,v);break;default:if(!y)for(B=1,y=new Array(b-1);B<b;B++)y[B-1]=arguments[B];c[g].fn.apply(c[g].context,y)}}return!0},u.prototype.on=function(o,a,h){return s(this,o,a,h,!1)},u.prototype.once=function(o,a,h){return s(this,o,a,h,!0)},u.prototype.removeListener=function(o,a,h,v){var _=t?t+o:o;if(!this._events[_])return this;if(!a)return f(this,_),this;var p=this._events[_];if(p.fn)p.fn===a&&(!v||p.once)&&(!h||p.context===h)&&f(this,_);else{for(var m=0,c=[],b=p.length;m<b;m++)(p[m].fn!==a||v&&!p[m].once||h&&p[m].context!==h)&&c.push(p[m]);c.length?this._events[_]=c.length===1?c[0]:c:f(this,_)}return this},u.prototype.removeAllListeners=function(o){var a;return o?(a=t?t+o:o,this._events[a]&&f(this,a)):(this._events=new r,this._eventsCount=0),this},u.prototype.off=u.prototype.removeListener,u.prototype.addListener=u.prototype.on,u.prefixed=t,u.EventEmitter=u,n.exports=u})(T);var te=T.exports;const ne=ee(te);class re extends ne{constructor(e,t){super(),this.canvas=e,this.camera=t,this.setupEventHandlers(),this.updateRect(),this.updateCameraDimensions(),window.addEventListener("resize",this.updateRect)}isDragging=!1;lastMouseX=0;lastMouseY=0;rect;devicePixelRatio=window.devicePixelRatio||1;updateCameraDimensions(){this.camera.width=this.canvas.width/this.devicePixelRatio,this.camera.height=this.canvas.height/this.devicePixelRatio}updateRect=()=>{this.rect=this.canvas.getBoundingClientRect(),this.updateCameraDimensions()};setupEventHandlers(){this.canvas.addEventListener("mousedown",this.onMouseDown),this.canvas.addEventListener("mousemove",this.onMouseMove),this.canvas.addEventListener("mouseup",this.onMouseUp),this.canvas.addEventListener("mouseleave",this.onMouseUp),this.canvas.addEventListener("wheel",this.onWheel,{passive:!1})}setXY(e){const{x:t,y:r}=this.getCanvasPosition(e);this.lastMouseX=t,this.lastMouseY=r}getCanvasPosition(e){const t=this.rect;return{x:e.clientX-t.left,y:e.clientY-t.top}}onMouseDown=e=>{this.isDragging=!0,this.setXY(e),this.canvas.style.cursor="grabbing"};onMouseMove=e=>{if(!this.isDragging){this.setXY(e);return}const{x:t,y:r}=this.getCanvasPosition(e),i=t-this.lastMouseX,s=r-this.lastMouseY;this.camera.move(i,-s),this.setXY(e),this.emit("update")};onMouseUp=()=>{this.isDragging=!1,this.canvas.style.cursor="grab"};onWheel=e=>{e.preventDefault();const{x:t,y:r}=this.getCanvasPosition(e),i=e.deltaY>0?.99:1.01;this.camera.zoomAroundPoint(i,t,r),this.emit("update")};destroy(){this.canvas.removeEventListener("mousedown",this.onMouseDown),this.canvas.removeEventListener("mousemove",this.onMouseMove),this.canvas.removeEventListener("mouseup",this.onMouseUp),this.canvas.removeEventListener("mouseleave",this.onMouseUp),this.canvas.removeEventListener("wheel",this.onWheel),window.removeEventListener("resize",this.updateRect)}}class ie{constructor(e){this.canvas=e,this.mouse=new re(e,this.camera),this.mouse.on("update",this.redraw),this.camera.zoom=.2}graphManager;renderer;camera=new J;mouse;async init(){await F();const e=C.toBuffer({nodes:[],edges:[]});this.graphManager=new X(e),this.updateSize()}updateSize(e=this.canvas.clientWidth,t=this.canvas.clientHeight){this.canvas.width=e,this.canvas.height=t,this.camera.width=e,this.camera.height=t,this.renderer&&this.redraw()}async setData(e){const t=C.toBuffer(e);this.graphManager.set_graph(t),this.renderer=new $(this.canvas,this.graphManager),await this.renderer.init(this.camera.getViewProjMatrix(this.getAspectRatio())),this.redraw()}getAspectRatio(){return this.canvas.width/this.canvas.height}redraw=()=>{const e=this.camera.getViewProjMatrix(this.getAspectRatio());this.renderer.updateViewProj(e),this.renderer.draw()}}const j=new ie(document.querySelector("canvas"));await j.init();const se="test/fixtures/triangle.json",oe=await fetch(se).then(n=>n.json());await j.setData(oe);
