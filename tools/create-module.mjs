/**
 * Tworzy nowy moduł z tego szablonu w katalogu obok szablonu.
 *
 * Użycie:
 *   node tools/create-module.mjs <id> "<Tytuł>" <PRZESTRZEŃ_I18N> ["Opis"]
 * Przykład:
 *   node tools/create-module.mjs wfrp4e-party-frames "Party Frames" WFRP4E_PARTY "Party unit frames for WFRP4e."
 *
 * Podmienia znaczniki __MODULE_ID__, __MODULE_TITLE__, __MODULE_DESCRIPTION__ i __I18N__
 * w treści oraz nazwach plików. Pomija node_modules, .git i sam ten skrypt.
 */
import { cpSync, existsSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const [id, title, i18n, description = ""] = process.argv.slice(2);

if (!id || !title || !i18n) {
  console.error('Użycie: node tools/create-module.mjs <id> "<Tytuł>" <PRZESTRZEŃ_I18N> ["Opis"]');
  process.exit(1);
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
  console.error(`✖ Niepoprawne id "${id}" – użyj małych liter, cyfr i myślników (np. wfrp4e-party-frames).`);
  process.exit(1);
}
if (!/^[A-Z][A-Z0-9_]*$/.test(i18n)) {
  console.error(`✖ Niepoprawna przestrzeń i18n "${i18n}" – użyj WIELKICH_LITER (np. WFRP4E_PARTY).`);
  process.exit(1);
}

const templateRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const targetRoot = join(dirname(templateRoot), id);

if (existsSync(targetRoot)) {
  console.error(`✖ Katalog ${targetRoot} już istnieje.`);
  process.exit(1);
}

const SKIP = new Set(["node_modules", ".git", "package-lock.json", "TEMPLATE.md"]);
const SELF = join("tools", "create-module.mjs");
const TEXT_EXT = new Set([".json", ".mjs", ".js", ".css", ".hbs", ".html", ".md", ".yml", ".yaml", ".txt", ""]);

cpSync(templateRoot, targetRoot, {
  recursive: true,
  filter: (src) => {
    const rel = src.slice(templateRoot.length + 1);
    return !SKIP.has(basename(src)) && rel !== SELF;
  }
});

const replacements = {
  __MODULE_ID__: id,
  __MODULE_TITLE__: title,
  __MODULE_DESCRIPTION__: description,
  __I18N__: i18n
};

function replaceAll(text) {
  return Object.entries(replacements).reduce((acc, [token, value]) => acc.replaceAll(token, value), text);
}

function process_(path) {
  const stat = statSync(path);
  if (stat.isDirectory()) {
    for (const name of readdirSync(path)) process_(join(path, name));
  } else if (TEXT_EXT.has(extname(path)) || basename(path).startsWith(".")) {
    const text = readFileSync(path, "utf8");
    const next = replaceAll(text);
    if (next !== text) writeFileSync(path, next);
  }
  const renamed = join(dirname(path), replaceAll(basename(path)));
  if (renamed !== path) renameSync(path, renamed);
}

process_(targetRoot);

console.log(`✔ Utworzono ${targetRoot}

Dalej:
  cd ../${id}
  npm install
  npm run check      # walidacja, lint, testy
  npm run link       # podłączenie do lokalnego Foundry
  git init -b main`);
