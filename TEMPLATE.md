# Szablon modułu WFRP4e

Szablon nowych modułów serii. Zachowuje konwencje istniejących modułów
(`wfrp4e-alchemy`, `wfrp4e-champion`, `wfrp4e-underworld`, `wfrp4e-companion-lib`):
osobne repozytorium na moduł, czyste ES modules bez kroku budowania, `module.json` w katalogu głównym,
tłumaczenia EN + PL, README w dwóch językach, wydanie przez GitHub Release.

Ten plik nie jest kopiowany do nowego modułu.

## Nowy moduł

```bash
cd wfrp4e-module-template
npm install
node tools/create-module.mjs wfrp4e-party-frames "Party Frames" WFRP4E_PARTY "Party unit frames for WFRP4e."
```

Moduł powstaje w katalogu obok szablonu (`../wfrp4e-party-frames`) z podmienionymi znacznikami
`__MODULE_ID__`, `__MODULE_TITLE__`, `__MODULE_DESCRIPTION__`, `__I18N__`.

## Co jest w środku

| Ścieżka | Rola |
|---|---|
| `module.json` | Manifest: Foundry **v14**, system **WFRP4e ≥ 10.0**, języki EN/PL, hot reload CSS/HBS/JSON |
| `scripts/main.mjs` | Punkt startowy (`init` / `ready`), publiczne API w `game.modules.get(id).api` |
| `scripts/constants.mjs` | `MODULE_ID`, przestrzeń i18n, `t()` i logger z prefiksem |
| `scripts/edition.mjs` | `getEdition()` / `is5e()` / `byEdition()` – rozpoznanie zasad 4e/5e (Edition Manager z WFRP 10.x) |
| `lang/en.json`, `lang/pl.json` | Tłumaczenia – walidator pilnuje, żeby miały te same klucze |
| `test/` | Testy Vitest dla czystej logiki (bez Foundry) |
| `tools/validate-module.mjs` | Sprawdza manifest, istnienie plików i zgodność kluczy tłumaczeń |
| `tools/package-module.mjs` | Lista plików do `module.zip` – tylko to, czego potrzebuje Foundry |
| `tools/link-foundry.mjs` | Junction/dowiązanie do lokalnego `FoundryVTT/Data/modules` |
| `.github/workflows/ci.yml` | `npm run check` przy pushu i PR |
| `.github/workflows/release.yml` | Release `vX.Y.Z` → sprawdzenie, wersja w `module.json`, `module.zip` |

## Zasady pisania modułów

- **ApplicationV2** + `HandlebarsApplicationMixin` dla okien; bez jQuery i starych `Application`/`FormApplication`.
- Logikę, która nie potrzebuje Foundry (parsowanie, obliczenia, dopasowania), trzymaj w osobnych plikach
  i testuj w `test/`. Dostęp do `game`/`ui` zamykaj w cienkich adapterach.
- Każda funkcja zależna od zasad musi działać w **4e i 5e** – używaj `scripts/edition.mjs`.
- Klasy CSS poprzedzaj id modułu, teksty interfejsu tylko przez `t()`.
- Wydanie: podbij wersję w `CHANGELOG.md`, opublikuj GitHub Release z tagiem `vX.Y.Z`.
