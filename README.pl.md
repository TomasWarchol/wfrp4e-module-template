# WFRP4e – __MODULE_TITLE__ (`__MODULE_ID__`)

[English](README.md) | **Polski**

__MODULE_DESCRIPTION__

Wymaga **Foundry VTT v14** i systemu **WFRP4e** w wersji **10.0+** (zasady 4. i 5. edycji).

Interfejs działa w języku Foundry: **angielski** i **polski** są wbudowane, a kolejne języki można dodać (zobacz *Języki*); to, czego nie przetłumaczono, pokazuje się po angielsku.

## 📥 Instalacja

Wklej w *Manifest URL* w **Add-on Modules → Install Module**:

```
https://github.com/TomasWarchol/__MODULE_ID__/releases/latest/download/module.json
```

## 🌐 Języki

Angielski i polski są wbudowane. Aby dodać kolejny język:

```bash
npm run lang:add -- de "Deutsch"
```

Polecenie tworzy `lang/de.json` (kopię tekstów angielskich) i dopisuje go do `module.json`. Przetłumacz teksty; każdy pominięty klucz pokaże się po angielsku, a `npm run check` wypisze nieprzetłumaczone klucze. Tłumaczenia mile widziane jako pull requesty.

Osobny moduł tłumaczenia może też dodać język bez zmian w tym module: deklaruje wpis `languages` z `"lang": "de"`, wskazujący na własny plik z tymi samymi kluczami.

## 🛠️ Rozwój

```bash
npm install
npm run check   # manifest + tłumaczenia, lint, testy
npm run link    # podłącza ten katalog do lokalnego Foundry (Data/modules)
```

## 📄 Licencja

MIT – zobacz [LICENSE](LICENSE).
