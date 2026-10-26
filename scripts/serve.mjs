import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicFiles = new Set([
  "index.html",
  "aplicacao.js",
  "estilos.css",
  "favicon.svg",
  "icone-192.png",
  "icone-512.png",
  "icone-apple.png",
  "site.webmanifest",
]);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webmanifest": "application/manifest+json",
};

export function createAppServer({ transformHtml, fixture } = {}) {
  return createServer(async (request, response) => {
    try {
      if (!["GET", "HEAD"].includes(request.method)) {
        response.writeHead(405, { Allow: "GET, HEAD" }).end();
        return;
      }
      const pathname = decodeURIComponent(
        new URL(request.url, "http://localhost").pathname,
      );
      const name = pathname === "/" ? "index.html" : pathname.slice(1);
      if (name === "__test-client.js" && fixture) {
        response.writeHead(200, { "Content-Type": types[".js"] });
        response.end(request.method === "HEAD" ? undefined : fixture);
        return;
      }
      const file = resolve(root, name);
      if (!file.startsWith(root + sep) || !publicFiles.has(name)) {
        response.writeHead(404).end();
        return;
      }
      let content = await readFile(file);
      if (name === "index.html" && transformHtml)
        content = transformHtml(content.toString());
      response.writeHead(200, {
        "Content-Type": types[extname(file)],
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      });
      response.end(request.method === "HEAD" ? undefined : content);
    } catch {
      response.writeHead(400).end();
    }
  });
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const port = Number(process.env.PORT || 8080);
  createAppServer().listen(port, "127.0.0.1", () => {
    console.log(`ACERVO: http://127.0.0.1:${port}`);
  });
}
