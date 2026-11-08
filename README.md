# WFRP4e – __MODULE_TITLE__ (`__MODULE_ID__`)

**English** | [Polski](README.pl.md)

__MODULE_DESCRIPTION__

Requires **Foundry VTT v14** and the **WFRP4e** system **10.0+** (4th and 5th edition rules).

The interface follows Foundry's language: **English** and **Polish** are built in, and more languages can be added (see *Languages*); anything untranslated falls back to English.

## 📥 Installation

Paste this into *Manifest URL* in **Add-on Modules → Install Module**:

```
https://github.com/TomasWarchol/__MODULE_ID__/releases/latest/download/module.json
```

## 🌐 Languages

English and Polish are built in. To add another language:

```bash
npm run lang:add -- de "Deutsch"
```

This creates `lang/de.json` (a copy of the English texts) and registers it in `module.json`. Translate the texts; any key you leave out falls back to English, and `npm run check` lists the untranslated keys. Translations are welcome as pull requests.

A separate translation module can also add a language without touching this one: it declares a `languages` entry with `"lang": "de"` that points to its own file with the same keys.

## 🛠️ Development

```bash
npm install
npm run check   # manifest + translations, lint, tests
npm run link    # link this folder into your local Foundry Data/modules
```

## 📄 License

MIT – see [LICENSE](LICENSE).

Unofficial fan content, not affiliated with or endorsed by Games Workshop or Cubicle 7. Warhammer and all related names are trademarks of Games Workshop Limited. The module ships no rulebook text or artwork; it works with the content you already own.
