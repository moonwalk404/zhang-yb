const fs = require('fs');
const mockData = fs.readFileSync('mock-server.js','utf8');

const plugin = '// Vite plugin: embedded mock API server + image placeholder generator\n' +
'// All API endpoints served directly from Vite - no separate backend needed\n' +
'\n' +
'function btoa(str) { return Buffer.from(str).toString("base64"); }\n' +
'function atob(str) { return Buffer.from(str, "base64").toString(); }\n' +
'\n' +
'function signToken(payload) {\n' +
'  const h = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));\n' +
'  const b = btoa(JSON.stringify({ ...payload, iat: Date.now(), exp: Date.now() + 86400000 }));\n' +
'  return h + "." + b + ".mock";\n' +
'}\n' +
'\n';

// Extract just the data and helper functions from mock-server.js, stripping server/bootstrap code
const stripped = mockData
  .replace(/import http from "http";\s*/, '')
  .replace(/const PORT = 8088;\s*/, '')
  .replace('const server = http.createServer(async (req, res) => {', 'async function handleRequest(req, res) {');

// Remove the server.listen part
const listenIdx = stripped.lastIndexOf('server.listen');
const handleBody = stripped.substring(0, listenIdx).trimEnd() + '\n}';

const imageCode = '\n' +
'// ============ IMAGE PLACEHOLDER ============\n' +
'const gradients = [\n' +
'  ["#667eea","#764ba2"],["#f093fb","#f5576c"],["#4facfe","#00f2fe"],\n' +
'  ["#43e97b","#38f9d7"],["#fa709a","#fee140"],["#a18cd1","#fbc2eb"],\n' +
'  ["#fccb90","#d57eeb"],["#e0c3fc","#8ec5fc"],["#f5576c","#ff6f00"],\n' +
'  ["#667eea","#2af598"],["#f7971e","#ffd200"],["#00b4db","#0083b0"],\n' +
'  ["#ee9ca7","#ffdde1"],["#42275a","#734b6d"],["#b224ef","#7579ff"],\n' +
'  ["#11998e","#38ef7d"],["#fc4a1a","#f7b733"],["#c94b4b","#4b134f"],\n' +
'  ["#00c6ff","#0072ff"],["#ff4b1f","#ff9068"],["#2b5876","#4e4376"],\n' +
'  ["#6a3093","#a044ff"],["#614385","#516395"],\n' +
'];\n' +
'\n' +
'function makePlaceholderSVG(name, idx) {\n' +
'  const c = gradients[idx % gradients.length];\n' +
'  return <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"> +\n' +
'    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"> +\n' +
'    <stop offset="0%" style="stop-color:"/><stop offset="100%" style="stop-color:"/> +\n' +
'    </linearGradient></defs> +\n' +
'    <rect width="800" height="500" fill="url(#g)"/> +\n' +
'    <text x="400" y="250" text-anchor="middle" dominant-baseline="central" +\n' +
'     font-family="Microsoft YaHei,SimHei,sans-serif" font-size="42" font-weight="bold" +\n' +
'     fill="rgba(255,255,255,0.9)"></text></svg>;\n' +
'}\n' +
'\n';

const vitePlugin = '// ============ VITE PLUGIN ============\n' +
'export default function mockApiPlugin() {\n' +
'  return {\n' +
'    name: "mock-api",\n' +
'    configureServer(server) {\n' +
'      server.middlewares.use(async (req, res, next) => {\n' +
'        if (!req.url.startsWith("/api")) return next();\n' +
'        const url = new URL(req.url, "http://localhost");\n' +
'        const path = url.pathname;\n' +
'        const sp = url.searchParams;\n' +
'\n' +
'        if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }\n' +
'\n' +
'        // Image placeholder endpoint: /api/image?type=scenic&id=1\n' +
'        if (path === "/api/image") {\n' +
'          const type = sp.get("type") || "scenic";\n' +
'          const id = parseInt(sp.get("id")) || 1;\n' +
'          let name = "Image";\n' +
'          if (type === "scenic") { const s = scenics.find(x => x.id === id); name = s ? s.name : "Scenic"; }\n' +
'          else if (type === "food") { const f = foods.find(x => x.id === id); name = f ? f.name : "Food"; }\n' +
'          else if (type === "guide") { const g = guides.find(x => x.id === id); name = g ? g.title : "Guide"; }\n' +
'          else if (type === "travelogue") { const t = travelogues.find(x => x.id === id); name = t ? t.title : "Travelogue"; }\n' +
'          res.writeHead(200, { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=86400" });\n' +
'          res.end(makePlaceholderSVG(name, id));\n' +
'          return;\n' +
'        }\n' +
'\n' +
'        await handleRequest(req, res);\n' +
'      });\n' +
'      console.log("  [Mock API + Images] Embedded in Vite");\n' +
'    },\n' +
'  };\n' +
'}\n';

const fullPlugin = plugin + handleBody + imageCode + vitePlugin;
fs.writeFileSync('vite-plugin-mock.js', fullPlugin);
console.log('Plugin rebuilt: ' + fullPlugin.length + ' bytes');
