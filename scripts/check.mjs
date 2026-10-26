import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Script } from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const load = (file) => readFile(resolve(root, file), "utf8");
new Script(await load("aplicacao.js"), { filename: "aplicacao.js" });
const html = await load("index.html");
const manifest = JSON.parse(await load("site.webmanifest"));
const pkg = JSON.parse(await load("package.json"));
const paths = [...html.matchAll(/(?:src|href)="(\.\/[^\"]+)"/g)].map(
  (m) => m[1],
);
for (const icon of manifest.icons) paths.push(icon.src);
for (const path of new Set(paths)) {
  await access(resolve(root, path.split("?")[0]));
  const version = path.match(/[?&]v=([^&]+)/)?.[1];
  if (version)
    assert.equal(version, pkg.version, `Versão inconsistente: ${path}`);
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
assert.equal(new Set(ids).size, ids.length, "IDs duplicados no HTML");
assert.equal(manifest.lang, "pt-BR");
console.log(
  `JavaScript, manifesto, ${ids.length} IDs e ${new Set(paths).size} referências locais válidos.`,
);
